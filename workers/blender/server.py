"""Private authenticated Blender worker for Infinite Architecture.

The worker accepts only the bounded JSON schema defined here, writes each job into an
isolated directory, and invokes the bundled generator. It never accepts user-supplied
Python, shell commands, executable paths, or arbitrary output paths.
"""

from __future__ import annotations

import hmac
import json
import os
import re
import subprocess
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from pathlib import Path
from threading import Lock
from typing import Literal

from fastapi import FastAPI, Header, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field

APP_DIR = Path(__file__).resolve().parent
GENERATOR = APP_DIR / "generate_concept.py"
DATA_DIR = Path(os.getenv("BLENDER_DATA_DIR", "/data/jobs")).resolve()
BLENDER_BIN = os.getenv("BLENDER_BIN", "/usr/bin/blender")
WORKER_KEY = os.getenv("BLENDER_WORKER_API_KEY", "")
MAX_RENDER_SECONDS = int(os.getenv("BLENDER_MAX_RENDER_SECONDS", "1800"))
MAX_CONCURRENT_JOBS = max(1, min(int(os.getenv("BLENDER_MAX_CONCURRENT_JOBS", "1")), 4))

DATA_DIR.mkdir(parents=True, exist_ok=True)
EXECUTOR = ThreadPoolExecutor(max_workers=MAX_CONCURRENT_JOBS)
STATE_LOCK = Lock()

JOB_ID = re.compile(r"^[A-Z0-9][A-Z0-9_-]{3,63}$")
ARTIFACTS = {
    "concept.blend",
    "concept.glb",
    "hero.png",
    "walkthrough.mp4",
    "manifest.json",
    "worker.log",
}


class SceneSpec(BaseModel):
    units: Literal["METRIC"] = "METRIC"
    coordinateSystem: Literal["Z_UP"] = "Z_UP"
    structureType: str = Field(min_length=1, max_length=160)
    targetUnits: int = Field(ge=1, le=100)


class Constraints(BaseModel):
    arbitraryPythonAllowed: Literal[False] = False
    conceptVisualizationOnly: Literal[True] = True
    structuralCertification: Literal[False] = False
    preserveEditableBlendFile: Literal[True] = True


class JobSpec(BaseModel):
    version: Literal[1] = 1
    jobId: str = Field(min_length=4, max_length=64)
    projectId: str = Field(min_length=1, max_length=120)
    projectName: str = Field(min_length=1, max_length=200)
    location: str = Field(min_length=1, max_length=200)
    scene: SceneSpec
    outputs: list[Literal["blend", "glb", "stills", "walkthrough"]] = Field(
        min_length=1, max_length=4
    )
    constraints: Constraints


app = FastAPI(
    title="Infinite Architecture Blender Worker",
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def authorize(authorization: str | None) -> None:
    if not WORKER_KEY or len(WORKER_KEY) < 24:
        raise HTTPException(status_code=503, detail="Worker authentication is not configured.")
    expected = f"Bearer {WORKER_KEY}"
    if not authorization or not hmac.compare_digest(authorization, expected):
        raise HTTPException(status_code=401, detail="Unauthorized.")


def safe_job_dir(job_id: str) -> Path:
    if not JOB_ID.fullmatch(job_id):
        raise HTTPException(status_code=400, detail="Invalid job id.")
    path = (DATA_DIR / job_id).resolve()
    if DATA_DIR not in path.parents:
        raise HTTPException(status_code=400, detail="Invalid job path.")
    return path


def state_path(job_dir: Path) -> Path:
    return job_dir / "state.json"


def write_state(job_dir: Path, payload: dict) -> None:
    payload = {**payload, "updatedAt": now_iso()}
    temp = job_dir / "state.tmp"
    with STATE_LOCK:
        temp.write_text(json.dumps(payload, indent=2), encoding="utf-8")
        temp.replace(state_path(job_dir))


def read_state(job_dir: Path) -> dict:
    path = state_path(job_dir)
    if not path.exists():
        raise HTTPException(status_code=404, detail="Job not found.")
    return json.loads(path.read_text(encoding="utf-8"))


def run_job(job_dir: Path) -> None:
    job_file = job_dir / "job.json"
    output_dir = job_dir / "output"
    output_dir.mkdir(parents=True, exist_ok=True)
    log_file = output_dir / "worker.log"

    write_state(
        job_dir,
        {
            "jobId": job_dir.name,
            "status": "running",
            "startedAt": now_iso(),
            "artifacts": [],
        },
    )

    env = os.environ.copy()
    distro_python = "/usr/lib/python3/dist-packages"
    current_pythonpath = env.get("PYTHONPATH", "")
    env["PYTHONPATH"] = (
        f"{distro_python}:{current_pythonpath}" if current_pythonpath else distro_python
    )

    command = [
        BLENDER_BIN,
        "--background",
        "--factory-startup",
        "--python-exit-code",
        "1",
        "--python",
        str(GENERATOR),
        "--",
        str(job_file),
        str(output_dir),
    ]

    try:
        completed = subprocess.run(
            command,
            cwd=str(APP_DIR),
            env=env,
            capture_output=True,
            text=True,
            timeout=MAX_RENDER_SECONDS,
            check=False,
        )
        log_file.write_text(
            (completed.stdout or "") + "\n--- STDERR ---\n" + (completed.stderr or ""),
            encoding="utf-8",
        )

        present = sorted(
            item.name
            for item in output_dir.iterdir()
            if item.is_file() and item.name in ARTIFACTS
        )
        if completed.returncode != 0:
            write_state(
                job_dir,
                {
                    "jobId": job_dir.name,
                    "status": "failed",
                    "returnCode": completed.returncode,
                    "artifacts": present,
                    "completedAt": now_iso(),
                },
            )
            return

        write_state(
            job_dir,
            {
                "jobId": job_dir.name,
                "status": "completed",
                "returnCode": 0,
                "artifacts": present,
                "completedAt": now_iso(),
            },
        )
    except subprocess.TimeoutExpired as error:
        log_file.write_text(
            f"Render timed out after {MAX_RENDER_SECONDS}s.\n{error}",
            encoding="utf-8",
        )
        write_state(
            job_dir,
            {
                "jobId": job_dir.name,
                "status": "failed",
                "reason": "timeout",
                "artifacts": ["worker.log"],
                "completedAt": now_iso(),
            },
        )
    except Exception as error:
        log_file.write_text(f"{type(error).__name__}: {error}", encoding="utf-8")
        write_state(
            job_dir,
            {
                "jobId": job_dir.name,
                "status": "failed",
                "reason": type(error).__name__,
                "artifacts": ["worker.log"],
                "completedAt": now_iso(),
            },
        )


@app.get("/healthz")
def health() -> dict:
    return {"ok": True, "service": "infinite-architecture-blender-worker"}


@app.post("/jobs", status_code=202)
def create_job(spec: JobSpec, authorization: str | None = Header(default=None)) -> dict:
    authorize(authorization)
    if not JOB_ID.fullmatch(spec.jobId):
        raise HTTPException(status_code=400, detail="Invalid job id.")

    job_dir = safe_job_dir(spec.jobId)
    with STATE_LOCK:
        if job_dir.exists():
            raise HTTPException(status_code=409, detail="Job already exists.")
        job_dir.mkdir(parents=True)
        (job_dir / "job.json").write_text(
            spec.model_dump_json(indent=2),
            encoding="utf-8",
        )
        write_state(
            job_dir,
            {
                "jobId": spec.jobId,
                "projectId": spec.projectId,
                "status": "queued",
                "createdAt": now_iso(),
                "artifacts": [],
            },
        )

    EXECUTOR.submit(run_job, job_dir)
    return {"jobId": spec.jobId, "status": "queued"}


@app.get("/jobs/{job_id}")
def get_job(job_id: str, authorization: str | None = Header(default=None)) -> dict:
    authorize(authorization)
    return read_state(safe_job_dir(job_id))


@app.get("/jobs/{job_id}/artifacts/{artifact}")
def get_artifact(
    job_id: str,
    artifact: str,
    authorization: str | None = Header(default=None),
):
    authorize(authorization)
    if artifact not in ARTIFACTS:
        raise HTTPException(status_code=404, detail="Artifact not found.")

    job_dir = safe_job_dir(job_id)
    output = (job_dir / "output" / artifact).resolve()
    expected_parent = (job_dir / "output").resolve()
    if output.parent != expected_parent or not output.is_file():
        raise HTTPException(status_code=404, detail="Artifact not found.")
    return FileResponse(output)

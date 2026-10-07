"""Infinite Architecture bounded Blender concept generator.

Run inside Blender:
  blender --background --python workers/blender/generate_concept.py -- job.json output_dir

This script accepts a fixed JSON schema. It does not execute user-supplied Python.
Outputs are concept visualization only, never engineering or construction documents.
"""

from __future__ import annotations

import json
import math
import os
import sys
from pathlib import Path

import bpy


def args_after_double_dash() -> list[str]:
    if "--" not in sys.argv:
        return []
    return sys.argv[sys.argv.index("--") + 1 :]


def load_job(path: Path) -> dict:
    data = json.loads(path.read_text(encoding="utf-8"))
    scene = data.get("scene", {})
    count = int(scene.get("targetUnits", 1))
    if count < 1 or count > 100:
        raise ValueError("targetUnits must be between 1 and 100")
    outputs = data.get("outputs", [])
    allowed = {"blend", "glb", "stills", "walkthrough"}
    if not outputs or any(value not in allowed for value in outputs):
        raise ValueError("outputs contains an unsupported value")
    return data


def material(name: str, rgba: tuple[float, float, float, float]) -> bpy.types.Material:
    mat = bpy.data.materials.new(name=name)
    mat.diffuse_color = rgba
    return mat


def reset_scene() -> None:
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for datablocks in (bpy.data.meshes, bpy.data.curves, bpy.data.materials, bpy.data.cameras, bpy.data.lights):
        # Keep cleanup conservative; Blender will remove orphan data on save/reload.
        pass


def look_at(obj: bpy.types.Object, point: tuple[float, float, float]) -> None:
    direction = mathutils.Vector(point) - obj.location
    obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()


def add_dome(x: float, y: float, index: int, shell_mat: bpy.types.Material) -> None:
    bpy.ops.mesh.primitive_uv_sphere_add(
        segments=48,
        ring_count=24,
        location=(x, y, 2.5),
    )
    dome = bpy.context.active_object
    dome.name = f"ConceptUnit_{index:02d}"
    dome.scale = (4.2, 4.2, 2.5)
    dome.data.materials.append(shell_mat)

    bpy.ops.mesh.primitive_cube_add(location=(x, y - 3.25, 1.4), scale=(1.1, 0.2, 1.4))
    entry = bpy.context.active_object
    entry.name = f"Entry_{index:02d}"
    entry.data.materials.append(shell_mat)


def create_scene(job: dict, output_dir: Path) -> None:
    reset_scene()
    scene = bpy.context.scene
    scene.render.resolution_x = 1600
    scene.render.resolution_y = 900
    scene.render.resolution_percentage = 100

    try:
        scene.render.engine = "BLENDER_EEVEE_NEXT"
    except Exception:
        pass

    ground_mat = material("Ground", (0.13, 0.20, 0.12, 1.0))
    shell_mat = material("Shell", (0.86, 0.82, 0.70, 1.0))
    pavilion_mat = material("Pavilion", (0.34, 0.22, 0.12, 1.0))

    bpy.ops.mesh.primitive_plane_add(size=90, location=(0, 0, 0))
    ground = bpy.context.active_object
    ground.name = "ConceptSite"
    ground.data.materials.append(ground_mat)

    count = int(job["scene"]["targetUnits"])
    ring_radius = max(11.0, count * 2.2)
    if count == 1:
        positions = [(0.0, 0.0)]
    else:
        positions = [
            (
                math.cos((2 * math.pi * index) / count) * ring_radius,
                math.sin((2 * math.pi * index) / count) * ring_radius,
            )
            for index in range(count)
        ]

    for index, (x, y) in enumerate(positions, start=1):
        add_dome(x, y, index, shell_mat)

    bpy.ops.mesh.primitive_cylinder_add(vertices=48, radius=5.5, depth=3.2, location=(0, 0, 1.6))
    pavilion = bpy.context.active_object
    pavilion.name = "SharedPavilion"
    pavilion.data.materials.append(pavilion_mat)

    bpy.ops.object.light_add(type="SUN", location=(0, 0, 25))
    sun = bpy.context.active_object
    sun.rotation_euler = (math.radians(28), math.radians(-18), math.radians(35))
    sun.data.energy = 3.0

    bpy.ops.object.light_add(type="AREA", location=(0, 0, 18))
    area = bpy.context.active_object
    area.data.energy = 1600
    area.data.shape = "DISK"
    area.data.size = 18

    bpy.ops.object.camera_add(location=(ring_radius * 1.7, -ring_radius * 1.9, ring_radius * 1.25))
    camera = bpy.context.active_object
    scene.camera = camera

    direction = mathutils.Vector((0, 0, 2)) - camera.location
    camera.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
    camera.data.lens = 42

    world = scene.world or bpy.data.worlds.new("World")
    scene.world = world
    world.color = (0.035, 0.05, 0.035)

    outputs = set(job["outputs"])
    output_dir.mkdir(parents=True, exist_ok=True)

    if "blend" in outputs:
        bpy.ops.wm.save_as_mainfile(filepath=str(output_dir / "concept.blend"))

    if "glb" in outputs:
        bpy.ops.export_scene.gltf(
            filepath=str(output_dir / "concept.glb"),
            export_format="GLB",
        )

    if "stills" in outputs:
        scene.render.filepath = str(output_dir / "hero.png")
        bpy.ops.render.render(write_still=True)

    if "walkthrough" in outputs:
        frames = 48
        scene.frame_start = 1
        scene.frame_end = frames
        for frame in range(1, frames + 1):
            angle = (2 * math.pi * (frame - 1)) / frames
            camera.location = (
                math.cos(angle) * ring_radius * 2.0,
                math.sin(angle) * ring_radius * 2.0,
                ring_radius * 1.0,
            )
            direction = mathutils.Vector((0, 0, 2)) - camera.location
            camera.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
            camera.keyframe_insert(data_path="location", frame=frame)
            camera.keyframe_insert(data_path="rotation_euler", frame=frame)

        scene.render.image_settings.file_format = "FFMPEG"
        scene.render.ffmpeg.format = "MPEG4"
        scene.render.ffmpeg.codec = "H264"
        scene.render.fps = 24
        scene.render.filepath = str(output_dir / "walkthrough.mp4")
        bpy.ops.render.render(animation=True)

    manifest = {
        "jobId": job.get("jobId"),
        "projectId": job.get("projectId"),
        "outputs": sorted(outputs),
        "conceptVisualizationOnly": True,
    }
    (output_dir / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")


if __name__ == "__main__":
    import mathutils

    args = args_after_double_dash()
    if len(args) != 2:
        raise SystemExit("Expected: -- job.json output_dir")
    job_path = Path(args[0]).resolve()
    out_path = Path(args[1]).resolve()
    create_scene(load_job(job_path), out_path)

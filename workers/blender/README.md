# Infinite Architecture Blender Worker

This is the owned 3D production layer for the private concept studio.

## Purpose

Turn a bounded studio job specification into editable Blender source, a GLB, still imagery, and an optional walkthrough. The worker is for **concept visualization**. It is not a structural solver, BIM authoring authority, permit system, or construction-document generator.

## Run locally

```bash
blender --background \
  --python workers/blender/generate_concept.py \
  -- workers/blender/job.example.json ./artifacts/demo
```

The script accepts a fixed JSON object and never evaluates user-supplied Python.

## Web connection

The private web studio sends the same bounded job JSON to:

```text
POST {BLENDER_WORKER_URL}/jobs
Authorization: Bearer {BLENDER_WORKER_API_KEY}
```

A worker service may enqueue the JSON and invoke Blender in a sandboxed job directory. The web app must never receive shell access, arbitrary script input, or filesystem paths.

## Required production controls

- isolate each job
- strict schema validation before Blender execution
- resource/time limits
- no arbitrary Python from chat
- signed/authenticated worker endpoint
- durable output storage separate from the ephemeral worker
- virus/content scanning for imported third-party assets
- job log and source provenance
- human approval before client delivery
- rollback/retention policy

## AI asset providers

Blender remains the scene of record. Optional providers such as TRELLIS or Meshy may create visual assets that are imported into the scene, but they do not establish structural dimensions or code compliance.

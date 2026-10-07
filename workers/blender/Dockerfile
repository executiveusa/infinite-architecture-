FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       blender \
       python3 \
       python3-numpy \
       python3-pip \
       python3-venv \
    && rm -rf /var/lib/apt/lists/*

RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
COPY requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir -r /tmp/requirements.txt

RUN useradd --create-home --uid 10001 worker \
    && mkdir -p /app /data/jobs \
    && chown -R worker:worker /app /data

WORKDIR /app
COPY --chown=worker:worker generate_concept.py server.py ./

USER worker
ENV BLENDER_DATA_DIR=/data/jobs
ENV BLENDER_BIN=/usr/bin/blender
EXPOSE 8000

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]

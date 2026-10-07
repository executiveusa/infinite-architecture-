FROM ubuntu:24.04

ARG BLENDER_VERSION=4.5.14
ARG BLENDER_RELEASE=Blender4.5

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       ca-certificates \
       curl \
       xz-utils \
       python3 \
       python3-pip \
       python3-venv \
       libx11-6 \
       libxi6 \
       libxxf86vm1 \
       libxfixes3 \
       libxrender1 \
       libgl1 \
       libegl1 \
    && rm -rf /var/lib/apt/lists/*

RUN set -eux; \
    archive="blender-${BLENDER_VERSION}-linux-x64.tar.xz"; \
    base="https://download.blender.org/release/${BLENDER_RELEASE}"; \
    cd /tmp; \
    curl -fsSLO "${base}/${archive}"; \
    curl -fsSLO "${base}/blender-${BLENDER_VERSION}.sha256"; \
    grep " ${archive}$" "blender-${BLENDER_VERSION}.sha256" | sha256sum -c -; \
    tar -xf "${archive}" -C /opt; \
    ln -s "/opt/blender-${BLENDER_VERSION}-linux-x64/blender" /usr/local/bin/blender; \
    rm -f "/tmp/${archive}" "/tmp/blender-${BLENDER_VERSION}.sha256"; \
    blender --version

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
ENV BLENDER_BIN=/usr/local/bin/blender
EXPOSE 8000

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]

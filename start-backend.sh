#!/usr/bin/env bash
# Start de backend (FastAPI). Maakt de virtuele omgeving aan als die nog niet
# bestaat, installeert dependencies indien nodig, en start daarna de server.
#
# Gebruik:
#   ./start-backend.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/backend"

PYTHON_BIN="python3"
if ! command -v "$PYTHON_BIN" &>/dev/null; then
    PYTHON_BIN="python"
fi

if [ ! -x ".venv/bin/python" ]; then
    echo "[1/3] Virtuele omgeving aanmaken..."
    "$PYTHON_BIN" -m venv .venv
else
    echo "[1/3] Virtuele omgeving bestaat al, wordt overgeslagen."
fi

echo "[2/3] Dependencies installeren/controleren..."
.venv/bin/python -m pip install -r requirements.txt --quiet

echo "[3/3] Server starten op http://127.0.0.1:8000 (docs: /docs)..."
( sleep 1 && (xdg-open "http://127.0.0.1:8000/docs" &>/dev/null || true) ) &

exec .venv/bin/python -m uvicorn app.main:app --reload

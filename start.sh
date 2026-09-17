#!/usr/bin/env bash
# Start backend + frontend (website) met één commando.
#
# Gebruik:
#   ./start.sh
#
# Probeert backend en frontend elk in een eigen terminalvenster te openen.
# Lukt dat niet (geen bekende terminal-emulator gevonden), dan draait de
# backend op de achtergrond en de frontend op de voorgrond in dit venster;
# Ctrl+C stopt dan beide.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

FRONTEND_CMD="cd '$SCRIPT_DIR/frontend' && ([ -d node_modules ] || npm install) && npm run web"

open_terminal() {
    local title="$1"
    local cmd="$2"
    if command -v gnome-terminal &>/dev/null; then
        gnome-terminal --title="$title" -- bash -c "$cmd; exec bash"
        return 0
    elif command -v konsole &>/dev/null; then
        konsole --new-tab -p tabtitle="$title" -e bash -c "$cmd; exec bash"
        return 0
    elif command -v xterm &>/dev/null; then
        xterm -T "$title" -e bash -c "$cmd; exec bash" &
        return 0
    fi
    return 1
}

echo "Backend starten (http://127.0.0.1:8000/docs)..."
if open_terminal "De Kast - backend" "'$SCRIPT_DIR/start-backend.sh'"; then
    BACKEND_IN_OWN_WINDOW=1
else
    BACKEND_IN_OWN_WINDOW=0
    "$SCRIPT_DIR/start-backend.sh" &
    BACKEND_PID=$!
    trap 'kill "$BACKEND_PID" 2>/dev/null || true' EXIT
fi

echo "Frontend (website) starten (http://localhost:3000)..."
if [ "$BACKEND_IN_OWN_WINDOW" -eq 1 ]; then
    open_terminal "De Kast - frontend" "$FRONTEND_CMD" || {
        echo "Geen terminal-emulator gevonden voor de frontend, draai handmatig:"
        echo "  cd frontend && npm install && npm run web"
    }
else
    echo "Geen terminal-emulator gevonden; backend draait op de achtergrond,"
    echo "frontend draait hieronder. Ctrl+C stopt beide."
    eval "$FRONTEND_CMD"
fi

#!/usr/bin/env bash
# Zet de code uit frontend/ in een React Native-project.
#
# Voorwaarde (eenmalig, handmatig, want interactief):
#   npx @react-native-community/cli init DeKastKiosk
# Draai dat commando vanuit de map BOVEN deze projectmap, zodat er een map
# "DeKastKiosk" naast "Hackaton1" ontstaat. Draai dit script daarna.
#
# Gebruik:
#   ./setup-frontend.sh
#   ./setup-frontend.sh /pad/naar/DeKastKiosk

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_SRC="$SCRIPT_DIR/frontend"
TARGET_PATH="${1:-$SCRIPT_DIR/../DeKastKiosk}"
TARGET_PATH="$(cd "$(dirname "$TARGET_PATH")" 2>/dev/null && pwd)/$(basename "$TARGET_PATH")" || true

PYTHON_BIN="python3"
if ! command -v "$PYTHON_BIN" &>/dev/null; then
    PYTHON_BIN="python"
fi

if [ ! -f "$TARGET_PATH/package.json" ]; then
    echo "Geen React Native-project gevonden op: $TARGET_PATH"
    echo "Maak het eerst aan met (vanuit de map boven dit project):"
    echo "  npx @react-native-community/cli init DeKastKiosk"
    echo "Of geef het juiste pad mee: ./setup-frontend.sh /pad/naar/DeKastKiosk"
    exit 1
fi

echo "[1/5] App-code kopieren naar $TARGET_PATH/src ..."
rm -rf "$TARGET_PATH/src"
cp -r "$FRONTEND_SRC/src" "$TARGET_PATH/src"

echo "[2/5] Dependencies samenvoegen in package.json ..."
"$PYTHON_BIN" - "$FRONTEND_SRC/package.json" "$TARGET_PATH/package.json" <<'PYEOF'
import json
import sys

source_path, target_path = sys.argv[1], sys.argv[2]

with open(source_path) as f:
    source = json.load(f)
with open(target_path) as f:
    target = json.load(f)

target.setdefault("dependencies", {}).update(source.get("dependencies", {}))
target.setdefault("devDependencies", {}).update(source.get("devDependencies", {}))

with open(target_path, "w") as f:
    json.dump(target, f, indent=2)
    f.write("\n")
PYEOF

echo "[3/5] index.js aanpassen naar ./src/App ..."
if [ -f "$TARGET_PATH/index.js" ]; then
    sed -i.bak -E "s#from ['\"]\./App['\"]#from './src/App'#" "$TARGET_PATH/index.js"
    rm -f "$TARGET_PATH/index.js.bak"
else
    echo "  Waarschuwing: index.js niet gevonden, sla deze stap over."
fi

echo "[4/5] NFC-permissie toevoegen aan AndroidManifest.xml ..."
MANIFEST="$TARGET_PATH/android/app/src/main/AndroidManifest.xml"
if [ -f "$MANIFEST" ]; then
    if ! grep -q "android.permission.NFC" "$MANIFEST"; then
        sed -i.bak -E "0,/<manifest[^>]*>/s##&\n    <uses-permission android:name=\"android.permission.NFC\" />#" "$MANIFEST"
        rm -f "$MANIFEST.bak"
    else
        echo "  NFC-permissie stond er al in."
    fi
else
    echo "  Waarschuwing: AndroidManifest.xml niet gevonden, sla deze stap over."
fi

echo "[5/5] npm install draaien ..."
( cd "$TARGET_PATH" && npm install )

echo ""
echo "Klaar. Start de app voortaan met:"
echo "  cd \"$TARGET_PATH\""
echo "  npm run android"

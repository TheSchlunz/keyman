#!/usr/bin/env bash

set -eu

## START STANDARD BUILD SCRIPT INCLUDE
# adjust relative paths as necessary
THIS_SCRIPT="$(greadlink -f "${BASH_SOURCE[0]}" 2>/dev/null || readlink -f "${BASH_SOURCE[0]}")"
. "$(dirname "$THIS_SCRIPT")/../../../resources/build/build-utils.sh"
## END STANDARD BUILD SCRIPT INCLUDE

THIS_DIR="$(dirname "$THIS_SCRIPT")"

mkdir -p "$THIS_DIR/host"
cp -R "$KEYMAN_ROOT/android/KMEA/app/src/main/assets/"* "$THIS_DIR/host/"
cp "$KEYMAN_ROOT/web/release/unminified/embedded/keyman.js" "$THIS_DIR/host/keymanandroid.js"
cp "$KEYMAN_ROOT/web/release/unminified/embedded/keyman.js.map" "$THIS_DIR/host/keyman.js.map"
cp "$KEYMAN_ROOT/web/release/unminified/embedded/resources/osk/kmwosk.css" "$THIS_DIR/host/kmwosk.css"
cp "$KEYMAN_ROOT/web/release/unminified/embedded/resources/osk/globe-hint.css" "$THIS_DIR/host/globe-hint.css"
cp "$KEYMAN_ROOT/web/release/unminified/embedded/resources/osk/keymanweb-osk.ttf" "$THIS_DIR/host/keymanweb-osk.ttf"

# Test keyboards

cp "$KEYMAN_ROOT/web/testing/web_context_tests.js" "$THIS_DIR/host/"
# android\KMEA\app\src\main\assets\keyboard.html
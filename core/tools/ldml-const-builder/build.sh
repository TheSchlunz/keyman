#!/usr/bin/env bash
#
# Builds /core/include/ldml/keyboardprocessor_ldml.h from /core/include/ldml/keyboardprocessor_ldml.ts
#

# Exit on command failure and when using unset variables:
set -eu

## START STANDARD BUILD SCRIPT INCLUDE
# adjust relative paths as necessary
THIS_SCRIPT="$(greadlink -f "${BASH_SOURCE[0]}" 2>/dev/null || readlink -f "${BASH_SOURCE[0]}")"
. "$(dirname "$THIS_SCRIPT")/../../../resources/build/build-utils.sh"
## END STANDARD BUILD SCRIPT INCLUDE

. "$KEYMAN_ROOT/resources/shellHelperFunctions.sh"

# This script runs from its own folder
cd "$(dirname "$THIS_SCRIPT")"

KBP_LDML_H_FILE="../../include/ldml/keyboardprocessor_ldml.h"

################################ Main script ################################

builder_describe "Build and run the constant builder for LDML" clean build run
builder_parse "$@"

# TODO: build if out-of-date if test is specified
# TODO: configure if npm has not been run, and build is specified


if builder_has_action clean; then
  rm -rf ../../include/ldml/build/
  # Not removing ${KBP_LDML_H_FILE} as it is checked in
  builder_report success clean
fi

if builder_has_action build; then
  # Generate index.ts
  npx tsc -b ../../include/ldml/

  builder_report success build
fi

if builder_has_action run; then
  node ../../include/ldml/build/core/include/ldml/ldml-const-builder.js > ${KBP_LDML_H_FILE}
  echo "Updated ${KBP_LDML_H_FILE}"

  builder_report success run
fi

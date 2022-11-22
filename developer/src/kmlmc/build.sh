#!/usr/bin/env bash
#
# Compiles the developer tools, including the language model compilers.
#

# Exit on command failure and when using unset variables:
set -eu

## START STANDARD BUILD SCRIPT INCLUDE
# adjust relative paths as necessary
THIS_SCRIPT="$(greadlink -f "${BASH_SOURCE[0]}" 2>/dev/null || readlink -f "${BASH_SOURCE[0]}")"
. "$(dirname "$THIS_SCRIPT")/../../../resources/build/build-utils.sh"
. "$KEYMAN_ROOT/resources/shellHelperFunctions.sh"
## END STANDARD BUILD SCRIPT INCLUDE
EX_USAGE=64

# Where to find lexical model types.
LEXICAL_MODELS_TYPES="$KEYMAN_ROOT/common/models/types"


# Build the main script.
build () {
  npm run build || fail "Could not build top-level JavaScript file."
}

display_usage ( ) {
  echo "Usage: $0 [-test] [-publish-to-npm]"
  echo "       $0 -help"
  echo
  echo "  -help                       displays this screen and exits"
  echo "  -test                       runs unit tests after building"
  echo "  -tdd                        runs unit tests WITHOUT building"
  echo "  -skip-package-install, -S   skip package installation"
  echo "  -publish-to-npm             publishes the current version to the npm package index"
  echo "  -dry-run                    do build, etc, but don't actually publish"
}

################################ Main script ################################

run_tests=0
install_dependencies=1
should_publish=0
npm_dist_tag=
should_dry_run=0

# Process command-line arguments
while [[ $# -gt 0 ]] ; do
  key="$1"
  case $key in
    -help|-h)
      display_usage
      exit
      ;;
    -dry-run)
      should_dry_run=1
      ;;
    -skip-package-install|-S)
      install_dependencies=0
      ;;
    -test)
      run_tests=1
      ;;
    -tdd)
      run_tests=1
      install_dependencies=0
      ;;
    -version)
      echo "Warning: -version is now ignored"
      ;;
    -tier)
      echo "Warning: -tier is now ignored"
      ;;
    -publish-to-npm)
      should_publish=1
      ;;
    *)
      echo "$0: invalid option: $key"
      display_usage
      exit $EX_USAGE
  esac
  shift # past the processed argument
done

# Dry run settings
if (( should_dry_run )); then
  DRY_RUN=--dry-run
else
  DRY_RUN=
fi

# Check if Node.JS/npm is installed.
type npm >/dev/null ||\
    fail "Build environment setup error detected!  Please ensure Node.js is installed!"

if (( install_dependencies )) ; then
  verify_npm_setup
  # We need to build keyman-version and lm-worker with a script for now
  "$KEYMAN_ROOT/common/web/keyman-version/build.sh" || fail "Could not build keyman-version"
fi

build || fail "Compilation failed."
echo "Typescript compilation successful."

if (( run_tests )); then
  npm test || fail "Tests failed"
fi

if (( should_publish )); then
  if [[ $TIER == stable ]]; then
    npm_dist_tag=latest
  else
    npm_dist_tag=$TIER
  fi

  set_npm_version

  # Note: In either case, npm publish MUST be given --access public to publish
  # a package in the @keymanapp scope on the public npm package index.
  #
  # See `npm help publish` for more details.
  echo "Publishing $DRY_RUN npm package with tag $npm_dist_tag"
  npm publish $DRY_RUN --access public --tag $npm_dist_tag || fail "Could not publish $npm_dist_tag release."

  # For now, kmlmc will have responsibility for publishing keyman-version. In
  # the future, we should probably have a top-level npm publish script that
  # publishes all modules for a given release version
  "$KEYMAN_ROOT/common/web/keyman-version/build.sh" publish $DRY_RUN
fi

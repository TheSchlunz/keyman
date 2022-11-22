#!/usr/bin/env bash

# set -e: Terminate script if a command returns an error
set -e

WORKING_DIRECTORY=`pwd`

## START STANDARD BUILD SCRIPT INCLUDE
# adjust relative paths as necessary
THIS_SCRIPT="$(greadlink -f "${BASH_SOURCE[0]}" 2>/dev/null || readlink -f "${BASH_SOURCE[0]}")"
. "$(dirname "$THIS_SCRIPT")/../../resources/build/build-utils.sh"
## END STANDARD BUILD SCRIPT INCLUDE

. "$KEYMAN_ROOT/resources/build/build-utils-ci.inc.sh"
. "$KEYMAN_ROOT/resources/shellHelperFunctions.sh"

# A simple utility script to facilitate our different modes for unit-testing KMW.
# It's rigged to be callable by NPM to facilitate testing during development when in other folders.

display_usage ( ) {
    echo "test.sh [-CI | -debug | -? | -h | -help] | [-log-level <level>] | [-reporter <reporter>]"
    echo
    echo "  -CI               to run unit tests in CI mode on BrowserStack."
    echo "                    This script requires your credentials to be set in environment variables - see "
    echo "                    https://stackoverflow.com/questions/32450546/hiding-browserstack-key-in-karma"
    echo ""
    echo "  -debug            to establish a Karma server that facilitates unit test debugging"
    echo "                    Not compatible with -CI."
    echo ""
    echo "  -log-level        to set the logging level used by Karma."
    echo "                    Valid options: 'debug', 'info', 'warn', 'error', 'disable'"
    echo ""
    echo "  -reporter         sets the test engine to utilize the specified <reporter>."
    echo "                    Valid options:  BrowserStack, teamcity, dots, progress, mocha"
    echo ""
    echo "  -? | -h | -help   to display this help information"
    echo ""
    echo "                    Specifying no option will perform a simple, single run of the test cases on"
    echo "                    the dominant set of browsers for the currently-detected active OS."
    echo ""
    exit 0
}

# Designed to determine which set of browsers should be available for local testing,
# based upon the current system OS.
get_OS ( ) {
  # Default value, since it's the most general case/configuration to detect.
  os_id="linux"

  # Subject to change with future improvements.
  if [[ "${OSTYPE}" = "darwin"* ]]; then
    os_id="mac"
  elif [[ "${OSTYPE}" = "msys" ]]; then
    os_id="win"
  elif [[ "${OSTYPE}" = "cygwin" ]]; then
    os_id="win"
  fi
}

get_browser_set_for_OS ( ) {
    if [ $os_id = "mac" ]; then
        BROWSERS="--browsers Firefox,Chrome,Safari"
    elif [ $os_id = "win" ]; then
        BROWSERS="--browsers Firefox,Chrome,Edge"
    else
        BROWSERS="--browsers Firefox,Chrome"
    fi
}

# Defaults
get_OS
get_browser_set_for_OS

CONFIG=manual.conf.js  # TODO - get/make OS-specific version
DEBUG=false
FLAGS=
HEADLESS_FLAGS=

# Parse args
while [[ $# -gt 0 ]] ; do
    key="$1"
    case $key in
        -CI)
            CONFIG=CI.conf.js
            HEADLESS_FLAGS="$HEADLESS_FLAGS --ci"
            ;;
        -log-level)
            shift
            FLAGS="--log-level=$1 $FLAGS"
            ;;
        -debug)
            # Disables the default 'run once, then done' configuration needed for CI.
            DEBUG=true
            FLAGS="--no-single-run $FLAGS"
            ;;
        -reporter)
            shift
            FLAGS="--reporters $1 $FLAGS"
            ;;
        -h)
            display_usage
            ;;
        -help)
            display_usage
            ;;
        -\?)
            display_usage
            ;;
    esac
    shift # past argument
done

if [ $DEBUG = true ] && [ $CONFIG = CI.conf.js ]; then
    echo "-CI and -debug are not compatible!"
    exit 1
fi

if [ $CONFIG = CI.conf.js ]; then
    # If doing a CI run, use the file's default browser selection.
    BROWSERS=
fi

BASE_PATH=`dirname $BASH_SOURCE`
cd $BASE_PATH/../source

# Compile our testing dependencies; make sure the script fails if compilation fails!
../tools/build.sh || fail "Dev resource compilation failed."

# Run our headless tests first.

# First:  Web-core tests.
pushd "$KEYMAN_ROOT/common/web/keyboard-processor"
./build.sh test $HEADLESS_FLAGS || fail "Tests failed by dependencies; aborting integration tests."
# Once done, now we run the integrated (KeymanWeb) tests.
popd

pushd "$KEYMAN_ROOT/common/web/input-processor"
./build.sh build:tools test $HEADLESS_FLAGS || fail "Tests failed by dependencies; aborting integration tests."
# Once done, now we run the integrated (KeymanWeb) tests.
popd

# Browserstack or CI-based tests

DO_BROWSER_TEST_SUITE=true

if [[ $VERSION_ENVIRONMENT == test ]]; then
  # Implied: CONFIG=CI.conf.js because `-CI` parameter is passed.
  #
  # If we are running a TeamCity test build, for now, only run BrowserStack
  # tests when on a PR branch with a title including "(web)" or with the label
  # test-browserstack. This is because the BrowserStack tests are currently
  # unreliable, and the false positive failures are masking actual failures.
  #
  # We do not run BrowserStack tests on master, beta, or stable-x.y test
  # builds.
  DO_BROWSER_TEST_SUITE=false
  if builder_pull_get_details; then
    if [[ $builder_pull_title =~ \(web\) ]] || builder_pull_has_label test-browserstack; then
      DO_BROWSER_TEST_SUITE=true
    fi
  fi
fi

CODE=0

if $DO_BROWSER_TEST_SUITE; then
  echo_heading "Running KeymanWeb integration test suite"
  npm --no-color run modernizr -- -c unit_tests/modernizr.config.json -d unit_tests/modernizr.js
  npm --no-color run karma -- start $FLAGS $BROWSERS unit_tests/$CONFIG

  CODE=$?
fi

exit $CODE

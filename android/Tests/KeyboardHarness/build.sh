#!/usr/bin/env bash
# Build KeyboardHarness test app


display_usage ( ) {
    echo "build.sh [-no-daemon] [-debug]"
    echo
    echo "Build KeyboardHarness test app"
    echo "  -no-daemon              Don't start the Gradle daemon. Use for CI"
    echo "  -debug                  Compile only Debug variant"
    exit 1
}

echo Build KeyboardHarness test app

#
# Prevents 'clear' on exit of mingw64 bash shell
#
SHLVL=0

NO_DAEMON=false
ONLY_DEBUG=false

# Parse args
while [[ $# -gt 0 ]] ; do
    key="$1"
    case $key in
        -no-daemon)
            NO_DAEMON=true
            ;;
        -debug)
            ONLY_DEBUG=true
            ;;
        -h|-\?)
            display_usage
            ;;
    esac
    shift # past argument
done

echo
echo "NO_DAEMON: $NO_DAEMON"
echo "ONLY_DEBUG: $ONLY_DEBUG"
echo

if [ "$NO_DAEMON" = true ]; then
  DAEMON_FLAG=--no-daemon
else
  DAEMON_FLAG=
fi

if [ "$ONLY_DEBUG" = true ]; then
  BUILD_FLAG=assembleDebug
else
  BUILD_FLAG=build
fi

echo Build KeyboardHarness
./gradlew $DAEMON_FLAG clean $BUILD_FLAG


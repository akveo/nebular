#!/bin/bash

# Script that runs in every Travis CI container. The script is responsible for delegating
# to the different scripts that should run for specific Travis jobs in a build stage.

# The script should immediately exit if any command in the script fails.
set -e

# Go to project directory
cd $(dirname $0)/../..

echo ""
echo "Building sources and running tests. Running mode: ${MODE}"
echo ""

# Load the retry-call utility function.
source ./scripts/ci/retry-call.sh

# Variable the specifies how often the wait script should be invoked if it fails.
WAIT_RETRIES=2

if [[ -z "$TRAVIS" ]]; then
  echo "This script can only run inside of Travis build jobs."
  exit 1
fi

# Get commit diff
if [ "$TRAVIS_PULL_REQUEST" = "false" ]; then
  fileDiff=$(git diff --name-only $TRAVIS_COMMIT_RANGE)
else
  fileDiff=$(git diff --name-only $TRAVIS_BRANCH...HEAD)
fi

# Check if tests can be skipped
if [[ ${fileDiff} =~ ^(.*\.md\s*)*$ ]]; then
  echo "Skipping tests since only markdown files changed."
  exit 0
fi

# Start tunnel to sauce labs
./scripts/ci/sauce/start-tunnel.sh

# Wait when connected
retryCall ${WAIT_RETRIES} ./scripts/ci/sauce/wait-tunnel.sh

if [[ "${MODE}" = lint ]]; then
  npm run ci:lint
elif [[ "${MODE}" = build ]]; then
  npm run ci:build
elif [[ "${MODE}" = e2e ]]; then
  npm run ci:e2e
elif [[ "${MODE}" = unit_test ]]; then
  npm run ci:test
elif [[ "${MODE}" = docs ]]; then
  npm run ci:docs
fi

# Shut down the tunnel
./scripts/ci/sauce/stop-tunnel.sh

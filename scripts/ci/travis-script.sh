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
source ./scripts/ci/tunnel.sh

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

start_tunnel
wait_for_tunnel

if [[ "${MODE}" = lint ]]; then
  npm run ci:lint
elif [[ "${MODE}" = build ]]; then
  npm run ci:build
elif [[ "${MODE}" =~ ^.*_(e2e)$ ]]; then
  npm run ci:e2e
elif [[ "${MODE}" =~ ^.*_(unit_test)$ ]]; then
  npm run ci:test
elif [[ "${MODE}" = docs ]]; then
  npm run ci:docs
elif [[ "${MODE}" = dev_deploy ]]; then
  DEMO_DIR="demo-${TRAVIS_COMMIT}"
  DOCS_DIR="docs-${TRAVIS_COMMIT}"

  npm run build:prod -- --base-href "" --output-path "ci/dist/${DEMO_DIR}"
  npm run docs:prepare
  npm run docs:build -- --output-path "ci/dist/${DOCS_DIR}"

  npm run firebase use dev -- --token="${FIREBASE_KEY}"
  npm run firebase deploy -- --token="${FIREBASE_KEY}"

  GREEN='\033[0;32m'
  echo ""
  echo -e "${GREEN}Published playground at ${DEV_DEPLOY_HOST}${DEMO_DIR}"
  echo -e "${GREEN}Published docs at ${DEV_DEPLOY_HOST}/${DOCS_DIR}"
  echo ""
fi

teardown_tunnel

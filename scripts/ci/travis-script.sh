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

# Load utility function.
source ./scripts/ci/tunnel.sh
source ./scripts/ci/publish.sh
source ./scripts/ci/deploy.sh
source ./scripts/ci/packages-smoke.sh
source ./scripts/ci/deploy-docs.sh

if [[ -z "$TRAVIS" ]]; then
  echo "This script can only run inside of Travis build jobs."
  exit 1
fi

if [[ "${MODE}" = docs ]]; then
  npm run ci:docs
elif [[ "${MODE}" = deploy_dev ]]; then
  deploy_dev
elif [[ "${MODE}" = publish_dev ]]; then
  publish_dev
elif [[ "${MODE}" = deploy_docs ]]; then
  deploy_docs
  exit 0
fi

CURRENT_BRANCH=$(if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then echo $TRAVIS_BRANCH; else echo $TRAVIS_PULL_REQUEST_BRANCH; fi)

# Get commit diff
if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
  fileDiff=$(git diff --name-only $TRAVIS_COMMIT_RANGE)
else
  git remote set-branches --add origin $TRAVIS_BRANCH
  git fetch origin $TRAVIS_BRANCH
  fileDiff=$(git diff --name-only HEAD origin/${TRAVIS_BRANCH})
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
  npm install codecov -g && codecov
  npm run test:schematics
elif [[ "${MODE}" = packages_smoke ]]; then
  packages_smoke
fi

teardown_tunnel

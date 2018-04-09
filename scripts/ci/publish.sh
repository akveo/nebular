#!/usr/bin/env bash

publish_dev() {
  echo "Releasing development version..."
  echo "Current branch set to '${CURRENT_BRANCH}'"

  if [ "${CURRENT_BRANCH}" = master ]; then
    echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN_DEV}" > ~/.npmrc
    echo "NPM authenticated as '$(npm whoami)'"

    export NEBULAR_VERSION_APPENDIX=$(git rev-parse --short HEAD)
    npm run release:dev
  else
    echo "Skipping development build publish as only allowed on master branch."
    exit 0
  fi
}

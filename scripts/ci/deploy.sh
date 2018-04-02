#!/usr/bin/env bash

deploy_dev() {
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
}

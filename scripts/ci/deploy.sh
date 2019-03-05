#!/usr/bin/env bash

deploy_dev() {
  DEMO_DIR="demo-${TRAVIS_COMMIT}"
  DOCS_DIR="docs-${TRAVIS_COMMIT}"
  FIREBASE_KEY=`echo ${FIREBASE_KEY} | rev`

  DEMO_URL=${DEV_DEPLOY_HOST}${DEMO_DIR}
  DOCS_URL=${DEV_DEPLOY_HOST}${DOCS_DIR}

  mkdir -p ci/dist
  echo "<html><body><a href="${DEMO_URL}">Playground</a><br><a href="${DOCS_URL}">Docs</a></body></html>" > ci/dist/index.html;

  npm run build:prod -- --base-href="/${DEMO_DIR}/" --output-path "ci/dist/${DEMO_DIR}"
  npm run docs:prepare
  npm run build -- docs --prod --base-href="/${DOCS_DIR}/" --output-path="ci/dist/${DOCS_DIR}"


  npm run firebase use dev -- --token="${FIREBASE_KEY}"
  npm run firebase deploy -- --token="${FIREBASE_KEY}"

  GREEN='\033[0;32m'
  echo ""
  echo -e "${GREEN}PR published at ${DEV_DEPLOY_HOST}"
  echo -e "${GREEN}Playground published at ${DEMO_URL}"
  echo -e "${GREEN}Docs published at ${DOCS_URL}"
  echo ""
}

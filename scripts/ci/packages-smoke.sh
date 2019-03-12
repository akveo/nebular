#!/usr/bin/env bash

packages_smoke() {
  echo "Starting framework build smoke testing"
  PROJECT="packages-smoke"

  echo "Building packages"
  npm run release:prepare

  echo "Setting up playground application for testing"
  rm -rf ../${PROJECT}
  cp -r ./${PROJECT} ../${PROJECT}
  cd ../${PROJECT}
  npm install

  echo "Installing built packages"
  mkdir -p node_modules/@nebular
  cp -r ../nebular/src/.lib/* node_modules/@nebular
  # calling npm install again to install peer dependencies of @nebular/* packages
  npm install

  echo "Verifying application build"
  npm run build --prod --aot
  npm run e2e

  echo "Clean"
  cd ..; rm -rf -- ${PROJECT}
}

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
  cp -r ../nebular/src/.lib/* node_modules/@nebular

  echo "Verifying application build"
  npm run build --prod --aot
  npm run e2e

  echo "Clean"
  cd ..; rm -rf -- ${PROJECT}
}

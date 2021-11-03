#!/usr/bin/env bash

packages_smoke() {
  echo "Starting framework build smoke testing"
  PROJECT="packages-smoke"

  echo "Building packages"
  npm run build:packages

  echo "Setting up playground application for testing"
  rm -rf ../${PROJECT}
  cp -r ./${PROJECT} ../${PROJECT}
  cd ../${PROJECT}
  mkdir -p .lib
  cp -r ../nebular/dist/* ./.lib

  echo "Installing built packages"
  npm install

  echo "Verifying application build"
  npm run build -- --configuration=production
  npm run e2e

  echo "Run with ssr"
  npm run build:ssr
  npm run serve:ssr

  echo "Clean"
  cd ..; rm -rf -- ${PROJECT}
}

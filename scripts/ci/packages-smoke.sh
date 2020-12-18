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
  mkdir -p .lib
  cp -r ../nebular/src/.lib/* ./.lib

  echo "Installing built packages"
  npm install

  echo "Verifying application build"
  npm run build -- --prod
  npm run build -- --configuration=production-2015
  npm run e2e
  npm run e2e -- --configuration=production-2015

  echo "Run with ssr"
  npm run build:ssr
  npm run serve:ssr

  echo "Clean"
  cd ..; rm -rf -- ${PROJECT}
}

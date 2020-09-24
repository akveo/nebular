#!/usr/bin/env bash


packages_smoke_ts3() {
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

# @breaking-change Remove @7.0.0. Not a breaking change, just a reminder to remove checks with multiple TS versions.
# Revert changes in this file introduced in the PR #2523.
# Added for Nebular 6 as Angular 10 supports both TypeScript 3 and 4 versions.
packages_smoke_ts4() {
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
  npm run ng -- update @angular/core @angular/cli @angular/cdk --force
  npm i -D typescript@4

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

packages_smoke() {
  local d=$(pwd)
  packages_smoke_ts3
  cd "$d" || exit
  packages_smoke_ts4
}

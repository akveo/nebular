#!/usr/bin/env bash

# Updates packages-smoke/package-lock.json with dependencies from built Nebular packages

PROJECT="packages-smoke"

echo "Building packages"
npm run release:prepare

echo "Setting up playground application for testing"
cd ./${PROJECT}
npm install

echo "Installing built packages"
cp -r ../nebular/src/.lib/* node_modules/@nebular

echo "Updating package-lock.json"
npm install

#!/usr/bin/env bash

cd packages-smoke
npm ci

echo "Verifying application build"
npm run build -- --configuration=production
npm run e2e

echo "Run with ssr"
npm run build:ssr
npm run serve:ssr

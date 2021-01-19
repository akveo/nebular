#!/usr/bin/env bash

# Iterates over all modules bundled in the src/.lib and publish them
for dir in ./src/.lib/*/
do
    dir=${dir%*/}
    npm publish --tag v6-lts --access=public src/.lib/${dir##*/}
done

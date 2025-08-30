#!/usr/bin/env bash

set -e

rm -rf node_modules

echo '---'
echo 'npm install'
echo '---'
npm install

echo '---'
echo 'webpack build'
echo '---'
npx webpack --config webpack.config.js

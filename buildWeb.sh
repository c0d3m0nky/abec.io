#!/bin/bash

set -e

rm -rf node_modules

echo '---'
echo 'npm install'
echo '---'
npm install

echo '---'
echo 'webpack build'
echo '---'
npm run build

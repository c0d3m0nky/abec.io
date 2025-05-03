#!/usr/bin/bash

set -e

cd wsrc

echo '---'
echo 'npm install'
echo '---'
npm install

echo '---'
echo 'webpack build'
echo '---'
npm run develop


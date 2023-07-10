#!/usr/bin/bash

set -e

export NVM_DIR=$HOME/.nvm;
source "$NVM_DIR"/nvm.sh;

cd wsrc

echo '---'
echo 'nvm use'
echo '---'
nvm use

echo '---'
echo 'npm install'
echo '---'
npm install

echo '---'
echo 'webpack build'
echo '---'
npm run develop


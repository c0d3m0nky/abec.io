#!/usr/bin/bash

export NVM_DIR=$HOME/.nvm;
source "$NVM_DIR"/nvm.sh;


mkdir -p foo ./assets/dist

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
echo 'copying jquery bundle'
echo '---'
cp ./node_modules/jquery/dist/jquery.js ../assets/dist

echo '---'
echo 'typescript build'
echo '---'
./node_modules/.bin/tsc


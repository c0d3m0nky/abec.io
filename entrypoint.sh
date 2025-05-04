#!/bin/bash

set -e

echo 'entrypoint start'

if [[ -d /abec.io ]]; then
  rm -rf /abec.io
fi

if [[ -d /webBuild ]]; then
  rm -rf /webBuild
fi

echo 'Setting up site'

mkdir /abec.io

if [[ ! -d /repo ]]; then
  mkdir /repo
fi

cd /repo

doPull=0

if [[ ! -d ./.git ]]; then
  echo "Cloning repo"
  echo "[REMOVE]: $PROJECT_REPO"
  git clone "$PROJECT_REPO" ./
else
  doPull=1
fi

if [[ -n $REPO_BRANCH ]]; then
  git checkout "$REPO_BRANCH"
fi

if [[ $doPull == 1 && $NO_PULL != true ]]; then
  echo 'Pulling repo'
  git pull
fi

echo 'Setting up webBuild script'
mkdir /webBuild
cp -r wsrc/ /webBuild/wsrc
cd /webBuild/wsrc

echo 'Running webBuild script'
/repo/buildWeb.sh

cd /repo

echo 'Copying src and webBuild'
cp -r base_site /abec.io
cp -r /webBuild/assets /abec.io
cp -r assets/* /abec.io/assets
cp -r static /abec.io
cp -r tools /abec.io
cp -r templates /abec.io
cp -r utils /abec.io
cp manage.py /abec.io
cp requirements.txt /abec.io

cd /abec.io

echo 'Installing requirements'
pip install --no-cache-dir --upgrade -r requirements.txt

echo ''
echo ''
echo '---> starting site' && python manage.py runserver 0.0.0.0:80 && echo '---> ended'
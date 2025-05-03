#!/usr/bin/bash

set -e

if [[ ! -d /abec.io ]]; then
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

  if [[ $doPull == 1 ]]; then
    git pull
  fi

  echo 'Running build script'
  ./buildWeb.sh

  echo 'Copying src'
  cp base_site /abec.io
  cp assets /abec.io
  cp static /abec.io
  cp tools /abec.io
  cp templates /abec.io
  cp utils /abec.io
  cp manage.py /abec.io
  cp requirements.txt /abec.io

  cd /abec.io

  echo 'Installing requirements'
  pip install --no-cache-dir --upgrade -r requirements.txt

fi

echo ''
echo ''
echo '---> starting site' && python manage.py runserver 0.0.0.0:80 && echo '---> ended'
#!/usr/bin/bash

set -e

dockerAuth=$(cat ~/.docker/config.json | jq -r '.auths["d.espacebyte.net"].auth')

if [[ -z "$dockerAuth" ]]; then
  echo "Not logged into d.espacebyte.net. Run login command"
  echo "docker login d.espacebyte.net"
  exit 1
fi

currbranch=$(git rev-parse --abbrev-ref HEAD)

if [[ $currbranch != 'main' && $currbranch != 'dev' ]]; then
  echo 'Not a deployable branch'
  exit
fi

nextv=$(cat ./version | awk -F. -v OFS=. '{$NF += 1 ; print}')

if [[ $currbranch == 'main' ]]; then
  tag='latest'
  tagv="$nextv"
else
  tag="$currbranch"
  tagv="${currbranch}-${nextv}"
fi

read -p "Build $tagv? " doBuild

if [[ $doBuild != y ]]; then
  exit 0
fi

echo $nextv > ./version

echo "Building with tags $tag $tagv"
docker build -t d.espacebyte.net/berto/abec.io:${tag} -t d.espacebyte.net/berto/abec.io:${tagv} ./
docker push d.espacebyte.net/berto/abec.io:${tagv}
docker push d.espacebyte.net/berto/abec.io:${tag}

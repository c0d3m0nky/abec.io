#!/usr/bin/bash

rm -r assets/dist

./buildWeb.sh

docker build -t c0d3m0nk3y/abec.io:latest ./
docker tag c0d3m0nk3y/abec.io localhost:5000/c0d3m0nk3y/abec.io
docker push localhost:5000/c0d3m0nk3y/abec.io

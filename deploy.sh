#!/usr/bin/env bash

docker build -t d.espacebyte.net/abec/abec.io:latest ./
#docker tag abec/abec.io d.espacebyte.net/abec/abec.io
docker push d.espacebyte.net/abec/abec.io

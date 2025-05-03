FROM python:3.12-alpine

ARG logPrefix="**** "
ARG logSuffix="  ****"

COPY ./entrypoint.sh /startup/entrypoint.sh
COPY ./buildWeb.sh /startup/buildWeb.sh

RUN \
  printf "${logPrefix}install packages${logSuffix}" && \
  apk add --no-cache \
    git \
    npm

CMD /startup/entrypoint.sh
#&& echo '---> django migrations' && python manage.py migrate

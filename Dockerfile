FROM python:3.12-alpine

ARG logPrefix="**** "
ARG logSuffix="  ****"

COPY ./entrypoint.sh /startup/entrypoint.sh

RUN \
  printf "${logPrefix}Setting permissions${logSuffix}" && \
  chmod +x /startup/entrypoint.sh

RUN \
  printf "${logPrefix}install packages${logSuffix}" && \
  apk add --no-cache \
    bash \
    git \
    npm

CMD /startup/entrypoint.sh
#&& echo '---> django migrations' && python manage.py migrate

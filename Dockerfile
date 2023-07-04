FROM python:3.11

WORKDIR /abec.io

COPY ./base_site /abec.io/base_site/
COPY ./assets /abec.io/assets/
COPY ./static /abec.io/static/
COPY ./tools /abec.io/tools/
COPY ./templates /abec.io/templates/
COPY ./manage.py /abec.io/manage.py
COPY ./requirements.txt /abec.io/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /abec.io/requirements.txt

CMD echo '---> pip pip hooray' && pip install --no-cache-dir --upgrade -r /abec.io/requirements.txt && echo '---> starting site' && python manage.py runserver 0.0.0.0:80 && echo '---> ended'
#&& echo '---> django migrations' && python manage.py migrate

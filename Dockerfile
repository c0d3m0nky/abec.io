FROM python:3.11

WORKDIR /abec.io

COPY ./src /abec.io/src
COPY ./manage.py /abec.io/manage.py
COPY ./requirements.txt /abec.io/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /abec.io/requirements.txt

CMD echo '---> pip pip hooray' && pip install --no-cache-dir --upgrade -r /abec.io/requirements.txt && echo '---> django migrations' && python manage.py migrate && echo '---> starting site' && python manage.py runserver 0.0.0.0:80 && echo '---> ended'

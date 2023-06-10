FROM python:3.11

WORKDIR /abec.io

COPY ./src /abec.io/src
COPY ./manage.py /abec.io/manage.py
COPY ./requirements.txt /abec.io/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /abec.io/requirements.txt

CMD pip install --no-cache-dir --upgrade -r /abec.io/requirements.txt && python manage.py runserver 80
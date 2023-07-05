from django.http import HttpResponse
from django.shortcuts import render
import logging.config

logger = logging.getLogger(__name__)


def index(request):
    logger.debug(f'[VIEW]: {__name__}')

    return render(request, "static/index.html", {})


def resume(request):
    logger.debug(f'[VIEW]: {__name__}')

    return render(request, "static/resume.html", {})




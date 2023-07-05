from django.http import HttpResponse
from django.shortcuts import render
import logging

logger = logging.getLogger(__name__)
booplogger = logging.getLogger('boop')


def round_tracker(request):
    logger.warning(f'[VIEW]: {__name__}')
    booplogger.error(f'[VIEW]: boop')

    return render(request, "dnd/round-tracker.html", {})

from django.http import HttpResponse
from django.shortcuts import render
import logging

logger = logging.getLogger(__name__)


def round_tracker(request):
    return render(request, "dnd/round-tracker.html", {'hide_sample': 'hide_sample' in request.GET})

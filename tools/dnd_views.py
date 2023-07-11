from os import environ
from django.http import HttpResponse, HttpRequest, HttpHeaders
from django.shortcuts import render
from typing import Tuple, List
import logging

import utils.u_http as http

logger = logging.getLogger(__name__)

def round_tracker(request: HttpRequest):
    ctx = {'plugin_layout': 'plugin_layout' in request.GET}
    resp: HttpResponse = render(request, "dnd/round-tracker.html", ctx)

    http.xframe.inject(resp)

    return resp

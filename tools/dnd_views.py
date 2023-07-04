from django.http import HttpResponse
from django.shortcuts import render


def round_tracker(request):
    return render(request, "dnd/round-tracker.html", {})




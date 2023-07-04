from django.http import HttpResponse
from django.shortcuts import render


def index(request):
    return render(request, "static/index.html", {})


def resume(request):
    return render(request, "static/resume.html", {})




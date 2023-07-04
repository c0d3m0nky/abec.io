from django.urls import path

from . import views
from . import dnd_views

urlpatterns = [
    path("dnd/roundtracker", dnd_views.round_tracker, name="roundtracker")
]

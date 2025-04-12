from os import environ
from django.http import HttpResponse


class _XFrameInjection():
    _xframe_origins: str | None

    def __init__(self):
        self._xframe_origins = None

        if 'X_FRAME_ORIGINS' in environ:
            xfl = [xfo.strip(' ') for xfo in environ.get('X_FRAME_ORIGINS').split(';')]

            if xfl:
                self._xframe_origins = "frame-ancestors 'self' " + ' '.join(xfl)

    def inject(self, response: HttpResponse):
        if self._xframe_origins:
            response.headers['Content-Security-Policy'] = self._xframe_origins


xframe = _XFrameInjection()

from . import settings


def settings_model(request):
    # noinspection PyUnusedLocal
    request = request
    return {
        'settings_debug': settings.DEBUG,
        'settings_dev': settings.DEV_MODE
    }

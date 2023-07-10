from . import settings


def settings_model(request):
    # return the value you want as a dictionnary. you may add multiple values in there.
    return {
        'settings_debug': settings.DEBUG,
        'settings_dev': settings.DEV_MODE
    }

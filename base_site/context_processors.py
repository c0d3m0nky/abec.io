from . import settings


def settings_model(request):
    request = request
    site_host = request.META['HTTP_HOST']

    if site_host == 'abec.io':
        site_base_title = 'abec.io'
        site_host_display = site_host
    elif site_host == 'abec.dev':
        site_base_title = 'abec.dev'
        site_host_display = site_host
    elif site_host.startswith('localhost'):
        site_base_title = 'abec.local'
        site_host_display = site_base_title
    else:
        site_base_title = 'abec.wtf'
        site_host_display = site_base_title

    return {
        'settings_debug': settings.DEBUG,
        'settings_dev': settings.DEV_MODE,
        'site_host': site_host,
        'site_host_display': site_host_display,
        'site_base_title': site_base_title
    }

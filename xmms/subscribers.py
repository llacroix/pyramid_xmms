import pyramid.threadlocal as threadlocal
import logging 

def includeme(config):
    config.add_subscriber(add_xmms, "pyramid.events.NewRequest")
    config.add_subscriber(add_renderer_globals, "pyramid.events.BeforeRender")

def add_xmms(event):
    request = event.request
    request.client = request.registry.xmms

def add_renderer_globals(event):
    """A subscriber for ``pyramid.events.BeforeRender`` events.  I add
    some :term:`renderer globals` with values that are familiar to Pylons
    users.
    """
    renderer_globals = event
    request = event.get("request") or threadlocal.get_current_request()


    renderer_globals['request'] = request
    renderer_globals['static_url'] = request.static_url
    renderer_globals['route_url'] = request.route_url

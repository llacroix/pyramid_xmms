#from gevent import monkey; monkey.patch_socket()
from pyramid.config import Configurator
from xmmsclient import XMMSSync
from .tools import when_ready, on_starting
from gunicorn.config import WhenReady, OnStarting


def log_request(self):
    log = self.server.log
    if log:
        if hasattr(log, "info"):
            log.info(self.format_request() + '\n')
        else:
            log.write(self.format_request() + '\n')

import gevent.pywsgi
gevent.pywsgi.WSGIHandler.log_request = log_request

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """

    config = Configurator(settings=settings)
    config.add_static_view('static', 'static', cache_max_age=3600)

    config.add_route('home', '/')
    config.add_route('socket', '/socket')
    config.add_route('upload', '/upload')
    config.add_route('notifications', '/wait')
    config.add_route('notify', '/notify')

    # Setup json-rpc
    config.include('pyramid_rpc.jsonrpc')
    config.add_jsonrpc_endpoint('api', '/api')

    config.registry.xmms = XMMSSync('wxmms2')
    config.registry.xmms.connect()

    config.include('.subscribers')

    config.scan()
    app = config.make_wsgi_app()

    return app

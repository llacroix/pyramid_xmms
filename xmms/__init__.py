from pyramid.config import Configurator
from xmmsclient import XMMSSync

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)
    config.add_static_view('static', 'static', cache_max_age=3600)

    config.add_route('home', '/')
    config.add_route('upload', '/upload')

    # Setup json-rpc
    config.include('pyramid_rpc.jsonrpc')
    config.add_jsonrpc_endpoint('api', '/api')

    config.registry.xmms = XMMSSync()
    config.registry.xmms.connect()

    config.include('.subscribers')

    config.scan()
    return config.make_wsgi_app()

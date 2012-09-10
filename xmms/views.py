from pyramid.interfaces import IRequest
from pyramid.interfaces import IRouteRequest
from pyramid.interfaces import IView
from pyramid.interfaces import IViewClassifier
from pyramid.interfaces import IViewMapperFactory

from zope.interface import implements
from zope.interface import providedBy



from pyramid.view import view_config
from pyramid.request import Request

from pyramid_rpc.jsonrpc import jsonrpc_method
from xmmsclient import xmmsvalue
from os.path import join
from pyramid.response import Response
import json

import logging
log = logging.getLogger('fun tester')

from .models import Observer, observers
from .api import ws_views

@view_config(route_name='home', renderer='mytemplate.mako')
def my_view(request):
    return {'project':'xmms'}

@view_config(route_name='socket', renderer="json")
def wsocket(request):
    ws = request.environ['wsgi.websocket']

    while True:

        data = ws.receive()

        req = json.loads(data)

        resp = {
            'jsonrpc': '2.0',
            'method': req.get('method'),
            'id': req.get('id'),
        }

        #from pyramid_rpc.api import view_lookup
        try:
            print req
            params = req.get('params') or []
            data = ws_views[req.get('method')](request, *params)
            resp['result'] = data
        except:
            data = { 'code': -32601, 'message': 'method not found' }
            resp['error'] = data

        ws.send(json.dumps(resp))

@view_config(route_name='upload', renderer="json")
def upload(request):
    files = request.POST.getall('files')
    directory = request.registry.settings.get('directories.music')
    directory_url = "file://%s" % directory
    
    for file in files:
        filename = join(directory, file.filename)
        filename_url = "file://%s" % filename
        out = open(filename, 'wb')
        fin = file.file
        # Finally write the data to the output file
        fin.seek(0)
        while 1:
            data = fin.read(2<<16)
            if not data:
                break
            out.write(data)
        out.close()

        request.client.medialib_add_entry(filename_url)

    #request.client.medialib_import_path(directory_url)

    return {'ok': len(files)}


@view_config(route_name='notifications', renderer="json")
def wait(request):
    obs = Observer(obss=observers)

    observers.append(obs)

    r = Response()
    r.content_type = 'application/json'
    r.app_iter = obs
    return r


@view_config(route_name='notify', renderer="json")
def notify(request):

    for i in observers:
        i.put('hello')
        i.put(StopIteration)

    return len(observers)

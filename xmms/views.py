from pyramid.view import view_config
from pyramid_rpc.jsonrpc import jsonrpc_method
from xmmsclient import xmmsvalue

BASIC_INFO = ['id', 'title', 'artist', 'album']

@view_config(route_name='home', renderer='mytemplate.mako')
def my_view(request):
    return {'project':'xmms'}

@jsonrpc_method('playback.start', endpoint="api")
def playback_start(request):
    request.client.playback_start()

@jsonrpc_method('playback.stop', endpoint="api")
def playback_stop(request):
    request.client.playback_stop()

@jsonrpc_method('playback.pause', endpoint="api")
def playback_pause(request):
    request.client.playback_pause()

@jsonrpc_method('playback.get_current_id', endpoint="api")
def playback_get_current_id(request):
    return request.client.playback_current_id()

@jsonrpc_method('playback.jump', endpoint="api")
def playback_jump(request, position):
    request.client.playlist_set_next(position)
    request.client.playback_tickle()

@jsonrpc_method('playback.next', endpoint="api")
def playback_next(request):
    position = request.client.playlist_current_pos().get('position')
    request.client.playlist_set_next(position + 1)
    request.client.playback_tickle()

@jsonrpc_method('playback.previous', endpoint="api")
def playback_prev(request):
    position = request.client.playlist_current_pos().get('position') - 1

    if position < 1:
        position = 0

    request.client.playlist_set_next(position)
    request.client.playback_tickle()


def parse_media(media):
    new_media = dict()

    for key, val in media.items():
        new_media[key[1]] = val

    return new_media

@jsonrpc_method('playlist.current', endpoint='api')
def playlist_current(request):
    x = request.client
    ids = x.playlist_list_entries()

    ret = []
    for id in ids:
        media = x.medialib_get_info(id)
        ret.append(parse_media(media))

    return ret

@jsonrpc_method('playlist.add_id', endpoint='api')
def playlist_add_id(request, id, playlist=None):
    return request.client.playlist_add_id(id, playlist)

@jsonrpc_method('medialib.getAll', endpoint="api")
def medialib_get_all(request):
    return request.client.coll_query_infos(xmmsvalue.Universe(), BASIC_INFO)

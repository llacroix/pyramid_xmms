from pyramid.view import view_config
from pyramid_rpc.jsonrpc import jsonrpc_method
from xmmsclient import xmmsvalue
from os.path import join

from .models import notify, notify_all


BASIC_INFO = ['id', 'title', 'artist', 'album', 'duration' ]

def parse_media(media):
    '''Parse media return by get info... 
    It returns a key pair invalid for json
    {(plugin, type): value}
    Possible that two plugins will provide same type
    and the result of one plugin could be deleted...
    '''
    new_media = dict()
    important = dict()
    plugin = 'client/wxmms2'

    for key, val in media.items():
        new_media[key[1]] = val
        if key[0] == plugin:
            important[key[1]] = val
    new_media.update(important)

    return new_media


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
    notify_all({'playback.position': position})
    return position

@jsonrpc_method('playback.next', endpoint="api")
def playback_next(request):
    request.client.playlist_set_next_rel(1)
    request.client.playback_tickle()
    return request.client.playlist_current_pos()

@jsonrpc_method('playback.previous', endpoint="api")
def playback_prev(request):
    request.client.playlist_set_next_rel(-1)
    request.client.playback_tickle()

    return request.client.playlist_current_pos()

## Collections


@jsonrpc_method('collection.list', endpoint='api')
def collection_list(request):
    x = request.client
    return x.coll_list()


## PlayList

@jsonrpc_method('playlist.current', endpoint='api')
def playlist_current(request):
    x = request.client
    ids = x.playlist_list_entries()

    ret = []
    for id in ids:
        media = x.medialib_get_info(id)
        ret.append(parse_media(media))

    return ret

@jsonrpc_method('playlist.create', endpoint='api')
def playlist_create(request, name):
    x = request.client
    return x.playlist_create(name)

@jsonrpc_method('playlist.list', endpoint='api')
def playlist_list(request):
    x = request.client
    return x.playlist_list()

@jsonrpc_method('playlist.load', endpoint='api')
def playlist_load(request, name):
    x = request.client
    return x.playlist_load(name)

@jsonrpc_method('playlist.add_id', endpoint='api')
def playlist_add_id(request, id, playlist=None):
    return request.client.playlist_add_id(id, playlist)

@jsonrpc_method('playlist.remove_id', endpoint='api')
def playlist_remove_id(request, id, playlist=None):
    return request.client.playlist_remove_entry(id, playlist)

@jsonrpc_method('playlist.clear', endpoint='api')
def playlist_clear(request, playlist=None):
    request.client.playlist_clear(playlist)

# MediaLib
@jsonrpc_method('medialib.getAll', endpoint="api")
def medialib_get_all(request):
    return request.client.coll_query_infos(xmmsvalue.Universe(), BASIC_INFO)

@jsonrpc_method('medialib.get_info', endpoint="api")
def medialib_get_info(request, id):
    return parse_media(request.client.medialib_get_info(id))

@jsonrpc_method('medialib.set_property', endpoint="api")
def medialib_set_property(request, id, key, value):
    return request.client.medialib_property_set(id, key, value)
    
@jsonrpc_method('medialib.unset_property', endpoint="api")
def medialib_unset_property(request, id, key):
    return request.client.medialib_property_remove(id, key)

@jsonrpc_method('medialib.rehash', endpoint="api")
def medialib_rehash(request):
    '''Rehash the medialib for changes, in files'''
    return request.client.medialib_rehash()

@jsonrpc_method('medialib.refresh', endpoint='api')
def medialib_refresh(request, id):
    '''Reimport the configured path, in order to add
    new files that haven't been added for some reasons

    It shouldn't be needed but if a file has been uploaded 
    and isn't loaded in the medialib. It should be done here
    '''
    # TODO reimport path
    return None

@jsonrpc_method('medialib.remove', endpoint='api')
def medialib_remove(request, id):
    # TODO remove from disk too 
    return request.client.remove_entry(id)

# Server call

@jsonrpc_method('server.volume', endpoint='api')
def server_volume(request, volume=None, channel='master'):
    # if volume is set then set it
    if volume and 0 <= volume <= 100:
        request.client.playback_volume_set(channel, volume)

    ret = request.client.playback_volume_get().get(channel)
    notify_all(dict(volume=ret))
    return ret


from pyramid.view import view_config
from pyramid_rpc.jsonrpc import jsonrpc_method
from xmmsclient import xmmsvalue
from os.path import join

BASIC_INFO = ['id', 'title', 'artist', 'album', 'duration' ]

@view_config(route_name='home', renderer='mytemplate.mako')
def my_view(request):
    return {'project':'xmms'}

@view_config(route_name='upload', renderer="json")
def upload(request):
    files = request.POST.getall('files')
    directory = request.registry.settings.get('directories.music')
    directory_url = "file://%s" % directory
    
    for file in files:
        out = open(join(directory, file.filename), 'wb')
        fin = file.file
        # Finally write the data to the output file
        fin.seek(0)
        while 1:
            data = fin.read(2<<16)
            if not data:
                break
            out.write(data)
        out.close()

    request.client.medialib_import_path(directory_url)

    return {'ok': len(files)}

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
    request.client.playlist_set_next_rel(1)
    request.client.playback_tickle()
    return request.client.playlist_current_pos()

@jsonrpc_method('playback.previous', endpoint="api")
def playback_prev(request):
    request.client.playlist_set_next_rel(-1)
    request.client.playback_tickle()

    return request.client.playlist_current_pos()


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

@jsonrpc_method('playlist.remove_id', endpoint='api')
def playlist_remove_id(request, id, playlist=None):
    return request.client.playlist_remove_entry(id, playlist)

@jsonrpc_method('playlist.clear', endpoint='api')
def playlist_clear(request, playlist=None):
    request.client.playlist_clear(playlist)

@jsonrpc_method('medialib.getAll', endpoint="api")
def medialib_get_all(request):
    return request.client.coll_query_infos(xmmsvalue.Universe(), BASIC_INFO)

@jsonrpc_method('server.volume', endpoint='api')
def server_volume(request, volume=None, channel='master'):
    # if volume is set then set it
    if volume and 0 <= volume <= 100:
        request.client.playback_volume_set(channel, volume)

    return request.client.playback_volume_get().get(channel)


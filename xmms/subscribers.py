import pyramid.threadlocal as threadlocal
import logging 
from xmmsclient import XMMS
import gevent
from gevent.select import select
from .models import ws_notify_all

def includeme(config):
    config.add_subscriber(add_xmms, "pyramid.events.NewRequest")
    config.add_subscriber(add_renderer_globals, "pyramid.events.BeforeRender")
    #config.add_subscriber(setup_broadcaster, "pyramid.events.ApplicationCreated")
    setup_broadcaster('ohoh')

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

def setup_broadcaster(application):
    ''' Setting all the following broadcasts

        The decorator is a shortcut to add our decorators to our async 
        xmms client.

        broadcast_collection_changed
        broadcast_config_value_changed
        broadcast_mediainfo_reader_status
        broadcast_medialib_entry_changed
        broadcast_medialib_entry_added
        broadcast_playlist_loaded
        broadcast_playlist_changed
        broadcast_playlist_current_pos
        broadcast_playback_status
        broadcast_playback_current_id
        broadcast_playback_volume_changed
    '''
    
    xmms = XMMS('wxmss2')
    xmms.connect()

    def broadcast(name):
        '''Decorator that adds broadcasts func'''
        def wrapped(func):
            def new_func(val):
                value = func(val)
                print 'broadcast'
                print name, value
                ws_notify_all(name, value)
                return value


            func_name = name.replace('.', '_')
            getattr(xmms, func_name)(new_func)

            return new_func
        return wrapped

    @broadcast('broadcast.collection_changed')
    def collection_changed(val):
        return val.value()

    @broadcast('broadcast.config_value_changed')
    def config_changed(val):
        return val.value()

    @broadcast('broadcast.mediainfo_reader_status')
    def reader_status(val):
        return val.value()

    @broadcast('broadcast.medialib_entry_added')
    def entry_added(val):
        return val.value()

    @broadcast('broadcast.medialib_entry_changed')
    def entry_changed(val):
        return val.value()

    @broadcast('broadcast.playlist_current_pos')
    def current_position(val):
        return val.value()

    @broadcast('broadcast.playlist_changed')
    def playlist_changed(val):
        return val.value()

    @broadcast('broadcast.playlist_loaded')
    def playlist_loaded(val):
        return val.value()

    @broadcast('broadcast.playback_status')
    def playback_status(val):
        return val.value()

    @broadcast('broadcast.playback_current_id')
    def current_id(val):
        return val.value()

    @broadcast('broadcast.playback_volume_changed')
    def volume_changed(val):
        return val.value()

    def update_handler(client):
        # The loop handler for the player!
        while True:
            fd = client.get_fd()
            read, write, error = [fd], [], [fd]

            if client.want_ioout():
                write.append(fd)

            # Select will block the greenlet while other
            # greenlets can work
            r1, r2, r3 = select(read, write, error)

            if fd in r1:
                client.ioin()
            if fd in r2:
                client.ioout()

    # Start our mainloop
    gevent.spawn(update_handler, xmms)

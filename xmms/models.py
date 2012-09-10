import gevent
import json
from gevent.queue import Queue
from gevent.event import Event

import logging
log = logging.getLogger('models')

observers = []
sockets = []

class Observer(Queue):
    def __init__(self, *args, **kw):
        obss = kw.pop('obss')
        self.event = Event()
        Queue.__init__(self, *args, **kw)
        def reaper():
            self.event.clear()
            self.event.wait(30)
            obss.remove(self)

        gevent.spawn(reaper)

    def get(self, *args, **kw):
        self.event.set()
        return Queue.get(self, *args, **kw)

def notify_all(value):
    global observers

    val = json.dumps(value)

    for i in observers:
        i.put(val)
        i.put(StopIteration)

def notify(func):
    log.info(func)
    def wrap(request, *a, **b):
        log.info('in wrap')
        ret = func(request, *a, **b)

        notify_all(ret)

        return ret
    return wrap

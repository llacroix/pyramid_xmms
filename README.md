Pyramid xmms server
===================

Requirements:
=============

In order to run the server, you have to have xmms2 installed
with the xmmsclient python client. If you're using virtualenvs,
It might be a bit tricky. By default, --no-site-packages is used and 
the xmmsclient can't be installed with setuptools. You'll have to 
either use site-packages or copy the xmmsclient to your virtualenv.

You'll have to use the same python binary since it is compiled with 
some C bindings.


Setup:
======

Launching the following command will install all dependencies for the
server to run to the exception of xmmsclient.

    python setup.py develop

Running
=======

To run the server, you can use the following command for dev:

    gunicorn_paster development.ini 

Replace development.ini for production.ini to use the production config file.

News:
=====

The project is now using websockets. I first wrote it using long polling events but after thinking about it. Using websockes makes a lot of sense. Polling event has the advantage to work everywhere while websockets might make implementation harder with different systems or technologies. That being said. The jsonrpc api endpoint is still present. I'm going to remove the long polling part probably. What it means is that it's still possible to send jsonrpc request using plain http but it won't be possible to receive broadcasts event. 

Websockets is used using jsonrpc too. So moving from one style to an other was pretty cool. The only thing that changed is the transport. I'm probably going to leave jsonrpcjs and write my own jsonrpc client for websocket transport. 

So what's cool about jsonrpc + websocket. It's not exactly following the spec of jsonrpc but here's the thing. 

Jsonrpc support doing a call with an ID... what would happen if we're doing file uploads. We could update progress through jsonrpc but how do we know where the update should go.

I had in mind to do something like that: package_playlist.

This call would be used and may return multiple times. We have to setup a callback that will live x times. For example, packaging a playlist of 100 songs should return at least 100 times for each packages song. It will call the same callback with the progress and that callback knows exactly what to update. In that case, we can't use broadcasts since we'd have to define in our broadcasts a target in order to know which callback to use. And that broadcast should have a limited lifetime..

Being able to return a value multiple time is making things much easier.



Projects uses:
==============

Some projects used for this project:

- pyramid
- mako
- backbonejs
- requiresjs
- momentjs
- xmmsclient
- jquery 
- gevent
- gunicorn

Technologies:
=============

- Async api
- Websockets
- Jsonrpc

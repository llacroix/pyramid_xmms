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

    pserve --reload development.ini 

To run the server as daemon

    pserve --daemon development.ini
    pserve development.ini start

Replace development.ini for production.ini to use the production config file.


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

from pyramid.view import view_config
from pyramid_rpc.jsonrpc import jsonrpc_method
from xmmsclient import xmmsvalue
from os.path import join

@view_config(route_name='home', renderer='mytemplate.mako')
def my_view(request):
    return {'project':'xmms'}

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

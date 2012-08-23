require([
    'backbone', 
    'jquery', 
    'underscore', 
    'jsonrpc',

    'views/controls',
    'views/playlist'
],
function(Backbone, $, _, jsonrpc, a, b){
    window.rpc = new jsonrpc.JsonRpc('http://10.0.1.88:6543/api');
    rpc._batchingMilliseconds = 0;

    rpc.call('playlist.current', function(data){
        window.playlist = new MyViews.PlayList({
            model: {medias: data, name: 'Current playlist'},
            itemClick: function(e){
                console.log(e);
                rpc.call('playback.jump', e.data.model.track_position, function(){});
            }
        });

        $('.wrapper').append(playlist.$el);
    });

    rpc.call('medialib.getAll', function(data){
        window.medialib = new MyViews.PlayList({
            model: {medias: data, name: 'All media lib'},
            itemClick: function(e){
                //rpc.call('playback.jump', position, function(){});
                rpc.call('playlist.add_id', e.data.model.id, function(){
                    playlist.append(e.data.model);
                });
            }
        });

        $('.wrapper').append(medialib.$el);
    });

    window.player = new MyViews.Player();
    $('.wrapper').append(window.player.$el);
});

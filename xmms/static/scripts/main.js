require([
    'backbone', 
    'jquery', 
    'underscore', 
    'jsonrpc',

    'views/controls',
    'views/playlist',
    'bootsrap',
    'models/media'
],
function(Backbone, $, _, jsonrpc){
    window.rpc = new jsonrpc.JsonRpc(window.api_url);
    rpc._batchingMilliseconds = 0;

    rpc.call('playlist.current', function(data){
        window.playlist = new MyViews.PlayList({
            model: {medias: data, name: 'Current playlist'},
            itemClick: function(e, model, ui){
                rpc.call('playback.jump', model.track_position, function(){});

                if(this.activeSong){
                    this.activeSong.active = false;
                    this.activeSongUi.$el.removeClass('active');
                }

                model.active = true;

                this.activeSong = model;
                this.activeSongUi = ui;

                ui.render();
            },

            itemRemoved: function(e, ui){
                e.preventDefault();
                e.stopPropagation();
                rpc.call('playlist.remove_id', ui.model.track_position, function(){});
                this.remove(ui.model);
            },

            onClear: function(e, ui){
                e.preventDefault();
                e.stopPropagation();
                rpc.call('playlist.clear', function(){});
                ui.model.medias = [];
            }
        });

        $('.playlist-container').append(playlist.$el);
    });

    rpc.call('medialib.getAll', function(data){
        window.medialib = new MyViews.PlayList({
            model: {medias: data, name: 'All media lib'},
            itemClick: function(e, model, ui){
                //rpc.call('playback.jump', position, function(){});
                var self = this;
                rpc.call('playlist.add_id', model.id, function(){
                    playlist.append(model);
                });
            },
            itemRemoved: function(e, ui){
                e.preventDefault();
                e.stopPropagation();

                this.remove(ui.model);
                console.log('not implemented');
            }
        });

        $('.medialib-container').append(medialib.$el);
    });

    window.player = new MyViews.Player();

    $('.player-container').append(window.player.$el);

    $('#fileupload').click(function(){
        console.log($('#files')[0].files);
        files = $('#files')[0].files;
        formdata = new window.FormData(); 
        _.each(files, function(file){

            var reader = new FileReader();

            reader.onloadend = function(e){
                console.log('file loaded');
            };

            reader.onprogress = function(e){
                if(e.lengthComputable){
                    console.log(e.loaded*1.0/e.total);
                }
            };

            reader.readAsDataURL(file);

            formdata.append('files', file);
        });

        $.ajax({
            url: 'upload',
            type: 'post',
            data: formdata,
            processData: false,
            contentType: false,
            success: function(data){
                console.log('complete');
                console.log(data);
            }
        });
    });
});

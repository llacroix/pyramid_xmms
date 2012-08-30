require([
    'backbone', 
    'jquery', 
    'underscore', 
    'jsonrpc',
    'moment',

    'views/windows',
    'views/controls',
    'views/playlist',
    'bootsrap',
    'models/media'
],
function(Backbone, $, _, jsonrpc, moment){
    window.rpc = new jsonrpc.JsonRpc(window.api_url);
    rpc._batchingMilliseconds = 0;

    function pad(number, length) {
           
       var str = '' + number;
       while (str.length < length) {
           str = '0' + str;
       }
    
        return str;

    }
    var editSong = function(e, ui){
        e.preventDefault();
        e.stopPropagation();

        var win = new MyViews.EditWindow({
            parent: ui,
            template: Templates.EditSong,
            onSave: function(model){

                var artist = this.$el.find('#artist').val();
                var title = this.$el.find('#title').val();
                var album = this.$el.find('#album').val();

                model.artist = artist;
                model.album = album;
                model.title = title;

                rpc.call('medialib.set_property', model.id, 'artist', model.artist, function(){});
                rpc.call('medialib.set_property', model.id, 'album', model.album, function(){});
                rpc.call('medialib.set_property', model.id, 'title', model.title, function(){});
                // RPC CALL HERE
                this.options.parent.render();

                this.close();
            }
        });

        win.open();
    };

    rpc.call('playlist.current', function(data){
        console.log(data);
        _.each(data, function(song){
            var duration = moment.duration(song.duration);
            song.durationParsed = duration.minutes() + ':' + pad(duration.seconds(), 2);
        });


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

            itemEdit: editSong,

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
        _.each(data, function(song){
            var duration = moment.duration(song.duration);
            song.durationParsed = duration.minutes() + ':' + pad(duration.seconds(), 2);
        });

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
                console.log('not implemented');
            },
            itemEdit: editSong
        });

        $('.medialib-container').append(medialib.$el);
    });

    window.player = new MyViews.Player();

    $('.player-container').append(window.player.$el);
    
    window.views = {};
    window.__i = 0;
    function getId(){
        return window.__i++;
    }

    $('#fileupload').click(function(){
        console.log($('#files')[0].files);
        files = $('#files')[0].files;
        formdata = new window.FormData(); 
        _.each(files, function(file){

            var id = getId();
            var reader = new FileReader();
            reader.file = file;
            reader.id = id;

            var view = $(Templates.MediaUpload.render({filename: file.name, done: 0}));
            window.views[id] = view;
            $('.left-menu').append(view);

            reader.onloadend = function(e){
                var reader = e.srcElement;
                views[reader.id].remove();
                delete views[reader.id];
            };

            reader.onprogress = function(e){
                if(e.lengthComputable){
                    var done = e.loaded*100/e.total;
                    var reader = e.srcElement;
                    var view = views[reader.id];
                    view.find('.bar').css('width', done+'%');
                }
            };

            reader.readAsDataURL(file);

            formdata.append('files', file);
        });

        var view = $('<h1 class="loading">Loading...</h1>');
        $('.left-menu').append(view);
        $.ajax({
            url: 'upload',
            type: 'post',
            data: formdata,
            processData: false,
            contentType: false,
            success: function(data){
                view.remove();
            }
        });

        $('#files').val(null);
    });
});

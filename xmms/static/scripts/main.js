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
    window.Super = function(obj, method){
        // Small utility to get super functions of object
        return _.bind(obj.constructor.__super__[method], obj);
    }

    window.pad = function(number, length) {
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
            model: ui.model,
            template: Templates.EditSong,
            onSave: function(model){

                var artist = this.$el.find('#artist').val();
                var title = this.$el.find('#title').val();
                var album = this.$el.find('#album').val();

                model.set({
                    artist: artist,
                    album: album,
                    title: title
                });

                rpc.call('medialib.set_property', model.id, 'artist', model.get('artist'), function(){});
                rpc.call('medialib.set_property', model.id, 'album', model.get('album'), function(){});
                rpc.call('medialib.set_property', model.id, 'title', model.get('title'), function(){});

                this.close();
            }
        });

        win.open();
    };

    /*
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
    */
    function medialibReady(data){
        console.log(data);
        window.medialib = new MyViews.PlayList({
            model: data,
            childView: MyViews.MedialibItem,
            itemClick: function(e, model, ui){
            },
            itemRemoved: function(e, ui){
            },
            itemEdit: editSong
        });
        $('.medialib-container').append(medialib.$el);
    }

    var medialibModel = new Models.MediaLib();
    medialibModel.on('loaded', medialibReady);
    medialibModel.fetch();

    function playlistReady(data){
        window.playlist = new MyViews.PlayList({
            model: data,
            childView: MyViews.PlayListItem,
            itemClick: function(e, model, ui){
                rpc.call('playback.jump', model.get('track_position'), function(){});

                if(this.activeSong){
                    this.activeSong.set({active: false})
                }
                this.activeSong = model;
                model.set({active: true});
            },
            itemRemoved: function(e, ui){
                console.log(arguments);
                e.preventDefault();
                e.stopPropagation();
                ui.remove();
            },
            itemEdit: editSong,
            onClear: function(e, ui){
                rpc.call('playlist.clear', function(){});
                ui.model.reset();
            }
        });
        $('.playlist-container').append(playlist.$el);
    }

    var currentPlayList = new Models.PlayList();
    currentPlayList.on('loaded', playlistReady);
    currentPlayList.fetchCurrent();

    rpc.call('playlist.list', function(data){
        var list = $('#playlists #list');
        _.each(data, function(name){
            if(name == '_active')
                return;

            var playlist = new Models.PlayList();
            playlist.name = name;
            var item = $('<li>');
            var link = $('<a>', {text: name, href: '#playlist/'+name});
            link.click(function(){
                rpc.call('playlist.load', name, function(){
                    window.location.reload();
                });
            });
            item.append(link);
            list.append(item);
        });
    });
    $('#newPlayList').keydown(function(e){
        if(e.keyCode == 13 && $(this).val().trim()){
            rpc.call('playlist.create', $(this).val().trim(), function(){
                window.location.reload();
            });
        }
    });

    window.player = new MyViews.Player();

    $('.player-container').append(window.player.$el);
    
    window.views = {};
    window.__i = 0;
    function getId(){
        return window.__i++;
    }

    $('#fileupload').click(function(){
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

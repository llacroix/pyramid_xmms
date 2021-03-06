define([
    'underscore',
    'backbone',
    'jquery',

    'templates/controls'
],
function(_,Backbone,$){
    window.dummy = function(){};

    console.log('loaded');

    window.MyViews = $.extend({

        Player: Backbone.View.extend({
            className: 'player',

            events: {
                'click #prev': 'onPrev',
                'click #playpause': 'onPlayPause',
                'click #stop': 'onStop',
                'click #next': 'onNext',
                'click .volume': 'onVolumeChanged',
                'drag .volume': 'onVolumeChanged'
            },

            initialize: function(){
                this.render()
            },

            render: function(){
                this.$el.html(Templates.Player.render({playing: this.playing}));
            },
            
            onPrev: function(e){
                //rpc.call('playback.previous', dummy);
                ws.send(create_call('playback.previous', []));
            },

            onNext: function(e){
                //rpc.call('playback.next', dummy);
                ws.send(create_call('playback.next', []));
            },

            onStop: function(e){
                var self = this;
                //rpc.call('playback.stop', dummy);
                ws.send(create_call('playback.stop', []));
                this.playing = false;
                this.render();
            },

            onPlayPause: function(e){
                var self = this;
                if(this.playing){
                    //rpc.call('playback.pause', dummy);
                    ws.send(create_call('playback.pause', []));
                    this.playing = false;
                }else{
                    //rpc.call('playback.start', dummy);
                    ws.send(create_call('playback.start', []));
                    this.playing = true;
                }
                this.render();
            },

            onVolumeChanged: function(e){
                console.log('drag');
                var volume = e.offsetX*100 / $(e.currentTarget).width();
                //rpc.call('server.volume', volume, dummy);
                ws.send(create_call('server.volume', [volume]));
                $(e.currentTarget).find('.indicator').css('width', volume + '%');
            }
        })
    }, window.MyViews);
    console.log('view playlist loaded');
});

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
                'click #next': 'onNext'
            },

            initialize: function(){
                this.render()
            },

            render: function(){
                this.$el.html(Templates.Player.render({playing: this.playing}));
            },
            
            onPrev: function(e){
                rpc.call('playback.previous', dummy);
            },

            onNext: function(e){
                rpc.call('playback.next', dummy);
            },

            onStop: function(e){
                var self = this;
                rpc.call('playback.stop', dummy);
                this.playing = false;
                this.render();
            },

            onPlayPause: function(e){
                var self = this;
                if(this.playing){
                    rpc.call('playback.pause', dummy);
                    this.playing = false;
                }else{
                    rpc.call('playback.start', dummy);
                    this.playing = true;
                }
                this.render();
            }
        })
    }, window.MyViews);
    console.log('view playlist loaded');
});

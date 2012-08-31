define([
    'backbone',
    'underscore',
    'jquery',
    'moment',
    'backboneRelational'
], function(Backbone, _, $, moment){
    window.Models = $.extend({
        Media: Backbone.RelationalModel.extend({
            initialize: function(media){
                var duration = moment.duration(media.duration);
                var durationParsed = duration.minutes() + ':' + pad(duration.seconds(), 2);
                this.set({durationParsed: durationParsed});
            },
            fetch: function(){
                rpc.call('medialib.getAll', _.bind(this.fetchData, this));
            },
            fetchData: function(data){

            }
        }),

        PlayListItem: Backbone.RelationalModel.extend({
            initialize: function(attributes){
                console.log(attributes);
            }
        }),

        PlayList: Backbone.Collection.extend({
            initialize: function(){
                this.model = Models.PlayListItem;
            },
            fetch: function(){

            },
            fetchCurrent: function(){
                rpc.call('playlist.current', _.bind(this.fetchData, this));
            },
            fetchData: function(data){
                _.each(data, function(media, position){
                    this.add({
                        track_position: position,
                        media: Models.Media.findOrCreate(media)
                    }); 
                }, this);
                this.trigger('loaded', this);
            }
        }),
        MediaLib: Backbone.Collection.extend({
            initialize: function(){
                this.model = Models.Media;
            },
            fetch: function(){
                rpc.call('medialib.getAll', _.bind(this.fetchData, this));
            },
            fetchData: function(data){
                _.each(data, function(media){
                    this.add(media); 
                }, this);
                this.trigger('loaded', this);
            }
        })
    }, window.Models);
});

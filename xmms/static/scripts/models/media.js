define([
    'backbone',
    'underscore',
    'jquery',
    'backboneRelational'
], function(Backbone, _, $){
    window.Models = $.extend({
        Media: Backbone.RelationalModel.extend({
            initialize: function(){
            },
            fetch: function(){
                rpc.call('medialib.getAll', _.bind(this.fetchData, this));
            },
            fetchData: function(data){

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
                _.each(data, function(media){
                    this.add(media); 
                }, this);
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
            }
        })
    }, window.Models);
});

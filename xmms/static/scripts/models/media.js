define([
    'backbone',
    'underscore',
    'jquery',
    'backboneRelational'
], function(Backbone, _, $){
    window.Models = $.extend({
        Media: Backbone.RelationalModel.extend({
            fetch: function(){
                // fetch data
            }
        })
    }, window.Models);

});

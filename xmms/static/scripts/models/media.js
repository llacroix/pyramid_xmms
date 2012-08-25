define([
    'backbone',
    'underscore',
    'jquery'
], function(Backbone, _, $){
    window.Models = $.extend({
        Media: Backbone.Model.extend({
            fetch: function(){
                // fetch data
            }
        });
    }, window.Models);

});

define([
    'underscore',
    'backbone',
    'jquery',

    'templates/playlist'
],
function(_,Backbone,$){
    window.MyViews = $.extend({

        PlayList: Backbone.View.extend({
            className: 'playlist',

            initialize: function(){
                this.render()
            },

            render: function(){
                var model = this.model;
                this.$el.empty();
                this.$el.html(Templates.PlayList.render(model));
                for(var media in model.medias){
                    model.medias[media].track_position = parseInt(media);
                    var item = new MyViews.PlayListItem({model: model.medias[media]});
                    item.bind('click', this.options.itemClick);
                    this.$el.append(item.$el);
                }
                //this.$el.html(Templates.PlayList.render(model, {media: Templates.PlayListItem}));
            },
            append: function(item){
                this.model.medias.push(item);
                this.render();
            }
        }),

        PlayListItem: Backbone.View.extend({
            className: 'playlist-item',

            initialize: function(){
                this.render();
            },
            render: function(){
                this.$el.html(Templates.PlayListItem.render(this.model));
            },
            bind: function(event, callback){
                this.$el.on(event, this, callback);
            }
        })
    }, window.MyViews);
    console.log('view playlist loaded');
});

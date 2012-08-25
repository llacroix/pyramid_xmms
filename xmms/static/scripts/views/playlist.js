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

            events: {
                'click h3 .clear': 'clear'
            },

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
                    item.on('remove', this.options.itemRemoved, this);
                    this.$el.append(item.$el);
                }
                //this.$el.html(Templates.PlayList.render(model, {media: Templates.PlayListItem}));
            },

            append: function(item){
                this.model.medias.push(item);
                this.render();
            },

            remove: function(item){
                this.model.medias.splice(item.track_position, 1);
                this.render();
            }, 

            clear: function(e){
                this.options.onClear(e, this);
                this.render();
            }
        }),

        PlayListItem: Backbone.View.extend({
            className: 'playlist-item',

            initialize: function(){
                this.render();
            },
            events: {
                'click .remove': 'onRemove'
            },
            render: function(){
                this.$el.html(Templates.PlayListItem.render(this.model));
                this.$el.data('id', this.model.id);
            },
            bind: function(event, callback){
                this.$el.on(event, this, callback);
            },
            onRemove: function(e){
                this.trigger('remove', e, this);
            }
        })
    }, window.MyViews);
    console.log('view playlist loaded');
});

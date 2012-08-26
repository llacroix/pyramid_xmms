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
                var items = this.$el.find('.items');

                for(var media in model.medias){
                    model.medias[media].track_position = parseInt(media);
                    var item = new MyViews.PlayListItem({model: model.medias[media], parent: this});
                    item.bind('click', this.options.itemClick);
                    item.on('remove', this.options.itemRemoved, this);
                    items.append(item.$el);
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
                console.log('render');
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
                if(this.model.active){
                    this.$el.addClass('active');
                }
            },
            bind: function(event, callback){
                var self = this;
                this.$el.on(event, function(e){
                    _.bind(callback, self.options.parent, e, self.model, self)();
                });
            },
            onRemove: function(e){
                this.trigger('remove', e, this);
            }
        })
    }, window.MyViews);
    console.log('view playlist loaded');
});

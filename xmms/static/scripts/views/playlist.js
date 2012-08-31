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

                this.model.forEach(function(media){

                    var item = new (this.options.childView)({model: media, parent: this});
                    item.bind('click', this.options.itemClick);
                    item.on('remove', this.options.itemRemoved, this);
                    item.on('edit', this.options.itemEdit, this);
                    items.append(item.$el);
                }, this);
            },

            append: function(item){
                this.model.medias.push(item);
                this.render();
            },

            remove: function(item){
                //this.model.medias.splice(item.track_position, 1);
                //this.render();
            }, 

            clear: function(e){
                this.options.onClear(e, this);
                this.render();
            }
        }),

        MedialibItem: Backbone.View.extend({
            className: 'playlist-item',

            initialize: function(){
                this.model.on('change:active', this.toggleActive, this);
                this.model.on('change', this.render, this);
                this.render();
            },
            events: {
                'click .remove': 'onRemove',
                'click .edit': 'onEdit'
            },
            render: function(){
                this.$el.html(Templates.PlayListItem.render(this.model.toJSON()));
                this.$el.data('id', this.model.id);
                if(this.model.get('active')){
                    this.$el.addClass('active');
                }
            },
            toggleActive: function(model){
                console.log('set active');
                if(this.model.get('active')){
                    this.$el.addClass('active');
                }else{
                    this.$el.removeClass('active');
                }
            },
            bind: function(event, callback){
                var self = this;
                this.$el.on(event, function(e){
                    _.bind(callback, self.options.parent, e, self.model, self)();
                });
            },
            remove: function(){
                this.options.parent.remove(this.model);
                this.model.off('change:active', this.toggleActive);
                this.model.off('change', this.render);
                this.$el.remove();
            },
            onRemove: function(e){
                this.trigger('remove', e, this);
            },
            onEdit: function(e){
                this.trigger('edit', e, this);
            }
        })
    }, window.MyViews);

    MyViews.PlayListItem = MyViews.MedialibItem.extend({
        initialize: function(){
            this.model.on('change:active', this.toggleActive, this);
            this.model.on('change', this.render, this);
            this.model.get('media').on('change', this.render, this);
            this.render();
        },
        remove: function(){
            this.options.parent.remove(this.model);
            this.model.get('media').off('change', this.render);
            this.model.off('change:active', this.toggleActive);
            this.model.off('change', this.render);
            this.$el.remove();
        },
        render: function(){
            this.$el.html(Templates.PlayListItem.render(this.model.get('media').toJSON()));
            this.$el.data('id', this.model.id);
            if(this.model.get('active')){
                this.$el.addClass('active');
            }
        }
    });

    console.log('view playlist loaded');
});

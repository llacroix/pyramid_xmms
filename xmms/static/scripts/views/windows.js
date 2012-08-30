define([
    'underscore',
    'backbone',
    'jquery',

    'templates/windows'
],
function(_,Backbone,$){
    window.MyViews = $.extend({
        EditWindow: Backbone.View.extend({
            className: 'window-wrapper',
            initialize: function(){
                this.model = this.options.parent.model;
                $('body').append(this.$el);
                this.$el.hide();
                this.render();
            },

            events: {
                'click .save': 'onSave',
                'click .cancel': 'onCancel'
            },

            render: function(){
                var data = _.extend({
                    windowTitle: '=)'
                }, this.model);
                var result = Templates.Window.render(data, {contentBlock: this.options.template})
                this.$el.html(result);
                this.$el.find('.modal').modal();
            },

            open: function(){
                this.$el.show();
            },

            onSave: function(){
                _.bind(this.options.onSave, this, this.options.parent.model)();
                this.close();
            },

            close: function(){
                this.$el.find('.modal').modal('hide');
            },

            onCancel: function(){
                this.close();
            }
        })
    }, window.MyViews);
});

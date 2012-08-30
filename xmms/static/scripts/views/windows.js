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
                var result = Templates.Window.render(this.model, {contentBlock: this.options.template})
                this.$el.html(result);
                this.$el.css('position', 'absolute');
                this.$el.css('padding', '0.5em');
                this.$el.css('background', '#fff');
                this.$el.css('border', '1px solid #3A87AD');

                var dim= {
                    width: this.$el.outerWidth(),
                    height: this.$el.outerHeight()
                };

                this.$el.css('top', ($(window).height() / 2 - dim.height / 2) + 'px');
                this.$el.css('left', ($(window).width() / 2 - dim.width / 2) + 'px');
            },

            open: function(){
                this.$el.show();
            },

            onSave: function(){
                _.bind(this.options.onSave, this, this.options.parent.model)();
                this.close();
            },

            close: function(){
                this.$el.hide();
            },

            onCancel: function(){
                this.close();
            }
        })
    }, window.MyViews);
});

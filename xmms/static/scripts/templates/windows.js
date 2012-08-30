define([
    'hogan',
    'jquery'
],
function(Hogan, $){
    window.Templates = $.extend({
        Window: Hogan.compile(
            '<div class="window-header">{{windowTitle}} <i class="close icon-close"></i></div>' +
            '<div class="window-content">' +
                '{{>contentBlock}}' +
            '</div>' +
            '<div class="window-buttons">' +
                '<a class="btn cancel">{{#i18n}}cancel{{/i18n}}</a>' +
                '<a class="btn save">{{#i18n}}save{{/i18n}}</a>' +
            '</div>'
        ),
        EditSong: Hogan.compile(
            '<div class="controls">' +
                '<input type="text" id="artist" placeholder="{{#i18n}}artist{{/i18n}}" value="{{artist}}"/>' +
            '</div>' +
            '<div class="controls">' +
                '<input type="text" id="title" placeholder="{{#i18n}}title{{/i18n}}" value="{{title}}"/>' +
            '</div>' +
            '<div class="controls">' +
                '<input type="text" id="album" placeholder="{{#i18n}}album{{/i18n}}" value="{{album}}"/>' + 
            '</div>'
        )
    }, window.Templates);
})

define([
    'hogan',
    'jquery'
],
function(Hogan, $){
    window.Templates = $.extend({
        Window: Hogan.compile(
            '<div class="modal hide fade">' +
                '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                    '<h3>{{windowTitle}}</h3>' +
                '</div>' +
                '<div class="modal-body">' +
                    '{{>contentBlock}}' +
                '</div>' +
                '<div class="modal-footer">' +
                    '<a href="#" class="btn cancel">Cancel</a>' +
                    '<a href="#" class="btn btn-primary save">Save changes</a>' +
                '</div>' +
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

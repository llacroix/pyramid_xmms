define([
    'hogan',
    'jquery'
],
function(Hogan, $){
    window.Templates = $.extend({
        PlayList: Hogan.compile(
            '<h3>{{name}}<input type="button" class="clear" value="clear"/></h3>'
        ),

        PlayListItem: Hogan.compile(
            '<span class="id">[{{track_position}}/{{id}}]</span>' +
            '<span class="title">{{title}}</span>' +
            '<span class="artist">{{artist}}</span>' +
            '<a class="remove push-right" href="#">remove</a>'
        )
    }, window.Templates);
    console.log('template playlist loaded');
    return true;
});

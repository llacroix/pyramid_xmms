define([
    'hogan',
    'jquery'
],
function(Hogan, $){
    window.Templates = $.extend({
        PlayList: Hogan.compile(
            '<h3>{{name}}</h3>'
        ),

        PlayListItem: Hogan.compile(
            '<span class="id">[{{track_position}}/{{id}}]</span>' +
            '<span class="title">{{title}}</span>' +
            '<span class="artist">{{artist}}</span>'
        )
    }, window.Templates);
    console.log('template playlist loaded');
    return true;
});

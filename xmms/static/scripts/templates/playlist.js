define([
    'hogan',
    'jquery'
],
function(Hogan, $){
    window.Templates = $.extend({
        PlayList: Hogan.compile(
            '<h3>{{name}}<input type="button" class="clear" value="clear"/></h3>' +
            '<div class="items"></div>'
        ),

       PlayListItem: Hogan.compile(
            '<table>' +
                '<tr>' +
                    '<td rowspan="2" class="info"><span class="id">[{{track_position}}/{{id}}]</span></td>' +
                    '<td><span class="title">{{title}}</span></td>' +
                    '<td rowspan="2" class="actions"><a class="remove push-right" href="#">remove</a></td>' +
                '</tr>' +
                '<tr><td><span class="artist">{{artist}}</span></td></tr>' +
            '</table>'
       )
       //PlayListItem: Hogan.compile(
       //    '<span class="id">[{{track_position}}/{{id}}]</span>' +
       //    '<span class="title">{{title}}</span><br />' +
       //    '<span class="artist">{{artist}}</span>' +
       //    '<a class="remove push-right" href="#">remove</a>'
       //)
    }, window.Templates);
    console.log('template playlist loaded');
    return true;
});

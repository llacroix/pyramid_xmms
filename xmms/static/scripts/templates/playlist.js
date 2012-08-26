define([
    'hogan',
    'jquery'
],
function(Hogan, $){
    window.Templates = $.extend({
        PlayList: Hogan.compile(
            '<h3>{{name}}  <input type="button" class="btn clear" value="clear"/></h3>' +
            '<div class="items"></div>'
        ),

       PlayListItem: Hogan.compile(
            '<div class="row-fluid {{#active}}active{{/active}}">' +
                '<div id="identifier" class="span1">[{{track_position}}/{{id}}]</div>' +
                '<div id="infos" class="span9">' +
                    '<span class="row-fluid">' +
                        '<span class="span12">{{title}}</span>' +
                    '</span>' +
                    '<span class="row-fluid">' +
                        '<span class="span12">{{artist}}</span>' +
                    '</span>' +
                '</div>' +
                '<div id="actions" class="span2"><a class="remove btn">remove</a></div>' +
            '</div>'
       ),

       MediaUpload: Hogan.compile(
            '<div class="row-fluid">' +
                '<div class="span6">{{filename}}</div>' +
                '<div class="span6 progress">' +
                    '<div class="bar" style="width: {{done}}%;">&nbsp;</div>' +
                '</div>' +
            '</div>'
       )
    }, window.Templates);
    console.log('template playlist loaded');
    return true;
});

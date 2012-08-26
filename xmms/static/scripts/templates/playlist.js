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
                '<div id="infos" class="span11">' +
                    '<b id="artist">{{artist}}</b> - ' +
                    '<span id="title">{{title}}</span>' +
                '</div>' +
                '<div id="actions" class="pull-right">' + 
                    '<a class="edit"><i class="icon-pencil"></i></a> ' +
                    '<a class="remove"><i class="icon-remove"></i></a> ' +
                '</div>' +
                '<div id="duration" class="pull-right">' + 
                    '<span class="edit">{{durationParsed}}</span> ' +
                '</div>' +
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

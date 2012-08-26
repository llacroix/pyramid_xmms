define([
    'hogan',
    'jquery'
],
function(Hogan, $){
    window.Templates = $.extend({
        Player: Hogan.compile(
            '<div class="span3 btn-group">' +
                '<button class="btn" id="prev"><i class="icon-step-backward"></i></button>' +
                '{{^playing}}' +
                    '<button class="btn" id="playpause"><i class="icon-play"></i></button>' +
                '{{/playing}}' +
                '{{#playing}}' +
                    '<button class="btn" id="playpause"><i class="icon-pause"></i></button>' +
                '{{/playing}}' +
                '<button class="btn" id="stop"><i class="icon-stop"></i></button>' +
                '<button class="btn" id="next"><i class="icon-step-forward"></i></button>' +
            '</div>' +
            '<div class="span4">' +
                '<div class="volume progress">' +
                    '<div class="indicator bar">&nbsp;</div>' +  
                '</div>' +
            '</div>'
        )
    }, window.Templates);
    console.log('template player loaded');
    return true;
});

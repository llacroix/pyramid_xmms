define([
    'hogan',
    'jquery'
],
function(Hogan, $){
    window.Templates = $.extend({
        Player: Hogan.compile(
            '<button id="prev">&lt;&lt;</button>' +
            '{{^playing}}' +
                '<button id="playpause">play</button>' +
            '{{/playing}}' +
            '{{#playing}}' +
                '<button id="playpause">pause</button>' +
            '{{/playing}}' +
            '<button id="stop">stop</button>' +
            '<button id="next">&gt;&gt;</button>' +
            '<div class="volume">' +
                '<div class="indicator">&nbsp;</div>' +  
            '</div>'
        )
    }, window.Templates);
    console.log('template player loaded');
    return true;
});

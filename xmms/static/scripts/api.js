define([
    'underscore',
    'jsonrpc'
],
function(_,jsonrpc){
    window.ApiSchema = {
        playlist: {

        },
        medialib: {

        },
        playback: {
            start: {

            },
            stop: {

            },
            pause: {

            },
            previous: {

            },
            next: {

            }
        }
    };

    window.Api = function(){
        _.keys(ApiSchema).forEach(function(prefix){
            this[prefix] = {};
            _.keys(ApiSchema[prefix]).forEach(function(funcName){
                var func = prefix + '.' + funcName;
                this[funcName] = _.bind(function(){
                    var args1 = Array.prototype.slice.call(arguments);
                    var args = [func].concat(args1);
                    var success = _.last(args); 

                    if(typeof(success) != 'function'){
                        args.push(function(){});
                    }

                    console.log(args);

                    window.rpc.call.apply(rpc, args);
                }, self);
            }, this[prefix]);
        }, this);
    }
});

define([
    'backbone',
    'underscore',
    'jquery',
    'moment',
    'backboneRelational'
], function(Backbone, _, $, moment){
    window.Traversal = {
        findRoot: function(obj){
            var current = obj;

            while(current.name){
                current = current.parent;
            }

            return current;
        },

        findResource: function(obj, path){
            var current = obj,
                parts = path.split('/');

            if(path.charAt(0) == '/'){
                current = Traversal.findRoot(obj);
                parts = parts.slice(1);
            }
            try{
                parts.forEach(function(key){
                    if(key == '..'){
                        current = current.parent;
                    }else if(key == '.'){

                    }else{
                        current = current.getChild(key)    
                    }
                });
            }catch(e){
                // Got an error key doesn'T exist return null
                return null;
            }
            return current;
        },

        resourcePath: function(obj){
            var current = obj,
                parts = [],
                name;

            do{
                name = obj.name;
                parts.push(name);
                obj = obj.parent;
            }while(name);
            
            return parts.reverse().join('/');
        },
        
        resourceUrl: function(obj){
            return Configuration.baseUrl + Traversal.resourcePath(obj);
        },

        traverse: function(root, path){
            var current = root,
                parts = path.split('/').slice(1),
                subpath = path.split('/').slice(1);

            try{
                _.each(parts, function(elem){
                    console.log(elem);
                    current = current.getChild(elem);
                    subpath.splice(0, 1);
                });
            }catch(e){

            }

            return {
                context: current,
                subpath: subpath
            }
        }
    };


    window.Models = $.extend({
        Traversable: Backbone.Model.extend({
            initialize: function(parent, name){
                if(parent){
                    this.parent = parent;
                    this.parent.children[name] = this;
                    this.name = name;
                }else{
                    this.name = null;
                    this.parent = null;
                }

                this.children = {};
            },

            getChild: function(name){
                var ret = this.children[name];

                if(ret == undefined)
                    throw "KeyError";

                return this.children[name];
            }
        }),
        Media: Backbone.RelationalModel.extend({
            initialize: function(media){
                var duration = moment.duration(media.duration);
                var durationParsed = duration.minutes() + ':' + pad(duration.seconds(), 2);
                this.set({durationParsed: durationParsed});
            },
            fetch: function(){
                rpc.call('medialib.getAll', _.bind(this.fetchData, this));
            },
            fetchData: function(data){

            }
        }),

        PlayListItem: Backbone.RelationalModel.extend({
            initialize: function(attributes){
                console.log(attributes);
            }
        }),

        PlayList: Backbone.Collection.extend({
            initialize: function(){
                this.model = Models.PlayListItem;
            },
            fetch: function(){

            },
            fetchCurrent: function(){
                rpc.call('playlist.current', _.bind(this.fetchData, this));
            },
            fetchData: function(data){
                _.each(data, function(media, position){
                    this.add({
                        track_position: position,
                        media: Models.Media.findOrCreate(media)
                    }); 
                }, this);
                this.trigger('loaded', this);
            }
        }),
        MediaLib: Backbone.Collection.extend({
            initialize: function(){
                this.model = Models.Media;
            },
            fetch: function(){
                rpc.call('medialib.getAll', _.bind(this.fetchData, this));
            },
            fetchData: function(data){
                _.each(data, function(media){
                    this.add(media); 
                }, this);
                this.trigger('loaded', this);
            }
        })
    }, window.Models);
});

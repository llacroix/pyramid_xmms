/*
 * Require.js configuration file
 */
require.config({

    // Initialize the application
    deps: ["main"],

    paths: {
        // JavaScript folders.
        libs: "./libs",
        templates: "./templates",
        views: "./views",

        jquery: "libs/jquery",
        underscore: "libs/underscore",
        backbone: "libs/backbone",
        backboneRelational: "libs/backbone-relational",
        hogan: "libs/hogan",
        jsonrpc: "libs/jsonrpc",
        moment : "libs/moment"
    },

    shim: {
        // Underscore library
        underscore: {
          exports: '_'
        },

        // Backbone library.
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },

        backboneRelational: {
            deps: ['backbone']
        },

        hogan: {
            exports: "Hogan"
        },

        jsonrpc: {
            exports: 'jsonrpc'
        }
    }
});

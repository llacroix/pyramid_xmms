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

        hogan: {
            exports: "Hogan"
        },

        jsonrpc: {
            exports: 'jsonrpc'
        }
    }
});

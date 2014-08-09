(function (system) {
    'use strict';
    var Request = require('request');
    var Ash = require('../lib/ash.min');
    var Nodes = require('../nodes');

    var NodeSystem = Ash.System.extend({
        nodeList: [],

        constructor: function () {
            console.log("node system constructor called");
            return this;
        },

        addToEngine: function (engine) {
            this.nodeList = engine.getNodeList(Nodes.Display);
        },

        removeFromEngine: function (engine) {
            this.nodeList = null;
        },

        update: function (time) {
            for (var node = this.nodeList.head; node; node = node.next) {
                Request
                    .put('http://localhost:9000/api/faunas/'+node.identity._id)
                    .form({
                        id : node.identity._id,
                        position : {x:node.position.x, y:node.position.y}
                    });
            }
            console.log('node system processed');
        }
    });

    module.exports = NodeSystem;
})(module.exports);
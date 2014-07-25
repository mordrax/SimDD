(function () {
    'use strict';
    var Ash = require('../lib/ash.min');
    var Nodes = require('../nodes');

    var MovementSystem = Ash.System.extend({
        nodeList: [],

        constructor: function () {
            console.log("movement system constructor called");
            return this;
        },

        addToEngine: function (engine) {
            this.nodeList = engine.getNodeList(Nodes.Movement);
        },

        removeFromEngine: function (engine) {
            this.nodeList = null;
        },

        update: function (time) {
            for (var node = this.nodeList.head; node; node = node.next) {
                //this.updateNode(node, time);
                console.log("movement system: " + node);
            }
            console.log('movement system called');
        }
    });

    module.exports = MovementSystem;
})();
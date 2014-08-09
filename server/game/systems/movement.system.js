(function () {
    'use strict';
    var Ash = require('../lib/ash.min');
    var Nodes = require('../nodes');
    var Util = require('../util');

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
                node.position.x += Util.rand(0,2) - 1;
                node.position.y += Util.rand(0,2) - 1;
            }
            console.log('movement system processed');
        }
    });

    module.exports = MovementSystem;
})();
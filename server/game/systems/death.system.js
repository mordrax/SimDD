(function (system) {
    'use strict';
    var Ash = require('../lib/ash.min');
    var Nodes = require('../nodes');

    var DeathSystem = Ash.System.extend({
        nodeList: [],

        constructor: function () {
            console.log("death system constructor called");
            return this;
        },

        addToEngine: function (engine) {
            this.nodeList = engine.getNodeList(Nodes.Satiation);
        },

        removeFromEngine: function (engine) {
            this.nodeList = null;
        },

        update: function (time) {
            for (var node = this.nodeList.head; node; node = node.next) {
                //this.updateNode(node, time);
                console.log("death node: " + node);
            }
            console.log('death system called');
        }
    });

    module.exports = DeathSystem;
})(module.exports);
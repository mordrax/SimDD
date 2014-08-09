(function () {
    'use strict';
    var Ash = require('../lib/ash.min');
    var Nodes = require('../nodes');

    var DecisionSystem = Ash.System.extend({
        nodeList: [],

        constructor: function () {
            console.log("decision system constructor called");
            return this;
        },

        addToEngine: function (engine) {
            this.nodeList = engine.getNodeList(Nodes.Fauna);
        },

        removeFromEngine: function (engine) {
            this.nodeList = null;
        },
        update: function (time) {
            for (var node = this.nodeList.head; node; node = node.next) {
                var p = node.position;
                var s = node.satiation;
                console.log('entity pos(' + p.x + ',' + p.y + ') satiation: ' + s._satiation);
            }
        }
    });

    module.exports = DecisionSystem;
})();
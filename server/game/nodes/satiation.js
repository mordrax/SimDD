(function () {
    var Components = require('../components');
    var Ash = require('../lib/ash.min');

    module.exports = Ash.Node.create({
        satiation: Components.Satiation
    });
})();
(function () {
    var Components = require('../components');
    var Ash = require('../lib/ash.min');

    module.exports = Ash.Node.create({
        instincts: Components.Instincts,
        position: Components.Position,
        motion: Components.Motion,
        satiation: Components.Satiation
    });
})();
(function(nodes) {
    var Components = require('../components');
    var Ash = require('../lib/ash.min');

    nodes.Movement = Ash.Node.create({
        position: Components.Position,
        motion: Components.Motion
    });

    nodes.Satiation = Ash.Node.create({
        satiation: Components.Satiation
    });

    nodes.Fauna = Ash.Node.create({
        instincts: Components.Instincts,
        position: Components.Position,
        motion: Components.Motion,
        satiation: Components.Satiation
    });

    nodes.Display = Ash.Node.create({
        position: Components.Position,
        identity: Components.Identity
    })
})(module.exports);
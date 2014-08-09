(function(factory) {
    var Ash = require('./lib/ash.js');
    var Engine = new Ash.Engine();
    var Components = require('./components');
    var Systems = require('./systems');
    var Enums = require('./enums');

    var Factory = {
        Wolf: function Wolf(id, x, y) {
            return new Ash.Entity()
                .add(new Components.Identity(id))
                .add(new Components.Position(x, y))
                .add(new Components.Motion())
                .add(new Components.Instincts(Enums.Diet.carnivore))
                .add(new Components.Satiation())
        },

        Rabbit: function Rabbit(id, x, y) {
            return new Ash.Entity()
                .add(new Components.Identity(id))
                .add(new Components.Position(x, y))
                .add(new Components.Motion())
                .add(new Components.Instincts(Enums.Diet.herbivore))
                .add(new Components.Satiation())
        }
    };

    factory.Factory = Factory;
}(module.exports));

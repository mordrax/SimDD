(function (c) {
    var Ash = require('../lib/ash.min');
    var Enums = require('../enums');

    c.Edible = Ash.Class.extend({
        constructor: function (edible) {
            this._units = 10;
            this._type = edible || Enums.Edible.fruit ;
            return this;
        }
    });
    c.Satiation = Ash.Class.extend({
        constructor: function () {
            this._satiation = 100;
        }
    });
    c.Position = Ash.Class.extend({
        constructor: function (x, y) {
            this.x = x || 0;
            this.y = y || 0;
            return this;
        }
    });
    c.Motion = Ash.Class.extend({
        constructor: function (dx, dy) {
            this.dx = dx || 0;
            this.dy = dy || 0;
            return this;
        }
    });
    c.Instincts = Ash.Class.extend({
        constructor: function (dietType) {
            this._baseInstincts = {
                eat: 0,
                sleep: 0,
                procreate: 0
            };
            this._dietType = dietType || Enums.Diet.omnivore;
            return this;
        }
    });
}(module.exports));
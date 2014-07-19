var extend = require('util')._extend;

var FaunaModel = require('../api/fauna/fauna.model');

(function (faunaManager) {
    var SPAWNING_TIME = 10;
    var SAFE_DISTANCE = 5;
    var spawnCountdown = SPAWNING_TIME;
    var animalCount = 0;

    faunaManager.faunas = [];
    var deceased_faunas = [];

    var faunaAttributes = {
        wolf: {
            speed: 2,
            hunger: 20,
            attack: 5,
            defense: 3
        },
        rabbit: {
            speed: 3,
            hunger: 30,
            attack: 2,
            defense: 1
        }
    };

    var Distance = function (coords1, coords2) {
        return Math.sqrt(Math.pow(coords1.x - coords2.x, 2) + Math.pow(coords1.y - coords2.y, 2));
    };

    var Normalize = function (value) {
        if (value === 0)
            return value;
        else
            return value / Math.abs(value);
    };

    var updateFauna = function (self, game) {
        self.attributes.hunger--;
        //console.log("name: " + this.name + "  hunger: " + this.attributes.hunger);
        if (self.attributes.hunger < 0)
            return; //dead things don't move

        var danger;
        var food;

        danger = 'wolf';
        if (self.type == 'wolf') {
            food = 'rabbit';
        }
        if (self.type == 'rabbit') {
            food = 'berrybush'
        }

        var nearestDanger = findNearest(self, danger);
        var nearestFood = findNearest(self, food, game.flora.floras);

        var awayFromDanger = {x:0, y:0};
        if (nearestDanger) {
            awayFromDanger.x = Normalize(self.coords.x - nearestDanger.coords.x);
            awayFromDanger.y = Normalize(self.coords.y - nearestDanger.coords.y);
        }

        var towardsFood = {x:0,y:0};
        if (nearestFood) {
            towardsFood.x = Normalize(nearestFood.coords.x - self.coords.x);
            towardsFood.y = Normalize(nearestFood.coords.y - self.coords.y);
        }

        if (Distance(awayFromDanger, self.coords) < SAFE_DISTANCE) {
            self.coords.x += awayFromDanger.x;
            self.coords.y += awayFromDanger.y;
        } else {
            self.coords.x += towardsFood.x;
            self.coords.y += towardsFood.y;
        }
        self.coords = game.validate(self.coords);

        // move away from predator - 5
        // move towards cover - 2
        // move towards food - 4
        // move towards other like kinds - 2
        // move away from borders - 1
    };

    var findNearest = function (self, type, floras) {
        var entities = faunaManager.faunas.concat(floras || []);
        var nearest;
        var nearestDist = Number.MAX_VALUE;

        entities.forEach(function (entity) {
            if (entity.type == type && entity.name != self.name) {
                var dist = Distance(entity.coords, self.coords);
                if (dist < nearestDist) {
                    nearestDist = dist;
                    nearest = entity;
                }
            }
        });
        return nearest;
    };

    faunaManager.init = function (game) {
        FaunaModel.find(function (err, faunas) {
            if (err) {
                console.log("Error: Getting faunas from db.");
            } else {
                faunaManager.faunas = faunas;
            }
        });
    };

    faunaManager.update = function (game) {
        faunaManager.init();
        // update all faunas
        for (var i = faunaManager.faunas.length - 1; i >= 0; i--) {
            var curFauna = faunaManager.faunas[i];
            updateFauna(curFauna, game);

            curFauna.save(function(err, res, count) {
                if (err) console.log(err);
            });
            if (curFauna.attributes.hunger < 0) {
                deceased_faunas.concat(faunaManager.faunas.splice(i, 1)); // remove animal from faunas and add to dead list
            }
        }

        // spawn new animal when countdown reaches 0, reset countdown
        if (--spawnCountdown <= 0) {
            var genome = {
                name: animalCount++ + 'wolf',
                type: 'wolf',
                attributes: faunaAttributes['wolf'],
                coords: game.randCoord()
            };
            FaunaModel.create(genome, function (err, res) {
                if (err)
                    console.log("Error: Failed to add a new " + genome + " to the db.")
            });

            genome = {
                name: animalCount++ + 'rabbit',
                type: 'rabbit',
                attributes: faunaAttributes['rabbit'],
                coords: game.randCoord()
            };
            FaunaModel.create(genome, function (err, res) {
                if (err)
                    console.log("Error: Failed to add a new " + genome + " to the db.")
            });

            spawnCountdown = SPAWNING_TIME;
        }
    };

})(module.exports);
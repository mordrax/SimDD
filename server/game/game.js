// SimDD entry point
var Game = (function () {
    var startTime;
    var worldInterval;

    var planet;
    var fauna;
    var flora;
    var self;
    var mongoose;
    var db;

    function Game() {
        this.self = this;
        this.planet = require('./planet');
        this.fauna = require('./fauna');
        this.flora = require('./flora');
        this.mongoose = require('mongoose');
        console.log('Constructed game');
    }

    Game.prototype.init = function () {
        this.planet.init();
        this.fauna.init(this);
        this.flora.init(10, 10, this);

        this.mongoose.connect('mongodb://localhost/simdd-dev');
        this.db = this.mongoose.connection;
        this.db.on('error', console.error.bind(console, 'connection error...'));
        this.db.once('open', function callback() {
            console.log('The World db opened!')
        });
        console.log('Initialised the planet, db and all fauna, flora');
    };

    Game.prototype.rand = function (low, high) {
        return Math.random() * (high - low) + low;
    };

    Game.prototype.randCoord = function () {
        coords = {};
        coords.x = Math.round(this.rand(0, this.planet.HEIGHT - 1));
        coords.y = Math.round(this.rand(0, this.planet.WIDTH - 1));
        return coords;
    };

    Game.prototype.update = function () {
        /*console.log(Date.now()-startTime);*/

        this.fauna.update(this);
        this.flora.update(this);

        this.draw();
    };

    Game.prototype.start = function () {
        startTime = Date.now();
        with (this) {
            setInterval(function () {
                self.update()
            }, 1000);
        } // <-- Never look or touch this code if you want to retain your sanity (http://stackoverflow.com/questions/237350/how-to-solve-var-out-of-scope-within-settimeout-call)
    };

    Game.prototype.draw = function () {
        var buffer = [];
        for (var i = 0; i < this.planet.data.length; i++) {
            buffer[i] = [];
            for (var j = 0; j < this.planet.data[i].length; j++) {
                buffer[i][j] = this.planet.data[i][j];
            }
        }

        this.flora.floras.concat(this.fauna.faunas).forEach(function (entity) {
            var char;
            switch (entity.type) {
                case 'wolf':
                    char = 'W';
                    break;
                case 'rabbit':
                    char = 'r';
                    break;
                case 'berrybush':
                    char = '*';
                    break;
                case 'grass':
                    char = ';';
                    break;
            }
            buffer[entity.coords.x][entity.coords.y] = char;
        });

        this.save();
        /*
         var worldModel = this.worldSchemas.world;

         var prettyBuffer;
         buffer.forEach(function (row) {
         prettyBuffer += row.join('') + '||';
         });

         var newWorld = new worldModel({worldData:prettyBuffer});

         var upsertData = newWorld.toObject();
         delete upsertData._id;

         // insert to theWorld db rather than to console
         worldModel.update({_id: 100}, upsertData, {upsert:true}, function(err) {
         if (err) console.log('failed to save new ground to world.')
         });*/
    };

    Game.prototype.save = function () {
        var faunaModel = require('../api/fauna/fauna.model');
        var floraModel = require('../api/flora/flora.model');

        var pad = function (n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        };

        this.fauna.faunas.forEach(function (faunaData) {
            var fauna = new faunaModel(faunaData);
            fauna.save(function (err, val) {
                if (err)
                    console.log("Failed to update fauna: " + fauna.name + "err: " + error);
                else
                    console.log("Saved with value: " + val);
            });
        });

        this.flora.floras.forEach(function (floraData) {
            var flora = new floraModel(floraData);
            flora.save(function (err, val) {
                if (err)
                    console.log("Failed to update flora: " + flora.name + "err: " + error);
                else
                    console.log("Saved with value: " + val);
            });
        });
    };

    Game.prototype.validate = function (coords) {
        coords.x = Math.max(coords.x, 0);
        coords.y = Math.max(coords.y, 0);

        coords.x = Math.min(coords.x, this.planet.WIDTH);
        coords.y = Math.min(coords.y, this.planet.HEIGHT);

        return coords;
    };
    return Game;
})();

var game = new Game();
game.init();
game.start();


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
    };

    Game.prototype.start = function () {
        startTime = Date.now();
        with (this) {
            setInterval(function () {
                self.update()
            }, 1000);
        } // <-- Never look or touch this code if you want to retain your sanity (http://stackoverflow.com/questions/237350/how-to-solve-var-out-of-scope-within-settimeout-call)
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


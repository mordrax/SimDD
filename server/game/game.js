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

    var Ash = require('./lib/ash.js');
    var Engine = new Ash.Engine();
    var Systems = require('./systems');
    var Util = require('./util');

    function Game () {
        this.self = this;
        this.planet = require('./planet');
        this.fauna = require('./fauna');
        this.flora = require('./flora');
        this.mongoose = require('mongoose');

        Engine.addSystem(new Systems.DeathSystem(), 1);
        Engine.addSystem(new Systems.DecisionSystem(), 2);
        Engine.addSystem(new Systems.MovementSystem(), 3);
        Engine.addSystem(new Systems.NodeSystem(), 10);

        this._factory = require('./entityFactory').Factory;

        Engine.addEntity(this._factory.Wolf(
            'wolfie',
            Util.rand(0, this.planet.WIDTH),
            Util.rand(0, this.planet.HEIGHT)));
        Engine.addEntity(this._factory.Rabbit(
            'rogers',
            Util.rand(0, this.planet.WIDTH),
            Util.rand(0, this.planet.HEIGHT)));

        console.log('Constructed game');
    };

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

    Game.prototype.randCoord = function () {
        coords = {};
        coords.x = Math.round(this.rand(0, this.planet.HEIGHT - 1));
        coords.y = Math.round(this.rand(0, this.planet.WIDTH - 1));
        return coords;
    };

    Game.prototype.update = function () {
        /*console.log(Date.now()-startTime);*/
        Engine.update();
        //this.fauna.update(this);
        //this.flora.update(this);
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


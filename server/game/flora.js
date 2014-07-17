var extend = require('util')._extend;

var FloraModel = require('../api/flora/flora.model');

(function(floraManager) {

    var SPAWNING_TIME = 10;
    var spawnCountdown = SPAWNING_TIME;
    var plantCount = 0;
    floraManager.floras = [];

    var floraAttributes = {
        berrybush:{
            fruitage:5,
            basecover:5
        },
        grass:{
            fruitage:10,
            basecover:1
        }
    };


    var Flora = (function() {
        function Flora(genome) {
            this.name = genome.name;
            this.type = genome.type;
            this.attributes = genome.attributes;
            this.coords = genome.coords;
        }


        Flora.prototype.update = function(game) {
            //console.log(this.name + " updating this plant")
        };
        return Flora;
    })();


    floraManager.init = function(game) {
        FloraModel.find(function (err, floras) {
            if (err) {
                console.log("Error: Getting floras from db.");
            }

            floras.forEach(function (item) {
                floraManager.floras.push(new Flora(item));
            });
        });
    };


    floraManager.update = function(game) {
        // update all floras
        for (var i=floraManager.floras.length-1; i>0; i--) {
            floraManager.floras[i].update(game);

        }

        // spawn new plant when countdown reaches 0, reset countdown
        if (--spawnCountdown <= 0) {
            var genome = {
                name: plantCount++ + 'berrybush',
                type: 'berrybush',
                attributes: floraAttributes['berrybush'],
                coords: game.randCoord()
            };
            FloraModel.create(genome, function(err, res) {
                if (err)
                    console.log("Error: Failed to add a new " + genome + " to the db.")
            });

            genome = {
                name: plantCount++ + 'grass',
                type: 'grass',
                attributes: floraAttributes['grass'],
                coords: game.randCoord()
            };
            FloraModel.create(genome, function(err, res) {
                if (err)
                    console.log("Error: Failed to add a new " + genome + " to the db.")
            });

            spawnCountdown = SPAWNING_TIME;
        }
    };


})(module.exports);

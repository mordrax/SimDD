(function(flora) {

    var SPAWNING_TIME = 10;
    var spawnCountdown = SPAWNING_TIME;
    var plantCount = 0;
    flora.floras = [];

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
        function Flora(name, type, coords) {
            this.name = name;
            this.type = type;

            this.attibutes = floraAttributes[type] || {
                fruitage:1,
                basecover:1
            };

            this.coords = coords || {x:0,y:0}
        }

        Flora.prototype.update = function() {
            //console.log(this.name + " updating this plant")
        };

        return Flora;
    })();

    flora.init = function(berryBushes, grass, game) {
        for (var i=0; i<berryBushes; i++) {
            flora.floras.push(new Flora(plantCount++, 'berrybush', game.randCoord()));
        }

        for (var i=0; i<grass; i++) {
            flora.floras.push(new Flora(plantCount++, 'grass', game.randCoord()));
        }
    };

    flora.update = function(game) {
        flora.floras.forEach(function(plant) {
            plant.update();
        });

        if (--spawnCountdown <= 0) {
            flora.floras.push(new Flora(plantCount++, 'berrybush', game.randCoord()));
            flora.floras.push(new Flora(plantCount++, 'grass', game.randCoord()));
            spawnCountdown = SPAWNING_TIME;
        }
    }

})(module.exports);

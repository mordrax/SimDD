(function (planet) {
    planet.name = "Planet SimDD";
    planet.HEIGHT = 50;
    planet.WIDTH = 50;

    planet.init = function() {
        // initialise world
        planet.data = [];
        for (var i=0; i<planet.HEIGHT; i++) {
            planet.data[i] = [];
            for (var j=0; j<planet.WIDTH; j++) {
                planet.data[i][j] = '.';
            }
        }
    }
})(module.exports);
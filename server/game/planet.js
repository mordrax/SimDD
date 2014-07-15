(function (planet) {
    planet.name = "Planet SimDD";
    planet.HEIGHT = 50;
    planet.WIDTH = 50;

    planet.init = function() {
        // initialise world if one does not exist already

        planet.data = seed();
    };

    var seed = function() {
        var data = [];
        for (var i=0; i<planet.HEIGHT; i++) {
            data[i] = [];
            for (var j=0; j<planet.WIDTH; j++) {
                data[i][j] = '.';
            }
        }
        return data;
    }
})(module.exports);
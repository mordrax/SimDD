var WorldModel = require('../api/world/world.model');
var ObjectId = require("mongoose").Types.ObjectId;

(function (planet) {
    planet.name = "Planet SimDD";
    planet.HEIGHT = 50;
    planet.WIDTH = 50;
    planet._objectId = ObjectId("theOneAndOly");


    planet.init = function () {

        // initialise world if one does not exist already
        WorldModel.findById(planet._objectId, function (err, res) {
            if (err)
                console.log("Error: Failed to find a world");
            if (!res) {
                var newWorld = new WorldModel({
                    _id: planet._objectId,
                    name: "SimDD World",
                    tiles : seed()
                });
                newWorld.save();
            }
        });
    };

    var seed = function () {
        var data = [];
        for (var i = 0; i < planet.HEIGHT; i++) {
            for (var j = 0; j < planet.WIDTH; j++) {
                data.push({
                    coords:{
                        x:i,
                        y:j
                    },
                    type:'.'
                });
            }
        }
        return data;
    }
})(module.exports);
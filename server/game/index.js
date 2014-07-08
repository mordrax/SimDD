/**
 * Created by mordrax on 5/05/2014.
 */
(function (db) {
    var database = require("./world");

    db.init = function() {
        database.getWorld(function (err, world) {
           if (err) {
               console.log("Failed to get the DB");
           } else {
               console.log("Loaded world: " + world.toString());
           }
        });
    }
})(module.exports);
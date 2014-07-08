// world is a database using MongoDB
(function (database) {
    var mongodb = require("mongodb");
    var mongoUrl = "mongodb://localhost:27017/theWorld";
    var localDB = null;

    database.getWorld = function(next) {
        if (!localDB) {
            mongodb.MongoClient.connect(mongoUrl, null, function(err, db) {
                if (err) {
                    next(err, null);
                } else {
                    localDB = {
                        db: db,
                        info: db.collection("info")
                    }
                    if (!localDB.info.name || !localDB.info.authors) {
                        localDB.info.insert({name: "A simply Hunted World"}, function (err) {
                            if (err) console.log("Failed to insert name into db.")
                        });
                        localDB.info.insert({authors: ["Kaan Duran", "Joseph Ni"]}, function (err) {
                            if (err) console.log("Failed to insert authors into db.")
                        });
                    }
                    next(null, db);
                }
            });
        } else {
            next(null, localDB);
        }
    }

    database.setWorld = function(world, callback) {
        fs.writeFile("./world", world, null, callback);
    }

})(module.exports);
var mongo = require('mongodb');
    Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure,
    server = new Server('localhost', 27017, {auto_reconnect: true, safe:true});

db = new Db('madecanvas', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'madecanvas' database");
        db.collection('users', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'users' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
}); 

exports.getById = function (req, res) {
	var id = req.params.id;
	db.collection('users', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
}

exports.addUser = function(req, res) {
    var userModel = req.body;
    console.log('Adding userModel: ' + JSON.stringify(userModel));
    db.collection('users', function(err, collection) {
        collection.insert(userModel, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}


var populateDB = function() {
 
    var users = [
    {
        username: "node",
        fullName: "NodeJS"
        
    },
    {
    	username: "python",
    	fullName: "Python"
    }
    ];
 
    db.collection('users', function(err, collection) {
        collection.insert(users, {safe:true}, function(err, result) {});
    });
 
}
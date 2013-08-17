var express = require('express'),
	userResource = require('./routes/user'),
	app = express();

// Middleware 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});


app.get('/', function(req, res){
  res.send('Welcome to our kickass service!');
});

// User resource
app.get('/api/v1/user', function(req, res){
  res.send('hello users');
});

app.get('/api/v1/user/:id', userResource.getById);

app.get('/api/v1/user/:id/canvas', function(req, res){
  res.send('List of user # ' + req.params.id + ' canvas');
});

app.get('/api/v1/user/:userId/canvas/:canvasId', function(req, res){
  res.send('Canvas #' + req.params.canvasId + ' of the user #' + req.params.userId);
});

app.post('/api/v1/user', userResource.addUser);


// Canvas resource
app.get('/api/v1/canvas/:id', function(req, res){
  res.send('Canvas # ' + req.params.id);
});

app.get('/api/v1/canvas/:id/tile', function(req, res){
  res.send('List of tiles of the canvas # ' + req.params.id);
});

app.get('/api/v1/canvas/:canvasId/tile/:tileId', function(req, res){
  res.send('Tile # '+ req.params.tileId +' of the canvas # ' + req.params.canvasId);
});

app.post('/api/v1/canvas', function (req, res) {
	var canvasModel = req.body;
	// Database insert.
	res.send("Insert canvas : " + canvasModel.canvasTitle);
});



// Tile resource
app.get('/api/v1/tile/:id', function(req, res){
  res.send('Tile # ' + req.params.id);
});

app.get('/api/v1/tile/:tileId/items', function(req, res){
  res.send('List of items of the tile # ' + req.params.tileId);
});

app.get('/api/v1/tile/:tileId/items/:itemId', function(req, res){
  res.send('Item #'+ req.params.itemid +' of the tile # ' + req.params.tileId);
});

app.post('/api/v1/tile', function(req, res){
	var tileModel = req.body;
	// Database insert.
	res.send("Insert title : " + tileModel.tileName);
});


// Item resource
app.get('/api/v1/item/:id', function(req, res){
  res.send('Item # ' + req.params.id);
});

app.post('/api/v1/item', function(req, res){
	var itemModel = req.body;
	// Database insert.
	res.send("Insert item : " + itemModel.itemText);
});

app.listen(3000);
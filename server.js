var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var httpServer = http.createServer(app);
var messages = [];
var io = require('socket.io')(httpServer);

var numClients = 0;
io.on('connection', function(client){
	console.log('Client', numClients++, 'connected.');
	client.on('join', function(data){
		console.log(data);
	});
	client.on("chat", function(msg){
		console.log(msg);
		client.broadcast.emit('chat msg', msg);
	});
});

app.use(bodyParser.json());

app.use(function(req, res,next){
	console.log("Received", req.method, "request for resource",
		req.path, "from", req.ip);
	next();
});

//middleware to handle static content
app.use(express.static('src'));
//app.use(myLogStatement);

// server listen to port 3000 for incoming requests
httpServer.listen(3000, function(){
	console.log("Listening on port 3000");
});

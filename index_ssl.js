var app = require('express')();
var https = require('https');
var http = require('http');
var fs = require('fs');
var path = require('path');
//var io = require('socket.io')(https);

var privateKey = fs.readFileSync('/home/ssl/server.key').toString();
var certificate = fs.readFileSync('/home/ssl/server.crt').toString();

var server = https.createServer({key:privateKey,cert:certificate},app);

//var server = http.createServer(app);
var io = require('socket.io').listen(server);
//var sio = require('socket.io').listen(app);

var express=require('express');
app.use(express.static(__dirname + '/Demo'));

//io.set('origins', 'https://catpips.com');

app.get('/', function (req, res) {
res.sendFile('/desktop-wrapper/index.html/');
  //res.sendfile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  console.log('user connected')

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

	socket.on("join",function(msg){
		   socket.on(msg, function(msgg){
    			console.log('message: ' + msgg);
    		io.emit(msg, msgg);
 			 });
	});

});

server.listen(3020);
console.log('listening on *:3020');

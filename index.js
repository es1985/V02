var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');


var express=require('express');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
res.sendFile('/desktop-wrapper/index.html/');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});


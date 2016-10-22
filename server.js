// server.js

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine', 'pug');

app.get("/", function (request, response) {
  //response.render('index', { trellokey: process.env.TRELLO_KEY });
    response.render('index', { trellokey: 'zzz' });
});

// http://expressjs.com/en/starter/static-files.html
 app.use(express.static('public'));

// User connection and disconnection
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

// Chat message
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

// listen for requests :)
listener = http.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
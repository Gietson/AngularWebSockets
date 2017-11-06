var express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io')(server),
  fs = require('fs');

app.use(express.static(__dirname + '/dist'));

io.on('connection',
  (socket) => {
    setInterval(() => {
        var value = Math.floor(Math.random() * 50);
        console.log('Emitting value: ' + value);
        socket.emit('data', { data: value });
      },
      2000);
  });

server.listen(8080);
console.log('Listening on port 8080');

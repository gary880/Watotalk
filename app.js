
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const demoMessage ={
  user : "Gary",
  message : "Hello"
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

io.on('connection', (socket) => {
    socket.on('chat', (msg) => {
      console.log('message: ' + msg);
    });
  });

  io.on('connection',(socket) => {
    io.emit('demoMessage',demoMessage);
  })
  
  io.on('connection', (socket) => {
    socket.on('chat', (msg) => {
      io.emit('chat', msg);
    });
  });

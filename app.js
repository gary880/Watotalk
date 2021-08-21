
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const {Joinroom , getCurrentUser,getRoomUsers,userDisconnect} = require('./user/user')
const io = new Server(server);

app.use(express.static('public'));
app.use(express.static('user'));



io.on('connection', (socket) => {
  //user join chatroom
  socket.on('join',(obj)=>{
    const user = Joinroom(socket.id,obj.name,obj.room);
    socket.join(user.roomId);
    io.to(user.roomId).emit('usersInRoom',getRoomUsers(user.roomId));
  });

  //user leave chatroom
  socket.on('disconnect', ()=>{
    const user =  userDisconnect(socket.id);
    
    if(user){
      io.to(user.roomId).emit('disconnectMessage', user )
      io.to(user.roomId).emit('usersInRoom',getRoomUsers(user.roomId));
    }
});
  

  socket.on('chat',(obj) => {
    const user = getCurrentUser(socket.id);
    io.to(user.roomId).emit('chat-broadcast',obj);
  
  });

   console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});




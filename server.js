const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { router } = require('./src/routes/users');
app.use('/api/users', router)


const { Server } = require("socket.io");

const io = new Server(server);

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });


io.on('connection', async (socket) => {

  socket.on('room', function (room) {
    console.log(room)
    socket.join(room);
  });

  // chat socket
  // socket.on('chat-room', function (room) {
  //   console.log(room)
  //   socket.join(room);
  // });


  // live tracking
  // socket.on('live-tracking', function (room) {
  //   console.log(room)
  //   socket.join(room);
  // });


  socket.on('sendMsg' , (msg)=>{
    console.log(msg)
    io.to(msg.room).emit('message' , msg.msg)
  })

  socket.on('track' , (msg)=>{
    io.to(msg.room).emit('trackUser' , msg.msg)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });


});

server.listen(4000, () => {
  console.log('listening on *:3000');
});





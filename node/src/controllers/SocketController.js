
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


function socketUp() {
    console.log('wfwrgfwrgiowj');
    io.on('connection', (socket) => {
        socket.on('chat message', (msg) => {
          console.log('message: ' + msg);
          io.emit('chatRoom' , msg);
          // socket.emit('chat' , msg); this is true too
        });
        socket.on('disconnect', () => {
            console.log('heeeeh!')
        })
      });

      server.listen(6000, () => {
  console.log('listening on *:6000');
});
}


module.exports = {
    socketUp
}
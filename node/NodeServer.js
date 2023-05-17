const express = require('express');
const app = express();
const http = require('http');
const https = require('https');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const sessions = require('express-session');
const cors = require('cors')
app.use(express.json())
app.use(cors())

const PORT = 9876


io.on('connection', (socket) => {

  console.log('a user connected');


  // join to specific room
  socket.on('join', (room) => {
    console.log(`joined to room ${room}`);
    socket.join(room)
  })

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// socket.in().emit() ====>  sends the event event with data data to all clients in the specified room room, except for the sender.
// socket.to().emit() ===> sends the event event with data data to all connected clients in the specified room room, including the sender.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  socket.on('typing', (msg) => socket.in(msg.room).emit('typing',msg.status))
  socket.on('stop typing', (msg) => socket.in(msg.room).emit('stop typing' , msg.status))
  

  // send message 
  socket.on('send message', (msg) => {
          console.log('message: ' + msg);
          // io.emit('chatRoom' , msg); ====>   send event to all connected calls
          // socket.emit() ====> send an event to the client associated with the specific Socket object.
          socket.to(msg.room).emit('chatRoom' , msg.data); 
        // socket.emit(msg.data);
          // call api service 
          //   https.get('https://jsonplaceholder.typicode.com/users', (res) => {
          //   console.log('statusCode:', res.statusCode);
            
          //   res.on('data', (d) => {
          //     process.stdout.write(d);
          //     // console.log(d);
          //   });
          // }).on('error', (e) => {
          //   console.error(e);
          // });
        });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});


/* 
const net = require('net');
const http = require('http');
const io = require('socket.io');

// Create a TCP server using the net module
const server = net.createServer();

// Create an HTTP server to serve the client-side Socket.IO library
const httpServer = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<script src="/socket.io/socket.io.js"></script>');
  // res.sendFile(__dirname + 'public/index.html');

});

// Start listening on port 3000
server.listen(10337);

// Attach the Socket.IO server to the HTTP server
const socketServer = io(httpServer);

// Handle connections from clients
socketServer.on('connection', (socket) => {
  console.log('Client connected');

  // Send a message to the client
  socket.emit('message', 'Hello, world!');

  // Handle messages from the client
  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  // Handle disconnections from clients
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start listening for HTTP requests
httpServer.listen(10338, () => {
  console.log('HTTP server listening on port 10338');
});
 */
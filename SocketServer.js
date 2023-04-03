
const { Server } = require("socket.io");


const io = new Server({
    // options
  });
  
  io.on("connection", (socket) => {
    console.log('test');
  });
  
  io.listen(7000);
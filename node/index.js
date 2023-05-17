const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')


const { userRoutes } = require('./src/routes/users')

const app = express()
app.use(express.json())
const server = http.createServer(app)
const io = socketio(server)


// const cors = require('cors')
// app.use(express.json())
// app.use(cors())
// to link index with router
app.use('/', userRoutes)
const publicDirectory = path.join(__dirname, '/public')
app.use(express.static(publicDirectory))



app.get('/chat', (req, res) => {
    // res.send(__dirname)
    res.sendFile(__dirname + '/public/index.html');
})

app.listen(5000, () => console.log('up'))

// io.on('connection', (socket) => {
//     console.log('sdd');
//     socket.on('chat message', (msg) => {
//       console.log('message: ' + msg);
//       io.emit('chatRoom' , msg);
//       // socket.emit('chat' , msg); this is true too
//     });
//     socket.on('disconnect', () => {
//         console.log('heeeeh!')
//     })
//   });



//   server.listen(6000, () => {
//   console.log('listening on *:6000');
// });
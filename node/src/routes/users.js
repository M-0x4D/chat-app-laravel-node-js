const express = require('express')
const userRoutes = express.Router()
const {adel} = require('../controllers/UserController')
const {socketUp} = require('../controllers/SocketController')
var path = require('path');
const app = express();
const http = require('http');
const https = require('https');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const joi = require('joi');

user = adel('mohamed')

//! validation with joi pckage
// const userSchema = joi.object({
//     name: joi.string().min(3).required(),
//     email: joi.string().email().required()
// })

// app.get('/chat', (req, res) => {

//     // res.send(publicDirectory)
//     res.sendFile(__dirname + '../public/index.html');
// })

userRoutes.get('/',  (req, res) => {
    try {

        // var {error , value} = userSchema.validate(req.body)
        // if (error) {
            console.log('check credentials')
            // res.send(error.details)
        // }
            res.send(user)

    } catch (e) {
        console.log(e)
    }
})

userRoutes.get('/test',  (req, res) => {
    try {
        res.send('hello test')
    } catch (e) {
        console.log(e)
    }
})



module.exports = {
    userRoutes
}
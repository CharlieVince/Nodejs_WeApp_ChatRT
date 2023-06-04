const http = require('http')
const path = require('path')
const express = require('express');
const socketio = require('socket.io')


const app = express();
const server = http.createServer(app)
const io = socketio(server)

require('./sockets')(io)

//Envio de archivos estaticos
app.use(express.static(path.join(__dirname, 'public')))

//Iniciando servidor
server.listen(3000, () => {
    console.log('server on port 3000')
})
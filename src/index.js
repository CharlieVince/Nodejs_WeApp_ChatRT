const http = require('http')
const path = require('path')
const express = require('express');
const socketio = require('socket.io')


const app = express();
const server = http.createServer(app)
const io = socketio(server)

//settings
app.set('port', process.env.PORT || 3000)

require('./sockets')(io)

//Envio de archivos estaticos
app.use(express.static(path.join(__dirname, 'public')))

//Iniciando servidor
server.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})
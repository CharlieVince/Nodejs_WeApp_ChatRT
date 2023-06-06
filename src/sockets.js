module.exports = function (io){
    let users = []


    io.on('connection', socket => {
        console.log('nuevo usuario conectado')

        socket.on('send message', data => {
            io.sockets.emit('new message', {
                message: data,
                user: socket.user
            })
        })

        socket.on('new user', (data, cb) => {
            if (users.indexOf(data) != -1){
                cb(false)
            } else{
                cb(true)
                socket.user = data
                users.push(socket.user)
                updateUsernames()
            }
        })

        socket.on('disconnect', data => {
            if(!socket.user) return

            users.splice(users.indexOf(socket.user), 1)
            updateUsernames()
        })

        function updateUsernames(){
            io.sockets.emit('usernames', users)
        }
    })
}
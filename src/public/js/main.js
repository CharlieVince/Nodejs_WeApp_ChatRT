$(function () {
    const socket = io()

    //obteniendo los componentes del login
    const $loginForm = $('#login-form')
    const $loginError = $('#login-error')
    const $loginUser = $('#login-username')

    //obteniendo los componentes del mensaje desde DOM
    const $messageForm = $('#message-form')
    const $messageBox = $('#message')
    const $chat = $('#chat')
    
    const $users = $('#usernames')

    //Captura de eventos
    $loginForm.submit( e=> {
        e.preventDefault()
        socket.emit('new user', $loginUser.val(), data => {
            if(data){
                $('#login').hide()
                $('#contentPrincipal').show()
            }else{
                $loginError.html(`
                    <div class="alert alert-danger">
                        El usuario ya existe
                    </div>
                `)
            }

            $loginUser.val(' ')
        })
    } )



    $messageForm.submit( e=> {
        e.preventDefault()
        socket.emit('send message', $messageBox.val())
        $messageBox.val('')
    })

    socket.on('new message', data => {
        //$chat.append('<b>' + data.user + '</b>: ' + data.message + '<br/>')
        $chat.append(`<b> ${data.user} </b>: ${data.message} <br/>`)
    })

    socket.on('usernames', data => {
        let html = ''

        for (let i = 0; i < data.length; i++){
            html += `<p><i class="fas fa-user"></i> ${data[i]}</p>`
        }
        $users.html(html)
        console.log(data)
    })
})
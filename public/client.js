const socket = io.connect('http://localhost:3000')

let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.messagearea')
do{
    name = prompt('please enter your name: ')
}while(!name)


textarea.addEventListener('keyup', (e) =>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user: name,
        message: message.trim()
    }

    //append
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()
    
    //send to server
    socket.emit('message', msg)



}


function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')


    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}
        `

    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)    
}


// receive message

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}
var socket = io();

var statusMessage = document.getElementById('status-message');
var connectionCount = document.getElementById('connection-count');
var buttons = document.querySelectorAll('#choices button');

socket.on('statusMessage', function(message){
    statusMessage.innerText = message;
})

socket.on('usersConnected', function(count){
    connectionCount.innerText = 'Connected Users: ' + count;
})

socket.on('voteCount', function(votes){
    console.log(votes);
})

for ( let i = 0; i < buttons.length; i++ ){
    buttons[i].addEventListener('click', function(){
	socket.send('voteCast', this.innerText);
    });
}

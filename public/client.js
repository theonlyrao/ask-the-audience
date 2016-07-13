var socket = io();

var statusMessage = document.getElementById('status-message');
var connectionCount = document.getElementById('connection-count');
var yourVote = document.getElementById('your-vote');
var votes = document.getElementById('votes');
var buttons = document.querySelectorAll('#choices button');

socket.on('statusMessage', function(message){
    statusMessage.innerText = message;
})

socket.on('usersConnected', function(count){
    connectionCount.innerText = 'Connected Users: ' + count;
})

socket.on('voteResults', function(results){
    console.log(results)
    yourVote.innerText = results.message;
    var printedVotes = [];
    var doIt = function (results) {
	results.votes.forEach(function(vote){
	    printedVotes.push(String(vote));
	})
    }
    doIt(results);
    votes.innerText = printedVotes;
})

/* socket.on('voteCount', function(votes){
 *     votes.innerText = votes
 * })
 * 
 * socket.on('yourVote', function(message){
 *     yourVote.innerText = message
 * })*/

for ( let i = 0; i < buttons.length; i++ ){
    buttons[i].addEventListener('click', function(){
	socket.send('voteCast', this.innerText);
    });
}

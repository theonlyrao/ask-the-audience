const http = require('http');
const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

const server = http.createServer(app)
		   .listen(port, function() {
		       console.log('Listening on port ' + port + '.');
		   })

const socketIo = require('socket.io');
const io = socketIo(server);

var votes = {};

io.on('connection', function(socket){
    console.log('A user has connected.', io.engine.clientsCount);

    io.sockets.emit('usersConnected', io.engine.clientsCount);

    socket.emit('statusMessage', 'You have connected.')

    socket.on('message', function(channel, message){
	if (channel === 'voteCast'){
	    votes[message] = votes[message] + 1 || 1;
	    socket.emit('voteCount', votes);
	}
    });
    
    socket.on('disconnect', function(){
	console.log('A user has disconnected.', io.engine.clientsCount);
	delete votes[socket.id];
	console.log(votes);
	io.sockets.emit('usersConnected', io.engine.clientsCount);
    })
});

app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

module.exports = server;

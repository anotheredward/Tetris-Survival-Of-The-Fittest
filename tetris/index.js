var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var util = require('util');

var users = require(__dirname + '/js/userContainer.js')();
var players = require(__dirname + '/js/playerContainer.js')();

app.use("/scripts", express.static(__dirname + '/public/js'));
app.use("/styles", express.static(__dirname + '/public/css'));

app.get('/', function(req, res) {
    res.sendFile('index.html', { root: __dirname });
});

io.on('connection', function(socket) {
	
	socket.on('disconnect', function() {
		updatePlayers();
		updateClientUserList();
		
		if (users.allUsers[socket.id].showDisconnectMessage)
			io.emit('message', users.nameById(socket.id) + ' Has Disconnected');	
	});
	
	socket.on('authenticate', function(token) {
		var rejoining = false;
		var userExists = users.isExistingUser(token);
		
		if (userExists && token !== socket.id) {
			var clients = getClientIdList();
			
			for (var i = 0; i < clients.length; i++) {
				if (clients[i] === token) {
					io.to(token).emit('disconnect client', 'New connection made, disconnecting.');
					io.emit('message', users.nameById(token) + " Has Reconnected as " + users.nameById(socket.id));
					users.allUsers[token].showDisconnectMessage = false;
					rejoining = true;
				}
			}
		}
		if (rejoining) {
			// tie new user object to old player
			// skip title (and maybe also lobby)
		}
		updateClientUserList()
	});
	
	socket.on('set handle', function(handle) {
		io.emit('message', users.nameById(socket.id) + " is now " + handle);
		
		users.allUsers[socket.id].setHandle(handle);
		players.newPlayer(users.allUsers[socket.id]);
		updatePlayers();

		io.to(socket.id).emit('goto lobby');
		updateClientUserList();
	});
	
	socket.on('set ready', function() {
		players.getPlayerById(socket.id).isReady = true;
		updatePlayers();
	});

	users.newUser(socket.id, socket.request.connection.remoteAddress);
	io.to(socket.id).emit('authenticate', socket.id);
	
	updateClientUserList();
	io.emit('message', users.nameById(socket.id) + ' Has Connected');

});

http.listen(3000, function() {
    console.log('listening on *:3000');
});

function updateClientUserList() {
	var clients = getClientIdList();
	var userList = [clients.length];

	for (var i = 0; i < clients.length; i++)
		userList.push(users.nameById(clients[i]));
	
	io.emit('update user list', userList);
}

function updatePlayers() {
	var clients = getClientIdList();
	for (var i = 0; i < players.allPlayers.length; i ++){
		if (clients.contains(players.allPlayers[i].user.id) === false)
			players.destroyByPos(i);
	}
	
	var playerList = [];
	for (var i = 0; i < players.allPlayers.length; i ++)
		playerList.push({
			handle: players.allPlayers[i].user.getDisplayName(),
			isReady: players.allPlayers[i].isReady
		});
		
	for (var i = 0; i < clients.length; i++) {
		var playerNum = players.getPlayerNumberById(clients[i]);
		
		
		if (typeof playerNum !== 'undefined')
			io.to(clients[i]).emit('update player list', playerList, playerNum);
	}
}

function getClientIdList() {
	return Object.keys(io.sockets.connected);
}

Array.prototype.contains = function ( needle ) {
   for (i in this) {
      if (this[i] == needle) return true;
   }
   return false;
}
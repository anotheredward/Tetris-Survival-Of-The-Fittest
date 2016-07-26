var socket = io();
var thisLobbyPlayer;
var playerList = [];
var playerNumber;

socket.on('connect', function(id) {
	var token = localStorage.getItem("authToken")
	if (token !== null ) 
		socket.emit("authenticate", token);
	else
		socket.emit("authenticate", null);
});

socket.on('authenticate', function(id) {
	var token = localStorage.getItem("authToken")
	localStorage.setItem("authToken", id);
});

socket.on('update user list', function(clientList) {
	connectionList = $('#connectionList').empty();
	for (var i = 0; i < clientList.length; i++)
		$('#connectionList').append(clientList[i] + "  ");
});

socket.on('disconnect client', function(message) {
	socket.disconnect();
	connectionList = $('#connectionList').empty();
	writeMessageToLog('~ ~ ~ ~ ' + message + ' ~ ~ ~ ~', 'error');
	runGame = false;
});

socket.on('message', function(message, classes) {
	writeMessageToLog(message, classes);
});

socket.on('goto lobby', function() {
	currentScreen.transitionToLobby();
});

socket.on('update player list', function (players, num) {
	playerList = players;
	playerNumber = num;
});

function writeMessageToLog(message, classesInput) {
	var line = $('<li>');
	line.text(message);
	if (typeof classesInput !== 'undefined')
		line.addClass(classes);
	$('#messages').append(line);
}

function sendHandle(handle) {
	socket.emit('set handle', handle);
}

function playerReady() {
	socket.emit('set ready');
}
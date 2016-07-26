function playerContainer() {
	var allPlayers = [];
	
	function newPlayer(user, handle, number) {
		var playerNumber = (typeof number === 'undefined') ? allPlayers.length : number;
		allPlayers[playerNumber] = {
			user: user,
			connected: true,
			isReady: false
		};
		
		return playerNumber;
	}
	
	function setPlayerUser(player, user) {
		allPlayers[player].user = user;
	}
	
	function getDisplayNames() {
		var playerList = [];
		for (var i = 0; i < allPlayers.length; i++) {
			if  (allPlayers[i].connected)
				playerList.push(allPlayers[i].user.getDisplayName());
		}
		return playerList;
	}
	
	function getPlayerNumberById(id) {
		for (var i = 0; i < allPlayers.length; i++) {
			if (allPlayers[i].user.id === id)
				return i;
		}
		return undefined;
	}
	
	
	function getPlayerById(id) {
		for (var i = 0; i < allPlayers.length; i++) {
			if (allPlayers[i].user.id === id)
				return allPlayers[i];
		}
		return undefined;
	}
	
	function destroyByPos(pos) {
		allPlayers.splice(pos, 1);
	}
	
	return {
		allPlayers: allPlayers,
		newPlayer: newPlayer,
		getDisplayNames: getDisplayNames,
		getPlayerNumberById: getPlayerNumberById,
		getPlayerById: getPlayerById,
		destroyByPos: destroyByPos
	}
}

module.exports = playerContainer;
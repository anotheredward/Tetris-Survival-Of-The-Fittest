var User = function(id, ip) {
	this.id = id,
	this.ip = ip, 
	this.handle = '',
	this.showDisconnectMessage = true
};

User.prototype.getDisplayName = function() {
	if (this.handle === '')  
		return this.ip;
	return this.handle;
};

User.prototype.setHandle = function(handle) {
	if (handle.length > 20) 
		this.handle = handle.substring(0, 20);
	else
		this.handle = handle;
};

function userContainer() {
	var allUsers = {};
	
	function newUser(id, ip) {
		allUsers[id] = new User(id, ip);
		return allUsers[id];
	}
	
	function isExistingUser(id) { 
		for (var i in allUsers) {
			if (i == id)
				return true;
		}
		return false;
	}
	
	function nameById(id) {
		return allUsers[id].getDisplayName();
	}
	
	return {
		allUsers: allUsers,
		
		newUser: newUser,
		isExistingUser: isExistingUser,
		nameById: nameById
	}
}

module.exports = userContainer;
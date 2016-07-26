function entityContainer() {
	var allEntities = [];

	function draw(ctx) {
		var entityIndex = allEntities.length - 1;
        for (; entityIndex >= 0; entityIndex--) { 
            if (allEntities[entityIndex].drawMe)
				allEntities[entityIndex].draw(ctx); 
		}
	}
	
	function update() {
		var entityIndex = allEntities.length - 1;
        for (; entityIndex >= 0; entityIndex--)
            allEntities[entityIndex].update();
	}
	
	function createEntity(entityType, params) {
		var newEntity = new baseEntities[entityType](params);
		allEntities.push(newEntity);
		return newEntity;
	}

	function destroyEntity(entity) {
		allEntities.splice(allEntities.indexOf(entity));
	}
	
	function getAll() {
		return allEntities;
	}
	
	return {
        draw: draw,
        update: update,
		createEntity: createEntity,
		destroyEntity: destroyEntity,
		getAll: getAll
	}
}

const baseEntities  = {
	Button: function (input) {
		this.x      = (typeof x            === 'undefined') ? 0                : input.x;
		this.y      = (typeof y            === 'undefined') ? 0                : input.y;
		this.width  = (typeof input.width  === 'undefined') ? 62               : input.width;
		this.height = (typeof input.height === 'undefined') ? 30               : input.height;
		this.weight = (typeof input.weight === 'undefined') ? 2                : input.weight;
		this.text   = (typeof input.text   === 'undefined') ? ''               : input.text;
		this.font   = (typeof input.font   === 'undefined') ? '18px monospace' : input.font;
		this.color  = (typeof input.color  === 'undefined') ? 'rgb(0,0,0)'     : input.color;
		this.drawMe = (typeof input.drawMe === 'undefined') ? true             : input.drawMe;
		this.hover  = 0;
		
		this.onClick = (typeof input.onClick === 'undefined') ? function() {}  : input.onClick;
		
		this.draw = function(ctx) {
			ctx.strokeStyle = this.color;
			ctx.lineWidth = this.weight + this.hover;
			ctx.strokeRect(this.x + 1, this.y + 1, 62, 30);
			
			ctx.fillStyle = this.color;
			ctx.font = '18px monospace';
			ctx.fillText(this.text, this.x + 8, this.y + 21);
		};
		
		this.update = function() {
			if (this.posOnObject(mousePos))
				this.hover = 1;
			else
				this.hover = 0;	
		};
		
		this.posOnObject = function(pos) {
			if (pos.y > this.y && pos.y < this.y + this.height &&
				pos.x > this.x && pos.x < this.x + this.width)
				return true;
			return false;
		};
	}
}
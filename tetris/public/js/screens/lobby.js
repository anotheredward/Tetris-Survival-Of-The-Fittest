lobbyScreen = (function (input) {
	var hue = 0;
    var direction = 1;
	var clickableObjects = new entityContainer();
	
	var readyButton;
		
	function start() {
		readyButton = clickableObjects.createEntity('Button', {
			text: "ready"
		});
		readyButton.onClick = function() {
			playerReady()
		};
	}
	
    function draw(ctx) {
        ctx.fillStyle = '#efefef';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);		
		
        var colorGreen = 'rgb(0,' + hue + ',0)';
		var colorRed = 'rgb(' + hue + ',0,0)'; 
		var color;
		
		var px = 690;
		
		ctx.fillStyle = colorGreen;
		ctx.font = '18px monospace';
		ctx.fillText("Players: " + playerList.length, px + 12, 55);

		for (var i = 0; i < playerList.length; i++) {
			var py = 100 + 60 * i;
			
			if (playerList[i].isReady) {
				color = colorGreen;
				
				ctx.beginPath();
				ctx.lineWidth = "2";
				ctx.strokeStyle = color;
				ctx.moveTo(px - 22, py - 2);
				ctx.lineTo(px - 17, py + 4);
				ctx.lineTo(px - 9, py - 11);
				ctx.stroke();
			} else {
				color = colorRed;
				
				if (i === playerNumber) {
					readyButton.color = color;
					readyButton.x = px - 75;
					readyButton.y = py - 20;
				}
			}

			ctx.fillStyle = color;
			ctx.font = '18px monospace';
			ctx.fillText("p" + i , px, py);
			
			ctx.fillStyle = color;
			ctx.font = '22px monospace';
			ctx.fillText(playerList[i].handle, px + 30, py + 1);
		}
		
		clickableObjects.draw(ctx);
    }

    function update() {
		hue += 1 * direction;
        if (hue > 200) direction = -1;
        if (hue < 1) direction = 1;
		
		if (playerList[playerNumber].isReady)
			readyButton.drawMe = false;
			
		clickableObjects.update();
    }
	
    return {
		start: start,
        draw: draw,
        update: update,
		clickable: clickableObjects.getAll()
    };
}());
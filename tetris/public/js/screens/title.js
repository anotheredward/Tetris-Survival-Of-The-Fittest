currentScreen = (function (input) {
    var hue = 0;
    var direction = 1;
	var nameEntered = false;
	
	var userHandleInput = new CanvasInput({
		canvas: canvas,
		fontSize: 20,
		fontFamily: 'monospace',
		fontColor: '#212121',
		width: 185,
		x: canvasSize.width / 2 -49,
		y: 499,
		padding: 5,
		borderWidth: 0,
		borderColor: "#333",
		borderRadius: 0,
		boxShadow: '0px 0px 0px #000',
		innerShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
		placeHolder: 'Enter your name!',
		onkeyup: function() { nameInput() },
		onsubmit: function() { nameSubmit() }
	});

    function centerText(ctx, text, y, xOffset = 0) {
        var measurement = ctx.measureText(text);
        var x = (ctx.canvas.width - measurement.width) / 2 + xOffset;
        ctx.fillText(text, x, y);
    }

    function draw(ctx) {
        ctx.fillStyle = '#efefef';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		
        var y = ctx.canvas.height / 2 - 80;
        var color = 'rgb(' + hue + ',0,0)';

        ctx.fillStyle = color;
        ctx.font = '48px monospace';
        centerText(ctx, "Tetris", y - 30);

        ctx.fillStyle = color;
        ctx.font = '24px monospace';
        centerText(ctx, 'Survival of the Fittest', y);        
		
		ctx.fillStyle = color;
        ctx.font = '15px monospace';
        centerText(ctx, '0.0.4 ', y + 20);
		
		ctx.fillStyle = color;
        ctx.font = '24px monospace';
        centerText(ctx, 'Handle: ', y + 200, -97);
		
		userHandleInput._fontColor = color;
		userHandleInput.render();
		
		if (nameEntered) {		
			ctx.fillStyle = color;
			ctx.font = '21px monospace';
			centerText(ctx, 'Press Enter', y + 240);
		}
    }

    function update() {
        hue += 1 * direction;
        if (hue > 255) direction = -1;
        if (hue < 1) direction = 1;
    }
	
	function nameInput() {
		if (userHandleInput.value() !== "")
			nameEntered = true;
		else
			nameEntered = false;
	}

	function nameSubmit() {
		if (nameEntered) {
			userHandleInput._readonly = true;
			sendHandle(userHandleInput.value());
		}
	}
	
	function transitionToLobby() {
		userHandleInput.destroy();
		currentScreen = lobbyScreen;
		currentScreen.start();
	}
	
    return {
        draw: draw,
        update: update,
		transitionToLobby: transitionToLobby
    };
}());
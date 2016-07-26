var canvas;
var surface
var currentScreen;

var mousePos = {x: 0, y: 0};

var runGame = true;
var fps = 40;
var frameCount = 0;

function beginLoop() {
    var fpsInterval = 1000 / fps;
    var then = window.performance.now();
    var startTime = then;

    function loop(newtime) {
		if (runGame)
			window.requestAnimationFrame(loop);

		now = newtime;
		elapsed = now - then;
		
		if (elapsed > fpsInterval) {
			then = now - (elapsed % fpsInterval);

			currentScreen.update(elapsed);
			currentScreen.draw(surface);
		
			// fps counter
			var sinceStart = now - startTime;
			var currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;
			var elapsedTime = Math.round(sinceStart / 1000 * 100) / 100;
			var displayText = elapsedTime.toFixed(2) + " secs @ " + currentFps.toFixed(2) + " fps.";
			document.getElementById("fps").innerHTML = displayText;
		}
    }
    loop();
}

var canvasSize = {
	width: 900,
	height: 800
}
canvas = document.querySelector('canvas#board');
canvas.setAttribute('width', canvasSize.width);
canvas.setAttribute('height', canvasSize.height);
surface = canvas.getContext('2d');

var canvasRect = canvas.getBoundingClientRect();

canvas.addEventListener('click', function(e) {
    var x = e.pageX - canvas.offsetLeft;
    var y = e.pageY - canvas.offsetTop;
	
	if (typeof currentScreen.clickable !== 'undefined') {
		for (var i = 0; i < currentScreen.clickable.length; i++) {
			var obj = currentScreen.clickable[i];
			if (obj.posOnObject({x:x, y:y}))
				obj.onClick();
		}
	}
}, false);

canvas.addEventListener('mousemove', function(e) {
	mousePos.x = e.clientX - canvasRect.left;
	mousePos.y = e.clientY - canvasRect.top;
}, false);
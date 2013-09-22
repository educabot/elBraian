$(document).ready(function(){
	
	var host = "ws://localhost:8090/robot";

	var websocket = new WebSocket(host);
	
	var maxConsoleLines = 5;

	function checkCountOrRemove(){
		if ($('.console').find('p').length > maxConsoleLines){
			$('.console ').find('p').first().remove();	
		} 
	}

	function stop(){
		
		checkCountOrRemove();

		$('.console').append($("<p> > Stop</p>"));
		websocket.send("STOP");		
	}

	websocket.onopen = function(evt){
		$('.console').append($("<p> > Initializing...</p>"));
		$('.console').append($("<p> > Browser connected.</p>"));

	};

	websocket.onmessage = function(evt){
		
		checkCountOrRemove();

		$('.console').append($("<p> <server_message> " + evt.data + " </p>"));
		websocket.send("command to move forward");
	};

	//FORWARD
	$('#up').mousedown(function(){
		checkCountOrRemove();
		$('.console').append($("<p> > Moving forward ..</p>"));
		websocket.send("FORWARD");
	});

	$('#up').mouseup(function(){
		stop();
	});

	//FORWARD-LEFT
	$('#up-left').mousedown(function(){
		checkCountOrRemove();
		$('.console').append($("<p> > Turning left ..</p>"));
		websocket.send("command to Turning Left");
	});

	$('#up-left').mouseup(function(){
		stop();
	});

	//FORWARD-RIGHT
	$('#up-right').mousedown(function(){
		checkCountOrRemove();
		$('.console').append($("<p> > Turning right ..</p>"));
		websocket.send("command to Turning Right");
	});

	$('#up-right').mouseup(function(){
		stop();
	});

	//ROTATE-LEFT
	$('#rotate-left').mousedown(function(){
		checkCountOrRemove();
		$('.console').append($("<p> > Rotating left ..</p>"));
		websocket.send("ROTATE-LEFT");
	});

	$('#rotate-left').mouseup(function(){
		stop();
	});

	//ROTATE-RIGHT
	$('#rotate-right').mousedown(function(){		
		checkCountOrRemove();
		$('.console').append($("<p> > Rotating right ..</p>"));
		websocket.send("ROTATE-RIGHT");
	});

	$('#rotate-right').mouseup(function(){
		stop();
	});

	//BACKWARD
	$('#down').mousedown(function(){
		checkCountOrRemove();
		$('.console').append($("<p> > Moving backward ..</p>"));
		websocket.send("BACKWARD");
	});

	$('#down').mouseup(function(){
		stop();
	});


	//BACKWARD-LEFT
	$('#down-left').mousedown(function(){
		
		checkCountOrRemove();
		$('.console').append($("<p> > Turning backward left..</p>"));
		websocket.send("command to Turning backward left ");
	});

	$('#down-left').mouseup(function(){
		stop();
	});

	//BACKWARD-RIGHT
	$('#down-right').mousedown(function(){
		
		checkCountOrRemove();
		$('.console').append($("<p> > Turning backward right..</p>"));
		websocket.send("command to turning backward right");
	});

	$('#down-right').mouseup(function(){
		stop();
	});

});
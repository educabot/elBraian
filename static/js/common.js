$(document).ready(function(){
	var lastkey;
	var host = "ws://"+ document.domain +"/robot";

	console.log("url socket: " + document.domain);

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
		websocket.send("FORWARD-TURNING-LEFT");
	});

	$('#up-left').mouseup(function(){
		stop();
	});

	//FORWARD-RIGHT
	$('#up-right').mousedown(function(){
		checkCountOrRemove();
		$('.console').append($("<p> > Turning right ..</p>"));
		websocket.send("FORWARD-TURNING-RIGHT");
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
		websocket.send("BACKWARD-TURNING-LEFT");
	});

	$('#down-left').mouseup(function(){
		stop();
	});

	//BACKWARD-RIGHT
	$('#down-right').mousedown(function(){
		
		checkCountOrRemove();
		$('.console').append($("<p> > Turning backward right..</p>"));
		websocket.send("BACKWARD-TURNING-RIGHT");
	});

	$('#down-right').mouseup(function(){
		stop();
	});

	//Arrow Control
	$(document).keydown(function(event){
		checkCountOrRemove();
		switch(event.which){
			
			//head
			//a
			case 65:
				$('.console').append($("<p> > Moving head left ..</p>"));
				websocket.send("HEAD-LEFT");
				break;
			//d
			case 68:
				$('.console').append($("<p> > Moving head right ..</p>"));
				websocket.send("HEAD-RIGHT");
				break;
			//w
			case 87:
				$('.console').append($("<p> > Moving head up ..</p>"));			
				websocket.send("HEAD-UP");
				break;
			//s
			case 83:
				$('.console').append($("<p> > Moving head down ..</p>"));			
				websocket.send("HEAD-DOWN");
				break;
			//up
			case 38:
				if(lastkey!=38){
					$('.console').append($("<p> > Moving forward ..</p>"));
					websocket.send("FORWARD");
					lastkey = 38;
				}
				break;
			//down
			case 40:
				if(lastkey!=40){
					$('.console').append($("<p> > Moving BACKWARD ..</p>"));
					websocket.send("BACKWARD");
					lastkey = 40;
				}
				break;
			case 37:
				if(lastkey!=37){
					$('.console').append($("<p> > Rotating Left ..</p>"));
					websocket.send("ROTATE-LEFT");
					lastkey = 37;
				}
				break;
			case 39:
				if(lastkey!=39){
					$('.console').append($("<p> > Rotating right ..</p>"));
					websocket.send("ROTATE-RIGHT");
					lastkey = 39;
				}
				break;

		}
	});

	$(document).keyup(function(event){
		lastkey = 0;
		var key = event.which
		console.log(key)
		if(key!=65 && key!=68 && key!=87 && key!=83){
			stop();
		}
	});


});
$(document).ready(function(){
	var lastkey;
	var host = "ws://"+ document.domain +":9100/robot";

	console.log("url socket: " + document.domain);

	var websocket = new WebSocket(host);
	
	var maxConsoleLines = 5;

	$('#head-horizontal').slider({
		orientation: 'horizontal',
		range: 'min',
		max: 200,
		value: 100,
		step: 20,
		slide: refreshHeadPosition,
		change: refreshHeadPosition
	});

	$('#head-vertical').slider({
		orientation: 'vertical',
		range: 'min',
		max: 200,
		value: 100,
		step: 20,
		slide: refreshHeadPosition,
		change: refreshHeadPosition
	});

	function refreshHeadPosition(){
		var vertical = $('#head-vertical').slider('value');
		var horizontal = $('#head-horizontal').slider('value');
		console.log("position: vertical " + vertical + " horizontal " + horizontal);
	}

	function checkCountOrRemove(){
		if ($('.console').find('p').length > maxConsoleLines){
			$('.console ').find('p').first().remove();	
		} 
	}

	function stop(){
		
		checkCountOrRemove();

		$('.console').append($("<p> > Stop</p>"));
		sendMessage({
			message: "STOP"
		});		
	}

	websocket.onopen = function(evt){
		$('.console').append($("<p> > Initializing...</p>"));
		$('.console').append($("<p> > Browser connected.</p>"));

	};

	websocket.onmessage = function(evt){
		checkCountOrRemove();
		$('.console').append($("<p> <server_message> " + evt.data + " </p>"));
	};

	function sendMessage(msg){
		console.log("sending: " + JSON.stringify(msg));
		websocket.send(JSON.stringify(msg));
	}

	//FORWARD
	$('#up').mousedown(function(){
		checkCountOrRemove();
		$('.console').append($("<p> > Moving forward ..</p>"));
		sendMessage({
						message: "MOVE",
						payload: {
							heading: "FORWARD"
						}

					});
	});

	$('#up').mouseup(function(){
		stop();
	});

	//FORWARD-LEFT
	$('#up-left').mousedown(function(){
		checkCountOrRemove();
		$('.console').append($("<p> > Turning left ..</p>"));
		sendMessage({
			message: "MOVE",
			payload: {
				heading: "FORWARD-TURNING-LEFT" 
			}
		});
	});

	$('#up-left').mouseup(function(){
		stop();
	});

	//FORWARD-RIGHT
	$('#up-right').mousedown(function(){
		checkCountOrRemove();
		$('.console').append($("<p> > Turning right ..</p>"));
		sendMessage({
			message: "MOVE",
			payload: {
				heading: "FORWARD-TURNING-RIGHT"
			}
		});
	});

	$('#up-right').mouseup(function(){
		stop();
	});

	//ROTATE-LEFT
	$('#rotate-left').mousedown(function(){
		checkCountOrRemove();
		$('.console').append($("<p> > Rotating left ..</p>"));
		sendMessage({
			message: "MOVE",
			payload: {
				heading:"ROTATE-LEFT"
			}
		});
	});

	$('#rotate-left').mouseup(function(){
		stop();
	});

	//ROTATE-RIGHT
	$('#rotate-right').mousedown(function(){		
		checkCountOrRemove();
		$('.console').append($("<p> > Rotating right ..</p>"));
		sendMessage({
			message: "MOVE",
			payload: {
				heading: "ROTATE-RIGHT"
			}
		});
	});

	$('#rotate-right').mouseup(function(){
		stop();
	});

	//BACKWARD
	$('#down').mousedown(function(){
		checkCountOrRemove();
		$('.console').append($("<p> > Moving backward ..</p>"));
		sendMessage({
			message: "MOVE",
			payload: {
				heading: "BACKWARD"
			}
		});
	});

	$('#down').mouseup(function(){
		stop();
	});


	//BACKWARD-LEFT
	$('#down-left').mousedown(function(){
		
		checkCountOrRemove();
		$('.console').append($("<p> > Turning backward left..</p>"));
		sendMessage({
			message: "MOVE",
			payload: {
				heading: "BACKWARD-TURNING-LEFT"
			}
		});
	});

	$('#down-left').mouseup(function(){
		stop();
	});

	//BACKWARD-RIGHT
	$('#down-right').mousedown(function(){
		
		checkCountOrRemove();
		$('.console').append($("<p> > Turning backward right..</p>"));
		sendMessage({
			message: "MOVE",
			payload: {
				heading: "BACKWARD-TURNING-RIGHT"
			}
		});
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
				sendMessage({
					message: "HEAD-LEFT"
				});
				break;
			//d
			case 68:
				$('.console').append($("<p> > Moving head right ..</p>"));
				sendMessage({
					message: "HEAD-RIGHT"
				});
				break;
			//w
			case 87:
				$('.console').append($("<p> > Moving head up ..</p>"));	
				sendMessage({
					message: "HEAD-UP"
				});
				break;
			//s
			case 83:
				$('.console').append($("<p> > Moving head down ..</p>"));
				sendMessage({
					message: "HEAD-DOWN"
				});
				break;
			//up
			case 38:
				if(lastkey!=38){
					$('.console').append($("<p> > Moving forward ..</p>"));
					sendMessage({
						message: "MOVE",
						payload: {
							heading: "FORWARD"
						}
					});
					lastkey = 38;
				}
				break;
			//down
			case 40:
				if(lastkey!=40){
					$('.console').append($("<p> > Moving BACKWARD ..</p>"));
					sendMessage({
						message: "MOVE",
						payload : {
							heading: "BACKWARD"
						}
					});
					lastkey = 40;
				}
				break;
			case 37:
				if(lastkey!=37){
					$('.console').append($("<p> > Rotating Left ..</p>"));
					sendMessage({
						message: "MOVE",
						payload: {
							heading : "ROTATE-LEFT"
						}
					});
					lastkey = 37;
				}
				break;
			case 39:
				if(lastkey!=39){
					$('.console').append($("<p> > Rotating right ..</p>"));
					sendMessage({
						message: "MOVE",
						payload: {
							heading: "ROTATE-RIGHT"
						}
					});
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
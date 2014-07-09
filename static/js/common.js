$(document).ready(function(){
	var lastkey;
	var host = "ws://"+ document.domain +"/robot";

	console.log("url socket: " + document.domain);

	var websocket = new WebSocket(host);
	
	var maxConsoleLines = 5;

	$('#head-horizontal').slider({
		orientation: 'horizontal',
		range: 'min',
		max: 200,
		value: 100,
		step: 20,
		slide: refreshHorizontalPosition,
		change: refreshHorizontalPosition
	});

	$('#head-vertical').slider({
		orientation: 'vertical',
		range: 'min',
		max: 200,
		value: 100,
		step: 20,
		slide: refreshVerticalPosition,
		change: refreshVerticalPosition
	});

	function refreshHorizontalPosition(){
		var horizontal = ($('#head-horizontal').slider('value') - 100) * (-1);
		console.log("position:  horizontal " + horizontal);
		sendMessage({
			message: "HEAD-MOVE",
			payload: {
				head_horizontal: horizontal
			}
		});
	}

	function refreshVerticalPosition(){
		var vertical = ($('#head-vertical').slider('value') - 100) * (-1);
		console.log("position: vertical " + vertical );
		sendMessage({
			message: "HEAD-MOVE",
			payload: {
				head_vertical: vertical
			}
		});
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
		var jsonObj = JSON.parse(evt.data);
		checkCountOrRemove();
		$('.console').append($("<p> <server_message> " + evt.data + " </p>"));
		$('#head-vertical').slider({
			value : jsonObj.payload.head_vertical + 100
		});
		$('#head-horizontal').slider({
			value : jsonObj.payload.head_horizontal + 100
		});
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
				var newAngle = ($('#head-horizontal').slider('value') - 100) +20 ;
				sendMessage({
					message: "HEAD-MOVE",
					payload: {
						head_horizontal: newAngle
					}
				});
				$('#head-horizontal').slider({
					value : newAngle + 100
				});
				break;
			//d
			case 68:
				$('.console').append($("<p> > Moving head right ..</p>"));
				var newAngle = ($('#head-horizontal').slider('value') - 100) - 20 ;
				sendMessage({
					message: "HEAD-MOVE",
					payload : {
						head_horizontal : newAngle
					}

				});
				$('#head-horizontal').slider({
					value: newAngle + 100
				});
				break;
			//w
			case 87:
				$('.console').append($("<p> > Moving head up ..</p>"));	
				var newAngle = $('#head-vertical').slider('value') - 100 - 20;
				sendMessage({
					message: "HEAD-MOVE",
					payload : {
						head_vertical: newAngle
					}
				});
				$('#head-vertical').slider({
					value: newAngle + 100
				});
				break;
			//s
			case 83:
				$('.console').append($("<p> > Moving head down ..</p>"));
				var newAngle = $('#head-vertical').slider('value') -100 +20;
				sendMessage({
					message: "HEAD-MOVE",
					payload: {
						head_vertical: newAngle
					}
				});
				$('#head-vertical').slider({
					value: newAngle + 100
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
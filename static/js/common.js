$(document).ready(function(){
	
	var host = "ws://localhost:8000/robot";

	var websocket = new WebSocket(host);
	
	websocket.onopen = function(evt){
		console.log('browser connect');
	};

	websocket.onmessage = function(evt){
		console.log(evt.data);
	};

	$('#forward').mousedown(function(){
		console.log('mousedown forward');
		websocket.send("command to move forward");
	});
	$('#forward').mouseup(function(){
		console.log('mouseup forward');
		websocket.send("command to stop");
	});
});
	var host = "ws://"+ document.domain +"/robot";

	var websocket = new WebSocket(host);

	websocket.onopen = function(evt){
		console.log("connected");
	};

	websocket.onmessage = function(evt){
		//.. do my things
	}

	function sendMessage(msg){
		console.log("sending: " + JSON.stringify(msg));
		websocket.send(JSON.stringify(msg));
	}



{
	message: "MOVE",
	payload: {
		heading: "FORWARD",
		hold: myTime
	}
}

{
	message: "HEAD-MOVE":
	payload: {
		head-horizonal: myAngle,
		head-vertival: MyOtherAngle
	}
}
$(document).ready(function(){

	var host = "ws://"+ document.domain +":9100/robot";

	var websocket = new WebSocket(host);

	websocket.onopen = function(evt){
		console.log("connected");
	};

	websocket.onmessage = function(evt){
		var jsonObj = JSON.parse(evt.data);
		$('#counter h2').remove();
		$('<h2 class="console"></h2>').text(">_  " + jsonObj.payload.client_count)
		.appendTo('#counter');
		console.log("message: " + evt.data);


		if(jsonObj.payload.status == "BLOCKED" || jsonObj.payload.status == "RUNNING"){
			$('#execute').button('loading');
			if (typeof jsonObj.payload.remaining == 'undefined'){
				$('.progress-bar').text('0%');
				$('.progress-bar').css('width', "0%");

			}
		} else {
			$('#execute').button('reset');
		}

		if(typeof jsonObj.payload.remaining !='undefined'){
			var percentage = (100 * (jsonObj.payload.steps - jsonObj.payload.remaining))/ jsonObj.payload.steps;
			$('.progress-bar').css('width', percentage + '%');
			$('.progress-bar').text(percentage + '%')
		}

	};


	function sendMessage(msg){
		console.log("sending: " + JSON.stringify(msg));
		websocket.send(JSON.stringify(msg));
	}


	$('#actions li').draggable({
		appendTo: "body",
		helper: "clone"
	});

	$("#steps").droppable({
		activeClass: "ui-state-default",
      	hoverClass: "ui-state-hover",
      	accept: ":not(.ui-sortable-helper)",
		drop: function(event, ui){
			$(this).find('#placeholder').remove();
			var text = ui.draggable.text();
			$('<li class="list-group-item dismissable"></li>').appendTo(this);
			if(text.indexOf("avanzar")> -1){
				$('<span class="glyphicon glyphicon-arrow-up"></span>').text( ui.draggable.text()).appendTo($('#steps li:last-child'));
			} else if (text.indexOf("parar")> -1){
				$('<span class="glyphicon glyphicon-stop"></span>').text( ui.draggable.text()).appendTo($('#steps li:last-child'));
			} else if (text.indexOf("retroceder")> -1){
				$('<span class="glyphicon glyphicon-arrow-down"></span>').text( ui.draggable.text()).appendTo($('#steps li:last-child'));
			} else if (text.indexOf("rotar derecha")> -1){
				$('<span class="glyphicon glyphicon-chevron-right"></span>').text( ui.draggable.text()).appendTo($('#steps li:last-child'));
			} else if (text.indexOf("rotar izquierda")> -1){
				$('<span class="glyphicon glyphicon-chevron-left"></span>').text( ui.draggable.text()).appendTo($('#steps li:last-child'));
			}
			$('<input type="number" class="input-list">').appendTo($('#steps li:last-child'));
			$('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>').appendTo($('#steps li:last-child'));

		}
	}).sortable({
		placeholder: "ui-state-highlight",
		items: "li:not(.placeholder)",
		sort: function() {
	        $( this ).removeClass( "ui-state-default" );
      }
	});

	$('#execute').click(function(){
		$('#execute').button('loading');
		$('#panel-control .progress').remove();
		$('<div class="progress"><div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div>')
		.appendTo('#panel-control');
		runSteps();		
	});

	function runSteps(){
		var message = {message: "SEQUENCE", payload: {steps: []}};
		var heading;
		$('#steps li').each(function(index){
			var text = $(this).text();
			var timeHold = ($(this).find('input').val()) * 1000;
			console.log(index + text + "holding: "  + timeHold);
			if(text.indexOf("avanzar") > -1 ) {
				heading = "FORWARD";
			} else if(text.indexOf("parar") > -1) {
				heading = "STOP";
			} else if(text.indexOf("rotar derecha") > -1){
				heading = "ROTATE-RIGHT";
			} else if(text.indexOf("ROTATE-LEFT") > -1) {
				heading = "ROTATE-LEFT";
			} else if(text.indexOf("retroceder") > -1) {
				heading = "BACKWARD";
			}

			message.payload.steps.push({
				id: index,
				heading: heading,
				hold: timeHold

			});
		});
		sendMessage(message);
	}
});
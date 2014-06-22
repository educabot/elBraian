$(document).ready(function(){

	var host = "ws://"+ document.domain +":9100/robot";

	var websocket = new WebSocket(host);

	websocket.onopen = function(evt){
		console.log("connected");
	};

	websocket.onmessage = function(evt){
		$('#counter h2').remove();
		$('<h2 class="console"></h2>').text(">_  " + evt.data.substring(9,evt.data.lenght))
		.appendTo('#counter');
		console.log("message: " + evt.data);
	};

	function pausecomp(ms) {
		ms += new Date().getTime();
		while (new Date() < ms){}
	} 


	//Just for testing
	$('#sort1, #sort2' ).sortable({
		connectWith: ".list-group",
		placeholder: "list-group-item.active"
		}).disableSelection();

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
		setInterval(function(){
			$('#execute').button('loading');	
		},1000);		

		runSteps();

		setInterval(function(){
			$('#execute').button('reset');	
		},2000);		
	});

	function runSteps(){
		$('#steps li').each(function(index){
			var text = $(this).text();
			var timeHold = $(this).find('input').val();
			console.log(index + text + "holding: "  + timeHold);
			if(text.indexOf("avanzar") > -1 ) {
				websocket.send("FORWARD");
			} else if(text.indexOf("parar") > -1) {
				websocket.send("STOP");
			} else if(text.indexOf("rotar derecha") > -1){
				websocket.send("ROTATE-RIGHT");
			} else if(text.indexOf("ROTATE-LEFT") > -1) {
				websocket.send("ROTATE-LEFT");
			} else if(text.indexOf("retroceder") > -1) {
				websocket.send("BACKWARD");
			}
			pausecomp(timeHold * 1000);
			websocket.send("STOP");
		});
	}
});
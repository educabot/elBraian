$(document).ready(function(){
	

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
			$('<li class="list-group-item"></li>').appendTo(this);
			if(text.indexOf("avanzar")> -1){
				$('<span class="glyphicon glyphicon-arrow-up"></span>').text( ui.draggable.text()).appendTo($('#steps li:last-child'));
			} else if (text.indexOf("parar")> -1){
				$('<span class="glyphicon glyphicon-stop"></span>').text( ui.draggable.text()).appendTo($('#steps li:last-child'));
			} else if (text.indexOf("retroceder")> -1){
				$('<span class="glyphicon glyphicon-arrow-down"></span>').text( ui.draggable.text()).appendTo($('#steps li:last-child'));
			} else if (text.indexOf("girar derecha")> -1){
				$('<span class="glyphicon glyphicon-chevron-right"></span>').text( ui.draggable.text()).appendTo($('#steps li:last-child'));
			} else if (text.indexOf("girar izquierda")> -1){
				$('<span class="glyphicon glyphicon-chevron-left"></span>').text( ui.draggable.text()).appendTo($('#steps li:last-child'));
			}

		}
	}).sortable({
		placeholder: "ui-state-highlight",
		items: "li:not(.placeholder)",
		sort: function() {
	        $( this ).removeClass( "ui-state-default" );
      }
	});
});
$(document).ready(function() {
  SyntaxHighlighter.all();

  $('#code').on('keydown', function(e) {
    var keyCode = e.keyCode || e.which;

    if (keyCode == 9) {
        e.preventDefault();
        var start = $(this).get(0).selectionStart;
        var end = $(this).get(0).selectionEnd;

        // set textarea value to: text before caret + tab + text after caret
        $(this).val($(this).val().substring(0, start)
            + "    "
            + $(this).val().substring(end));

        // put caret at right position again
        $(this).get(0).selectionStart =
        $(this).get(0).selectionEnd = start + 4;
    }
  });

  if (window.location.hash) {
    $('.nivel').hide();
    $(window.location.hash).show();
  }
  
  if($('#code').val()) {
    $('html,body').animate({ scrollTop: 0 }, 'slow', function () {
    });
  }

  $('#execute').click(function(){
    var code = $('#code').val();
    var jsonData = {
      code: code
    }
    var encoded = $.toJSON(jsonData);
    $.ajax({
        url:"/console",
        type:"POST",
        data: encoded,
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(data){
          alert("Codigo Ejecutado")
        },
        error: function(){
          alert("Fallo la ejecucion")
        }
    });

  });
});
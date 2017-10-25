$(document).ready(function(){
  var socket = io('http://localhost:8991');
  var messages = [];
  socket.on('connect', () => {
    socket.emit('command', 'list');
    socket.on('message', (evt) => {
      addLog(evt);
    });
  });

  $('#send').click(() => {
    var command = $('#command').val();
    console.log(command);
    socket.emit('command', command);
    $('#command').val('');
  });

  function addLog(msg) {
    var pvt;
    try {
      pvt = JSON.parse(msg);//JSON.parse(msg);
    } catch (err){
      console.log('Error parsing');
      pvt = {};
    }

    messages.push(msg);
    if(messages.length > 3){
      messages.shift();
    }
    $('#output').html(messages.join('<br>'));
    if(typeof(pvt.Ports) != 'undefined' && pvt.Ports.length > 0){
      pvt.Ports.forEach(function(i){
        if(typeof(i.Name) != 'undefined' && i.Name != '' ){
          addPort(i.Name);
        }
      });
    }
  }

  function addPort(port) {
    console.log('adding port ' + port);
    $('#ports').append($('<option>',{
      text: port
    }));
  }

});

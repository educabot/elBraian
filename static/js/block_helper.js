$(document).ready(function(){
  var socket = io('ws://localhost:8991');
  //var socket = new WebSocket('ws://localhost:8991');
  socket.on('connect', () => {
    socket.emit('message', 'list');
    socket.on('message', (evt) => {
      console.log(evt);
    });
  });

  $('#send').click(() => {
    var command = $('#command').val();
    console.log(command);
    socket.emit('message', command);
  });

});


var s = document.createElement('script');
var host = 'http://localhost:3000';
document.body.appendChild(s);
s.onload = onload;
s.src = host + '/socket.io/socket.io.js';

function onload() {
  
  var socket = io(host);
  var $win = $(window);

  socket.on('keys', function(data){
    data.forEach(function(key){
      $win.trigger('keydown', key);
    });
  });

  $(window).on('keydown', function(e){
    var intervalStep = 0;
    switch(e.keyCode) {
      case 38:
        intervalStep += 10; break;
      case 40:
        intervalStep -= 10; break;
    }
    if(intervalStep) {
      socket.emit('interval', {interval: intervalStep});
    }
  });

  function remap(value, istart, istop, ostart, ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
  }
  
}

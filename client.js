
var s = document.createElement('script');
var host = 'http://localhost:3000';
document.body.appendChild(s);
s.onload = onload;
s.src = host + '/socket.io/socket.io.js';

// Ideally directly calling `trigger()` is better but thats inside closure.
var keymap = {

  '0,0': 81, // Q
  '0,1': 87, // W
  '0,2': 69, // E
  '0,3': 82, // R
  '0,4': 84, // T
  '0,5': 89, // Y
  '0,6': 85, // U
  '0,7': 73, // I

  '1,0': 79, // O
  '1,1': 80, // P
  '1,2': 65, // A
  '1,3': 83, // S
  '1,4': 68, // D
  '1,5': 70, // F
  '1,6': 71, // G
  '1,7': 72, // H

  '2,0': 74, // J
  '2,1': 75, // K
  '2,2': 76, // L
  '2,3': 90, // Z
  '2,4': 88, // X
  '2,5': 67, // C
  '2,6': 86, // V
  '2,7': 66, // B

  '3,1': 78, // N
  '3,2': 77, // M

  '7,7': 32 // Space
};

function onload() {
  var socket = io(host);
  socket.on('key', function(data){
    $(window).trigger('keydown', keymap[data.x + ',' + data.y]);
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

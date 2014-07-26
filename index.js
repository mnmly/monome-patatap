/**
 * Module dependencies
 */

var http = require('http').createServer();
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var monode = require('monode')();

// Find device
monode.on('device', function(device) {
  
  // On socket is ready
  io.on('connection', function(socket){

    console.log('user connected');

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    
    // when monome key is pressed
    device.on('key', function(x, y, s) {
      device.led(x, y, s);
      // if the key is pressed down, emit the key.  
      if(s === 1) socket.emit('key', {x: x, y: y});
    });
  });
});

/**
 * Listen to port
 */

http.listen(port, function(){
  console.log('App is running at PORT: %s', port);
});

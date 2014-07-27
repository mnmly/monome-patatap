/**
 * Module dependencies
 */

var http = require('http').createServer();
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var monode = require('monode')();
var Monome = require('./lib/monome');

// Find device
monode.on('device', function(device) {

  // On socket is ready
  io.on('connection', function(socket){

    var monome = new Monome();
    var interval = 300;

    monome.set(0);

    console.log('user connected');

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    var sequence = setTimeout(step, interval);
    var count = 0;
    var step = function() {
      var _x = count % 8;
      monome.render(device, _x);
      monome.emit(socket, _x);
      count++;
      clearTimeout(sequence);
      sequence = setTimeout(step, interval);
    };

    step();

    socket.on('interval', function(d){
      interval += d.interval;
      clearTimeout(sequence);
      console.log(interval);
      step();
    });
    

    // when monome key is pressed
    device.on('key', function(x, y, s) {
      if(s === 1) {
        var cell = monome.get(x, y);
        cell.toggle(); 
      }
    });
    
    
  });
});

/**
 * Listen to port
 */

http.listen(port, function(){
  console.log('App is running at PORT: %s', port);
});

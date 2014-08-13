/**
 * Module dependencies
 */

var monode = require('monode')();
var host = process.env.SOCKET_HOST || 'http://localhost:3000';
var debug = require('debug')('patatap-monome:proxy');
var client = require('socket.io-client');
var Sequencer = require('sequencer');
var socket;

debug('host: %s', host);

monode.on('device', function(device) {
  debug('device found');

  var sequencer = new Sequencer(device);
  var defaultInterval = sequencer.interval;

  socket = client(host, {transports: ['websocket']});
  socket.on('connect', function(){
    debug('socket connected');

    sequencer.setSocket(socket);

    device.on('key', function(x, y, s){
      sequencer.set(x, y, s);
    });

    device.on('tilt', function(n, x, y, z){
      var min = 87;
      var max = 170;
      var ratio = (x - min) / (max - min);
      var interval = defaultInterval + (step(ratio, 0, 1, 10) - 0.5) * 300;
      var changed = sequencer.setInterval(interval);
      changed && sequencer.step();
    });

    sequencer.step();
  });
});

function remap(value, istart, istop, ostart, ostop) {
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

function step(v, min, max, steps){
  var range = (max - min) / steps;
  for(var i = steps; i > 0; i--) {
    if (range * (i - 1) <= v && v < range * i) {
      return min + (max - min) * range * (i - 1);
    }
  }
  return 0;
}

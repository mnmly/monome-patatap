var keys = require('./keys');
var tones = keys.tones;
var SPACE = keys.SPACE;
var Monome = require('monome');
var debug = require('debug')('patatap-monome:sequencer');

module.exports = Sequencer;

function Sequencer(device) {
  
  var self = this;

  this.bucket = 0;
  this.buckets = [0, 1, 2, 3];
  this.count = 0;
  this.interval = 300;
  this.monomeList = this._createMonomeList(device);
  this.monome = this.getCurrent();

  this.step = this.step.bind(this);
}


Sequencer.prototype._createMonomeList = function(device) {
  var self = this;
  return this.buckets.map(function(i) {
    var monome = new Monome(device);
    monome.cells.forEach(function(cell) {
      if(!cell.y) {
        if (cell.x === self.bucket) cell.toggle();
      } else {
        cell.tone = tones[(cell.y + i * 7) % tones.length];
      }
    });
    return monome;
  });
};

Sequencer.prototype.set = function(x, y, s) {
  var self = this;

  if(!y && x === 4) {
    s && this.changeTheme();
    this.monomeList.forEach(function(monome, i) {
      monome.get(x, 0).toggle(s);
    });
  }


  if (!s) return;

  if (!y) {

    this.monomeList.forEach(function(monome, i) {
      if (x < 4) {
        if (x !== self.bucket) {
          monome.get(self.bucket, 0).toggle();
          monome.get(x, 0).toggle();
        }
      }
    });

    if(x < 4) {
      self.setBucket(x);
    }
  } else {
    this.monome.get(x, y).toggle();
  }
};

Sequencer.prototype.setInterval = function(ms) {
  if(this.interval !== ms) {
    this.interval = ms;
    debug('interval changed', ms);
    clearTimeout(this.stepTimeout);
    return true;
  } else {
    return false;
  }
};

Sequencer.prototype.highlightColumn = function(x) {
  this.monome.render(x);
};

Sequencer.prototype.emitColumn = function(x) {
  this.monome.cells.forEach(function() {
    
  });
};

Sequencer.prototype.getCurrent = function() {
  return this.monomeList[this.bucket];
};

Sequencer.prototype.setBucket = function(i) {
  this.bucket = i;
  this.monome = this.getCurrent();
};

Sequencer.prototype.step = function() {
  var _x = this.count % 8;
  this.render(_x);
  this.emit(_x);
  this.count++;
  this.stepTimeout = setTimeout(this.step, this.interval);
};

Sequencer.prototype.render = function(x) {
  var self = this;
  var device = this.monome.device;
  this.monome.cells.forEach(function(cell, i){
    if(cell.y) {
      cell.render(device, x);
    } else {
      cell.render(device);
    }
  });
};

Sequencer.prototype.emit = function(x) {
  if(this.keepOtherPanels) {
    
  } else {

    var keys = [];

    this.monome.cells.forEach(function(cell, i){
      if(cell.y && cell.x === x && cell._on) {
        keys.push(cell.tone);
      }
    });

    if(keys.length) this._socket.emit('keys', keys);
  }
};

Sequencer.prototype.setSocket = function(s){ 
  this._socket = s;
};

Sequencer.prototype.changeTheme = function() {
  this._socket.emit('keys', [SPACE]);
};

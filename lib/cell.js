module.exports = Cell;

function Cell(x, y) {
  this.x = x;
  this.y = y;
  this.emitX = x;
  this.emitY = y;
  this._on = false;
}

Cell.prototype.on = function() {
  this._on = true;
};

Cell.prototype.off = function() {
  this._on = false;
};

Cell.prototype.toggle = function() {
  this._on = !this._on;
};

Cell.prototype.render = function(device, x) {
  var flag = this.x === x || this._on;
  device.led(this.x, this.y, flag);
};

Cell.prototype.emit = function(socket) {
  if(this._on) {
    socket.emit('key', {x: this.emitX, y: this.emitY});
  }
};

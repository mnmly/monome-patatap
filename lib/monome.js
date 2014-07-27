var Cell = require('./cell');

module.exports = Monome;

function Monome() {

  this.cells = [];

  for(var y = 0; y < 8; y++) {
    for(var x = 0; x < 8; x++) {
      this.cells.push(new Cell(x, y));
    }
  }
}

Monome.prototype.set = function(x) {
  this.cells.forEach(function(cell){
    cell.emitX = x;
  });
};

Monome.prototype.render = function(device, x) {
  this.cells.forEach(function(cell){
    cell.render(device, x);
  });
};

Monome.prototype.emit = function(socket, x) {
  this.cells.forEach(function(cell){
    if (cell.x === x) {
      cell.emit(socket);
    }
  });
};

Monome.prototype.get = function(x, y) {
  return this.cells[x + 8 * y];
};

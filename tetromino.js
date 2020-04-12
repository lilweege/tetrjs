class Tetromino {
  constructor(piece) {
    this.piece = piece;
	this.color = colors[piece];
    this.x = 4;
    this.y = 0;
    this.blocks = [];
    this.rot = 0;
	this.rotate(0);
  }

  tryPlace(x, y) {
    for (let block of this.blocks) {
      let nx = x + block.x;
      let ny = y + block.y;
      if (ny > h - 1 || board[nx][ny]) {
        place();
        return true;
      }
    }
    return false;
  }

  isWall(x, y) {
    for (let block of this.blocks) {
      let nx = x + block.x;
      let ny = y + block.y;
      if (nx < 0 || nx >= w || board[nx][ny]) return true;
    }
    return false;
  }

  hardDrop() {
    while (!this.tryPlace(this.x, this.y + 1)) this.y++;
  }

  drop() {
    if (!this.tryPlace(this.x, this.y + 1)) this.y++;
  }

  move(dx) {
    if (!this.isWall(this.x + dx, this.y)) this.x += dx;
  }

  draw() {
    fill(this.color.r, this.color.g, this.color.b);
    for (let block of this.blocks) {
      rect((this.x + block.x) * scl, (this.y + block.y) * scl, scl, scl);
    }
  }

  rotate(dir) {
    let pr = this.rot;
    let pb = this.blocks;
    this.rot = ((this.rot + dir) % 4 + 4) % 4
	this.blocks = blocks[this.piece][this.rot];
    if (this.isWall(this.x, this.y)) {
      this.rot = pr;
      this.blocks = pb;
    }
  }
}
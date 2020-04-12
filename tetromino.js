class Tetromino {
  constructor(piece) {
    this.piece = piece;

    switch (this.piece) {
      case 0:
        this.color = [0, 255, 255];
        break;
      case 1:
        this.color = [255, 255, 0];
        break;
      case 2:
        this.color = [255, 0, 255];
        break;
      case 3:
        this.color = [0, 0, 255];
        break;
      case 4:
        this.color = [255, 127, 0];
        break;
      case 5:
        this.color = [0, 255, 0];
        break;
      case 6:
        this.color = [255, 0, 0];
        break;
    }

    this.x = 4;
    this.y = 0;
    this.blocks = [];
    this.rot = 0;
    this.rotate(0);
  }

  tryPlace(x, y) {
    for (let block of this.blocks) {
      let nx = x + block[0];
      let ny = y + block[1];
      if (ny > h - 1 || board[nx][ny]) {
        place();
        return true;
      }
    }
    return false;
  }

  isWall(x, y) {
    for (let block of this.blocks) {
      let nx = x + block[0];
      let ny = y + block[1];
      if (nx < 0 || nx >= w || board[nx][ny]) {
        return true;
      }
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
    fill(this.color[0], this.color[1], this.color[2]);
    for (let block of this.blocks) {
      rect((this.x + block[0]) * scl, (this.y + block[1]) * scl, scl, scl);
    }
  }

  rotate(dir) {
    let pr = this.rot;
    let pb = this.blocks;
    this.rot = ((this.rot + dir) % 4 + 4) % 4

    switch (this.piece) {
      case 0:
        if (this.rot == 0) {
          this.blocks = [
            [-1, 0],
            [0, 0],
            [1, 0],
            [2, 0]
          ];
        } else if (this.rot == 1) {
          this.blocks = [
            [1, -1],
            [1, 0],
            [1, 1],
            [1, 2]
          ];
        } else if (this.rot == 2) {
          this.blocks = [
            [-1, 1],
            [0, 1],
            [1, 1],
            [2, 1]
          ];
        } else if (this.rot == 3) {
          this.blocks = [
            [0, -1],
            [0, 0],
            [0, 1],
            [0, 2]
          ];
        }
        break;
      case 1:
        this.blocks = [
          [0, 0],
          [1, 0],
          [0, 1],
          [1, 1]
        ];
        break;
      case 2:
        if (this.rot == 0) {
          this.blocks = [
            [0, 0],
            [1, 0],
            [-1, 0],
            [0, -1]
          ];
        } else if (this.rot == 1) {
          this.blocks = [
            [0, 0],
            [1, 0],
            [0, 1],
            [0, -1]
          ];
        } else if (this.rot == 2) {
          this.blocks = [
            [0, 0],
            [1, 0],
            [-1, 0],
            [0, 1]
          ];
        } else if (this.rot == 3) {
          this.blocks = [
            [0, 0],
            [0, 1],
            [-1, 0],
            [0, -1]
          ];
        }
        break;
      case 3:
        if (this.rot == 0) {
          this.blocks = [
            [0, 0],
            [1, 0],
            [-1, 0],
            [-1, -1]
          ];
        } else if (this.rot == 1) {
          this.blocks = [
            [0, 0],
            [0, 1],
            [0, -1],
            [1, -1]
          ];
        } else if (this.rot == 2) {
          this.blocks = [
            [0, 0],
            [1, 0],
            [-1, 0],
            [1, 1]
          ];
        } else if (this.rot == 3) {
          this.blocks = [
            [0, 0],
            [0, 1],
            [0, -1],
            [-1, 1]
          ];
        }
        break;
      case 4:
        if (this.rot == 0) {
          this.blocks = [
            [0, 0],
            [1, 0],
            [-1, 0],
            [1, -1]
          ];
        } else if (this.rot == 1) {
          this.blocks = [
            [0, 0],
            [0, 1],
            [0, -1],
            [1, 1]
          ];
        } else if (this.rot == 2) {
          this.blocks = [
            [0, 0],
            [1, 0],
            [-1, 0],
            [-1, 1]
          ];
        } else if (this.rot == 3) {
          this.blocks = [
            [0, 0],
            [0, 1],
            [0, -1],
            [-1, -1]
          ];
        }
        break;
      case 5:
        if (this.rot == 0) {
          this.blocks = [
            [0, 0],
            [-1, 0],
            [0, -1],
            [1, -1]
          ];
        } else if (this.rot == 1) {
          this.blocks = [
            [0, 0],
            [1, 0],
            [0, -1],
            [1, 1]
          ];
        } else if (this.rot == 2) {
          this.blocks = [
            [0, 0],
            [-1, 1],
            [0, 1],
            [1, 0]
          ];
        } else if (this.rot == 3) {
          this.blocks = [
            [0, 0],
            [-1, 0],
            [-1, -1],
            [0, 1]
          ];
        }
        break;
      case 6:
        if (this.rot == 0) {
          this.blocks = [
            [0, 0],
            [0, -1],
            [-1, -1],
            [1, 0]
          ];
        } else if (this.rot == 1) {
          this.blocks = [
            [0, 0],
            [1, 0],
            [1, -1],
            [0, 1]
          ];
        } else if (this.rot == 2) {
          this.blocks = [
            [0, 1],
            [0, 0],
            [-1, 0],
            [1, 1]
          ];
        } else if (this.rot == 3) {
          this.blocks = [
            [-1, 0],
            [0, 0],
            [0, -1],
            [-1, 1]
          ];
        }
        break;
    }
    if (this.isWall(this.x, this.y)) {
      this.rot = pr;
      this.blocks = pb;
    }
  }
}
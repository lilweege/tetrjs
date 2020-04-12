class Tetromino {
  constructor(piece) {
    this.piece = piece;
    this.x = 4;
    this.y = -1;
    this.rot = 0;
    this.blocks = [];
    // this.rotate(0);
  }

  isWall(x, y) {
    return false;
    for (let block in this.blocks) {
      let nx = x + block[0];
      let ny = y + block[1];
      if (nx < 0 || nx >= w) {
        return true;
      }
    }
    return false;
  }

  move(dx, dy) {
    if (!this.isWall(this.x + dx, this.y + dy)) {
      this.x += dx;
      this.y += dy;
    }
  }

  draw() {
    switch (this.piece) {
      case 0:
        fill(0, 255, 255);
        break;
      case 1:
        fill(255, 255, 0);
        break;
      case 2:
        fill(255, 0, 255);
        break;
      case 3:
        fill(0, 0, 255);
        break;
      case 4:
        fill(255, 127, 0);
        break;
      case 5:
        fill(0, 255, 0);
        break;
      case 6:
        fill(255, 0, 0);
        break;
    }
    for (let block of this.blocks) {
      rect((this.x + block[0]) * scl, (this.y + block[1]) * scl, scl, scl);
    }
  }

  rotate(dir) {
    let pr = this.rot;
    let pb = this.blocks;
    this.rot += dir;
    this.rot %= 4;

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
  }
}
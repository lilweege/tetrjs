let currentPiece = new Tetromino(2); // IOTJLSZ
let paused = false;
function setup() {
  createCanvas(w * scl, h * scl);
}

function draw() {
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      if (board[i][j]) fill(board[i][j][0], board[i][j][1], board[i][j][2]);
      else fill(255);
      rect(i * scl, j * scl, scl, scl);
    }
  }
  if (frameCount % 30 == 0) currentPiece.drop();
  currentPiece.draw();
}

function place() {
  for (let block of currentPiece.blocks) {
    board[currentPiece.x + block[0]][currentPiece.y + block[1]] = currentPiece.color;
  }
  currentPiece = new Tetromino(floor(random(0, 7)));
  clearLines();
}

function clearLines() {
  let toClear = [];
  for (let j = 0; j < h; j++) {
    let blocks = 0;
    for (let i = 0; i < w; i++) {
      if (board[i][j]) blocks++;
    }
    if (blocks == w) toClear.push(j);
  }
  
  for (let line of toClear) {
    for (let i = 0; i < w; i++) {
      board[i][line] = false;
    }
  }
  
  for (let line of toClear) {
    for (let j = line; j > 0; j--) {
      for (let i = 0; i < w; i++) {
        board[i][j] = board[i][j - 1];
      }
    }
  }
}

function keyPressed() {
  if (keyCode == ESCAPE) {
    if (paused) loop();
    else noLoop();
    paused = !paused;
  }
  else {
    if (keyCode == 32/*SPACE*/) currentPiece.hardDrop();
    else if (keyCode == 16/*SHIFT*/) currentPiece.rotate(-1);
    else if (keyCode == UP_ARROW) currentPiece.rotate(1);
    else if (keyCode == DOWN_ARROW) currentPiece.drop();
    else if (keyCode == RIGHT_ARROW) currentPiece.move(1);
    else if (keyCode == LEFT_ARROW) currentPiece.move(-1);
  }
}
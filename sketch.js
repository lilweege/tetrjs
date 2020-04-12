let currentPiece = new Tetromino(2); // IOTJLSZ
function setup() {
  createCanvas(w * scl, h * scl);
}

function draw() {
  fill(255);
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      rect(i * scl, j * scl, scl, scl);
    }
  }
  currentPiece.draw();
  if (currentPiece.placed) currentPiece = new Tetromino(2);
  if (frameCount % floor(30 / speed) == 0) currentPiece.move(0, 1);
}

function keyPressed() {
  if (keyCode == 32/*SPACE*/) currentPiece = new Tetromino(2);
  if (keyCode == UP_ARROW) currentPiece.rotate(1);
  if (keyCode == DOWN_ARROW) currentPiece.move(0, 1);
  if (keyCode == RIGHT_ARROW) currentPiece.move(1, 0);
  if (keyCode == LEFT_ARROW) currentPiece.move(-1, 0);
}
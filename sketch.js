function setup() {
	createCanvas(w * scl, h * scl);
	resetGame();
}

function draw() {
	for (let i = 0; i < w; i++) {
		for (let j = 0; j < h; j++) {
			board[i][j] ? fill(board[i][j].r, board[i][j].g, board[i][j].b) : fill(255);
			rect(i * scl, j * scl, scl, scl);
		}
	}
	if (frameCount % rate == 0)
		currentPiece.drop();
	currentPiece.draw();
}

function place() {
	for (let block of currentPiece.blocks)
		board[currentPiece.x + block.x][currentPiece.y + block.y] = currentPiece.color;
	if (queuedPieces.length == 0)
		queuedPieces = queuePieces();
	currentPiece = queuedPieces.shift();
	currentPiece.init();
	clearLines();
}

// IOTJLSZ
function queuePieces() {
	q = [];
	for (let i = 0; i < 7; i++)
		q.push(new Tetromino(i));
	return shuff(q);
}

function shuff(a) {
	return a.map((a) => ({sort: Math.random(), value: a})).sort((a, b) => a.sort - b.sort).map((a) => a.value);
}

function clearLines() {
	// determine which lines to clear
	let toClear = [];
	for (let j = 0; j < h; j++) {
		let blocks = 0;
		for (let i = 0; i < w; i++) {
			if (board[i][j]) blocks++;
		}
		if (blocks == w) toClear.push(j);
	}

	// remove lines
	for (let line of toClear)
		for (let i = 0; i < w; i++)
			board[i][line] = false;

	// shift down
	for (let line of toClear)
		for (let j = line; j > 0; j--)
			for (let i = 0; i < w; i++)
				board[i][j] = board[i][j - 1];
}

function resetGame() {
	for (let i = 0; i < w; i++)
		for (let j = 0; j < h; j++)
			board[i][j] = false;
	queuedPieces = queuePieces();
	currentPiece = queuedPieces.shift();
	currentPiece.init();
	frameCount = 0;
	if (paused) pauseGame();
}

function pauseGame() {
	paused ? loop() : noLoop();
	paused = !paused;
}

// To-do: DAS
function keyPressed() {
	if (keyCode == 80/*p*/) pauseGame();
	else if (keyCode == 82/*r*/) resetGame();
	else if (!paused) {
		if (keyCode == 32/*SPACE*/) currentPiece.hardDrop();
		else if (keyCode == 16/*SHIFT*/) currentPiece.rotate(-1);
		else if (keyCode == UP_ARROW) currentPiece.rotate(1);
		else if (keyCode == DOWN_ARROW) currentPiece.drop();
		else if (keyCode == RIGHT_ARROW) currentPiece.move(1);
		else if (keyCode == LEFT_ARROW) currentPiece.move(-1);
	}
}

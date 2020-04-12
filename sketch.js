function setup() {
	createCanvas(w * scl, h * scl);
	resetGame();
}

function draw() {
	drawGrid();
	updateGame();
	currentPiece.draw();
}

function drawGrid() {
	for (let i = 0; i < w; i++) {
		for (let j = 0; j < h; j++) {
			board[i][j] ? fill(board[i][j].r, board[i][j].g, board[i][j].b) : fill(255);
			rect(i * scl, j * scl, scl, scl);
		}
	}
}

function updateGame() {
	if (keys.l != keys.r) {
		if (dasCnt > das && dasCnt % arr == 0) {
			if (keys.l) currentPiece.move(-1);
			else if (keys.r) currentPiece.move(1);
		}
		dasCnt++;
	}
	else dasCnt = 0;

	if (frameCount % rate == 0)
		currentPiece.drop();
	else if (keys.d) {
		if (drpCnt > das && drpCnt % arr == 0) {
			currentPiece.drop();
		}
		drpCnt++;
	}
	else drpCnt = 0;
}

function place() {
	for (let block of currentPiece.blocks)
		board[currentPiece.x + block.x][currentPiece.y + block.y] = currentPiece.color;
	clearLines();

	if (queuedPieces.length == 0)
		queuedPieces = queuePieces();
	currentPiece = queuedPieces.shift();
	currentPiece.init();
}

function queuePieces() {
	q = [];
	for (let i = 0; i < 7; i++)
		q.push(new Tetromino(i));
	return shuff(q);
}

function shuff(arr) {
	return arr.map((a) => ({sort: Math.random(), value: a})).sort((a, b) => a.sort - b.sort).map((a) => a.value);
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
	if (paused) {
		keys.d = false;
		keys.l = false;
		keys.r = false;
	}
}
function holdPiece() {
	return;
}

function keyPressed() {
	if (keyCode == 80/*p*/) pauseGame();
	else if (keyCode == 82/*r*/) resetGame();
	else if (!paused) {
		if (keyCode == 32/*SPACE*/) currentPiece.hardDrop();
		else if (keyCode == 90/*z*/) currentPiece.rotate(-1);
		else if (keyCode == 88/*x*/) currentPiece.rotate( 1);
		else if (keyCode == UP_ARROW) currentPiece.rotate( 1);
		else if (keyCode == 67/*c*/) holdPiece();
		// DAS keys
		switch (keyCode) {
			case DOWN_ARROW:
				keys.d = true;
				currentPiece.drop();
				break;
			case LEFT_ARROW:
				keys.l = true;
				currentPiece.move(-1);
				break;
			case RIGHT_ARROW:
				keys.r = true;
				currentPiece.move( 1);
				break;
		}
	}
}

function keyReleased() {
	switch (keyCode) {
		case DOWN_ARROW: keys.d = false; break;
		case LEFT_ARROW: keys.l = false; break;
		case RIGHT_ARROW: keys.r = false; break;
	}
}

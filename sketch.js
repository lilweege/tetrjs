function setup() {
	createCanvas(w * scl + s * scl, h * scl);
	resetGame();
}

function draw() {
	updateGame();
	drawUI();
	drawGrid();
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

function drawUI() {
	fill(255);
	rect(w * scl, 0, s * scl, s * scl);
	nextPiece.draw(true);

	fill(255);
	rect(w * scl, s * scl, s * scl, s * scl);
	if (holdingPiece) holdingPiece.draw(true);

	fill(255);
	rect(w * scl, 2 * s * scl, s * scl, (h - 2 * s) * scl);
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

	if (keys.d) {
		if (drpCnt > das && drpCnt % arr == 0) {
			currentPiece.drop();
		}
		drpCnt++;
	}
	else if (frameCount % rate == 0)
		currentPiece.drop();
	else drpCnt = 0;
}

function place() {
	if (checkLose()) resetGame();
	else {
		for (let block of currentPiece.blocks)
			board[currentPiece.x + block.x][currentPiece.y + block.y] = currentPiece.color;
		clearLines();
		getNextPiece();
	}
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

function checkLose() {
	for (let block of currentPiece.blocks)
		if (currentPiece.y + block.y <= 1)
			return true;
}

function getNextPiece() {
	currentPiece = queuedPieces.shift();
	currentPiece.init();
	if (queuedPieces.length == 0)
		queuedPieces = queuePieces();
	nextPiece = queuedPieces[0];
	nextPiece.init();
	nextPiece.x = w + 1;
	nextPiece.y = 1;
}

function resetGame() {
	for (let i = 0; i < w; i++)
		for (let j = 0; j < h; j++)
			board[i][j] = false;

	queuedPieces = queuePieces();
	getNextPiece();
	holdingPiece = null;

	frameCount = 0;
	if (paused) pauseGame();
}

function pauseGame() {
	if (!paused) {
		noLoop();
		paused = true;
		keys.d = false;
		keys.l = false;
		keys.r = false;
	}
	else {
		loop();
		paused = false;
	}
}

function holdPiece() {
	if (!holdingPiece) {
		holdingPiece = currentPiece;
		getNextPiece();
	}
	else {
		let t = currentPiece;
		currentPiece = holdingPiece;
		holdingPiece = t;
		currentPiece.init();
	}
	holdingPiece.rotate(-holdingPiece.rot);
	holdingPiece.x = w + 1;
	holdingPiece.y = s + 1;
}

function keyPressed() {
	if (keyCode == 80/*p*/) pauseGame();
	else if (keyCode == ESCAPE) pauseGame();
	else if (keyCode == 82/*r*/) resetGame();
	else if (!paused) {
		if (keyCode == 32/*SPACE*/) currentPiece.hardDrop();
		else if (keyCode == 90/*z*/) currentPiece.rotate(-1);
		else if (keyCode == 88/*x*/) currentPiece.rotate( 1);
		else if (keyCode == UP_ARROW) currentPiece.rotate(1);
		else if (keyCode == 67/*c*/) holdPiece();
		else {
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
}

function keyReleased() {
	switch (keyCode) {
		case DOWN_ARROW: keys.d = false; break;
		case LEFT_ARROW: keys.l = false; break;
		case RIGHT_ARROW: keys.r = false; break;
	}
}

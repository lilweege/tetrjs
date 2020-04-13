class Tetromino {
	constructor(piece) {
		this.piece = piece;
		this.color = colors[piece];
		this.rot = 0;
	}

	init() {
		this.x = 4;
		this.y = 0;
		this.rotate(0);
		this.move(0);
	}

	tryPlace(x, y, g) {
		for (let block of this.blocks) {
			let nx = x + block.x;
			let ny = y + block.y;
			if (ny > h - 1 || board[nx][ny]) {
				if (!g) place();
				return true;
			}
		}
		return false;
	}

	isWall(x, y) {
		for (let block of this.blocks) {
			let nx = x + block.x;
			let ny = y + block.y;
			if (nx < 0 || nx >= w || ny > h - 1 || board[nx][ny]) return true;
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
		if (!this.isWall(this.x + dx, this.y)) {
			this.x += dx;
			this.updateGhost();
		}
	}

	draw(ng) {
		fill(this.color.r, this.color.g, this.color.b);
		for (let block of this.blocks)
			rect((this.x + block.x) * scl, (this.y + block.y) * scl, scl, scl);
		if (!ng) this.drawGhost();
	}

	updateGhost() {
		this.gy = this.y;
		while (!this.tryPlace(this.x, this.gy + 1, true)) this.gy++;
	}

	drawGhost() {
		fill(this.color.r, this.color.g, this.color.b, 127);
		for (let block of this.blocks)
			rect((this.x + block.x) * scl, (this.gy + block.y) * scl, scl, scl);
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
		else this.updateGhost();
	}
}

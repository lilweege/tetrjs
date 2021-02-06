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

	hardDrop() {
		while (!this.tryPlace(this.x, this.y + 1)) this.y++;
	}

	drop() {
		if (!this.tryPlace(this.x, this.y + 1)) this.y++;
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

	move(dx) {
		let nx = this.x + dx;
		let hitWall = false;
		for (let block of this.blocks) {
			let bx = nx + block.x;
			let by = this.y + block.y;
			if (bx < 0 || bx >= w || by >= h || board[bx][by]) {
				hitWall = true;
				break;
			}
		}
		
		if (!hitWall) {
			this.x = nx;
			this.updateGhost();
		}
	}

	// TODO: make this method not suck
	rotate(dr) {
		let m = blocks[this.piece].length;
		let nr = ((this.rot + dr) % m + m) % m;
		let nb = blocks[this.piece][nr];
		
		let hitWall = false;
		
		let hitLeft = false;
		let hitRite = false;
		let hitBott = false;
		
		let collisions = [];
		
		for (let block of nb) {
			let bx = this.x + block.x;
			let by = this.y + block.y;
			
			if (bx < 0)
				hitLeft = true;
			if (bx >= w)
				hitRite = true;
			if (by >= h)
				hitBott = true;
			
			if (bx < 0 || bx >= w || by >= h || board[bx][by]) {
				hitWall = true;
				collisions.push({x: bx, y: by});
			}
		}
		
		// WALL KICK
		// this sucks lol
		// all of these are pretty much the same,
		// I may or may not refactor this later
		
		let failedWallKick = false;
		let tx, ty;
		
		let collideLeft = false;
		let collideRite = false;
		for (let collision of collisions) {
			if (collision.x > this.x) collideRite = true;
			if (collision.x < this.x) collideLeft = true;
		}
		if (collideLeft && collideRite) return;
		
		
		if (collideLeft) {
			tx = this.x;
			ty = this.y;
			let colliding = true;
			while (colliding) {
				++tx;
				colliding = false;
				for (let block of nb) {
					let bx = tx + block.x;
					let by = ty + block.y;
					for (let collision of collisions) {
						if (bx == collision.x &&
							by == collision.y) {
							colliding = true;
							break;
						}
					}
					if (!colliding && bx < w && by <= h - 1 && board[bx][by]) {
						failedWallKick = true;
						colliding = true;
					}
					if (colliding)
						break;
				}
			}
			if (!failedWallKick) {
				this.x = tx;
				hitWall = false;
			}
		}
		else if (collideRite) {
			tx = this.x;
			ty = this.y;
			let colliding = true;
			while (colliding) {
				--tx;
				colliding = false;
				for (let block of nb) {
					let bx = tx + block.x;
					let by = ty + block.y;
					for (let collision of collisions) {
						if (bx == collision.x &&
							by == collision.y) {
							colliding = true;
							break;
						}
					}
					if (!colliding && bx >= 0 && by <= h - 1 && board[bx][by]) {
						failedWallKick = true;
						colliding = true;
					}
					if (colliding)
						break;
				}
			}
			if (!failedWallKick) {
				this.x = tx;
				hitWall = false;
			}
		}
		
		// left edge
		if (hitLeft) {
			tx = this.x;
			ty = this.y;
			let inWall = true;
			while (inWall) {
				++tx;
				inWall = false;
				for (let block of nb) {
					let bx = tx + block.x;
					let by = ty + block.y;
					if (bx < 0) {
						inWall = true;
					}
					if (bx >= 0 && by <= h - 1 && board[bx][by]) {
						failedWallKick = true;
						inWall = true;
						break;
					}
				}
			}
			if (!failedWallKick) {
				this.x = tx;
				hitWall = false;
			}
		}
		// right edge
		if (hitRite) {
			tx = this.x;
			ty = this.y;
			let inWall = true;
			while (inWall) {
				--tx;
				inWall = false;
				for (let block of nb) {
					let bx = tx + block.x;
					let by = ty + block.y;
					if (bx >= w) {
						inWall = true;
					}
					if (bx < w && by <= h - 1 && board[bx][by]) {
						failedWallKick = true;
						inWall = true;
						break;
					}
				}
			}
			if (!failedWallKick) {
				this.x = tx;
				hitWall = false;
			}
		}
		// bottom edge
		if (hitBott) {
			tx = this.x;
			ty = this.y;
			let inWall = true;
			while (inWall) {
				--ty;
				inWall = false;
				for (let block of nb) {
					let bx = tx + block.x;
					let by = ty + block.y;
					if (by >= h) {
						inWall = true;
					}
					if (by <= h - 1 && board[bx][by]) {
						failedWallKick = true;
						inWall = true;
						break;
					}
				}
			}
			if (!failedWallKick) {
				this.y = ty;
				hitWall = false;
			}
		}
		
		
		if (!hitWall) {
			this.rot = nr;
			this.blocks = nb;
			this.updateGhost();
		}
	}
}

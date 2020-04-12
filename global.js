const scl = 20;
const w = 10;
const h = 20;
let board = [...Array(w)].map(e => new Array(h));
for (let i = 0; i < w; i++)
  for (let j = 0; j < h; j++)
    board[i][j] = false;
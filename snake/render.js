function draw() {
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#111';
  for (var x = 0; x <= COLS; x++) {
    ctx.beginPath(); ctx.moveTo(x * GRID, 0); ctx.lineTo(x * GRID, canvas.height); ctx.stroke();
  }
  for (var y = 0; y <= ROWS; y++) {
    ctx.beginPath(); ctx.moveTo(0, y * GRID); ctx.lineTo(canvas.width, y * GRID); ctx.stroke();
  }

  snake.forEach(function (s, i) {
    var brightness = Math.max(80, 255 - i * 8);
    ctx.fillStyle = i === 0 ? '#33ff33' : 'rgb(0, ' + brightness + ', 0)';
    ctx.fillRect(s.x * GRID + 1, s.y * GRID + 1, GRID - 2, GRID - 2);
  });

  ctx.fillStyle = '#ff3333';
  ctx.shadowColor = '#ff3333';
  ctx.shadowBlur = 8;
  ctx.fillRect(food.x * GRID + 2, food.y * GRID + 2, GRID - 4, GRID - 4);
  ctx.shadowBlur = 0;

  if (gameOver) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ff3333';
    ctx.font = 'bold 36px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
  }
}

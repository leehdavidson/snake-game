document.addEventListener('keydown', function (e) {
  var arrows = {
    ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 }
  };

  if (arrows[e.key]) {
    e.preventDefault();
    var d = arrows[e.key];
    if (d.x !== -dir.x || d.y !== -dir.y) nextDir = d;
    if (!started && !gameOver) {
      started = true;
      nextDir = d;
      dir = d;
      document.getElementById('message').textContent = '';
      interval = setInterval(tick, getInterval());
    }
  }

  if (e.key === 'r' || e.key === 'R') {
    clearInterval(interval);
    init();
  }
});

init();

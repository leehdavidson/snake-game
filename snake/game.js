var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var GRID = 20;
var COLS = canvas.width / GRID;
var ROWS = canvas.height / GRID;

var snake, dir, nextDir, food, score, high, gameOver, started, interval, speed;

high = +(localStorage.getItem('snakeHigh') || 0);
document.getElementById('high').textContent = high;

function placeFood() {
  var pos;
  do {
    pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some(function (s) { return s.x === pos.x && s.y === pos.y; }));
  food = pos;
}

function getInterval() {
  return Math.max(60, 150 - (speed - 1) * 10);
}

function init() {
  var midX = Math.floor(COLS / 2);
  var midY = Math.floor(ROWS / 2);
  snake = [{ x: midX, y: midY }, { x: midX - 1, y: midY }, { x: midX - 2, y: midY }];
  dir = { x: 1, y: 0 };
  nextDir = { x: 1, y: 0 };
  score = 0;
  speed = 1;
  gameOver = false;
  started = false;
  document.getElementById('score').textContent = 0;
  document.getElementById('speed').textContent = 1;
  document.getElementById('message').textContent = 'Press any arrow key to start';
  placeFood();
  draw();
}

function tick() {
  dir = nextDir;
  var head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

  if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS ||
      snake.some(function (s) { return s.x === head.x && s.y === head.y; })) {
    gameOver = true;
    clearInterval(interval);
    if (score > high) {
      high = score;
      localStorage.setItem('snakeHigh', high);
      document.getElementById('high').textContent = high;
    }
    document.getElementById('message').textContent = 'GAME OVER — Press R to restart';
    draw();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById('score').textContent = score;
    if (score % 5 === 0) {
      speed++;
      document.getElementById('speed').textContent = speed;
      clearInterval(interval);
      interval = setInterval(tick, getInterval());
    }
    placeFood();
  } else {
    snake.pop();
  }

  draw();
}

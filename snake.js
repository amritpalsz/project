// snake.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const gameMessage = document.getElementById('gameMessage');
const resetButton = document.getElementById('resetButton');
const startButton = document.getElementById('startButton');

const grid = 16;
let count = 0;
let snake = {
    x: 160,
    y: 160,
    cells: [],
    maxCells: 4
};
let apple = { x: 320, y: 320 };
let score = 0;
let dx = grid;
let dy = 0;
let gameRunning = false;

function showMessage(message) {
    gameMessage.textContent = message;
    gameMessage.style.visibility = 'visible';
}

function hideMessage() {
    gameMessage.style.visibility = 'hidden';
}

function resetGame() {
    snake.x = 160;
    snake.y = 160;
    snake.cells = [];
    snake.maxCells = 4;
    apple.x = getRndPos();
    apple.y = getRndPos();
    score = 0;
    dx = grid;
    dy = 0;
    updateScore();
    hideMessage();
    startButton.style.display = "block";
}

function startGame() {
    resetGame();
    gameRunning = true;
    startButton.style.display = "none";
    gameLoop();
}

function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

function getRndPos() {
    return Math.floor(Math.random() * 25) * grid;
}

function gameLoop() {
    if (!gameRunning) return;
    setTimeout(function() {
        requestAnimationFrame(gameLoop);
        if (++count < 6) {
            return;
        }
        count = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        snake.x += dx;
        snake.y += dy;

        if (snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height || snake.cells.some(cell => cell.x === snake.x && cell.y === snake.y)) {
            gameRunning = false;
            showMessage('Game Over!');
            return;
        }

        snake.cells.unshift({x: snake.x, y: snake.y});
        if (snake.cells.length > snake.maxCells) {
            snake.cells.pop();
        }

        ctx.fillStyle = 'red';
        ctx.fillRect(apple.x, apple.y, grid-1, grid-1);

        ctx.fillStyle = 'green';
        snake.cells.forEach(cell => {
            ctx.fillRect(cell.x, cell.y, grid-1, grid-1);
        });

        if (apple.x === snake.x && apple.y === snake.y) {
            snake.maxCells++;
            score += 10;
            apple.x = getRndPos();
            apple.y = getRndPos();
            updateScore();
            if (score === 100) {  // Set a winning score
                gameRunning = false;
                showMessage('You Win!');
                return;
            }
        }
    }, 100); // Slower game speed
}

document.addEventListener('keydown', e => {
    if (gameRunning) {
        switch (e.key) {
            case 'ArrowLeft':
                if (dx === 0) { dx = -grid; dy = 0; }
                break;
            case 'ArrowUp':
                if (dy === 0) { dy = -grid; dx = 0; }
                break;
            case 'ArrowRight':
                if (dx === 0) { dx = grid; dy = 0; }
                break;
            case 'ArrowDown':
                if (dy === 0) { dy = grid; dx = 0; }
                break;
        }
    }
});

resetButton.addEventListener('click', resetGame);
startButton.addEventListener('click', startGame);

setup();
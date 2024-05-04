const gameBoard = document.getElementById('game-board');
const message = document.getElementById('message');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const cards = ['🍎', '🍎', '🍌', '🍌', '🍓', '🍓', '🍇', '🍇', '🍊', '🍊', '🍉', '🍉', '🍍', '🍍', '🥝', '🥝'];

let targetFruit = '';
let attempts = 0;
let isGameStarted = false;

function createCard(fruit) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-fruit', fruit);
    card.textContent = '?';
    card.addEventListener('click', handleCardClick);
    return card;
}

function handleCardClick() {
    if (!isGameStarted || this.classList.contains('flipped')) {
        return;
    }

    this.classList.add('flipped');
    this.textContent = this.getAttribute('data-fruit');
    attempts++;

    if (this.getAttribute('data-fruit') === targetFruit) {
        message.textContent = 'Congratulations! You won!';
        endGame();
    } else {
        if (attempts === 3) {
            message.textContent = 'Game Over! You ran out of attempts.';
            endGame();
        } else {
            message.textContent = `Wrong fruit! Attempts left: ${3 - attempts}`;
            setTimeout(() => {
                this.classList.remove('flipped');
                this.textContent = '?';
            }, 1000);
        }
    }
}

function startGame() {
    isGameStarted = true;
    attempts = 0;
    message.textContent = '';
    gameBoard.innerHTML = '';
    const shuffledCards = shuffle(cards);
    shuffledCards.forEach(fruit => {
        const card = createCard(fruit);
        gameBoard.appendChild(card);
    });
    startBtn.style.display = 'none';
    restartBtn.style.display = 'block';
    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => {
            card.classList.add('flipped');
            card.textContent = card.getAttribute('data-fruit');
        });
        message.textContent = 'Memorize the fruits!';
        setTimeout(() => {
            document.querySelectorAll('.card').forEach(card => {
                card.classList.remove('flipped');
                card.textContent = '?';
            });
            setTimeout(() => {
                targetFruit = shuffledCards[Math.floor(Math.random() * shuffledCards.length)];
                message.textContent = `Find the ${targetFruit} card!`;
                isGameStarted = true;
            }, 1000);
        }, 5000);
    }, 500);
}

function endGame() {
    isGameStarted = false;
    document.querySelectorAll('.card').forEach(card => {
        card.removeEventListener('click', handleCardClick);
        card.classList.remove('flipped');
        card.textContent = card.getAttribute('data-fruit');
    });
    restartBtn.style.display = 'block';
}

function shuffle(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

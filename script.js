const games = [
    {
        name: "Tic-Tac-Toe",
        thumbnail: "tictactoe.webp",
        url: "tictactoe.html"
    },
    {
        name: "Memory Game",
        thumbnail: "memory.webp",
        url: "memory.html"
    },
    {
        name: "Snake",
        thumbnail: "snake.webp",
        url: "snake.html"
    }
];

function createGameCard(game) {
    const gameCard = document.createElement("div");
    gameCard.classList.add("gameCard");
    
    const thumbnail = document.createElement("img");
    thumbnail.src = game.thumbnail;
    thumbnail.alt = game.name;
    
    const title = document.createElement("h3");
    title.textContent = game.name;
    
    gameCard.appendChild(thumbnail);
    gameCard.appendChild(title);
    
    gameCard.addEventListener("click", () => {
        window.location.href = game.url;
    });
    
    return gameCard;
}

function populateGameGrid() {
    const gameGrid = document.getElementById("gameGrid");
    
    games.forEach(game => {
        const gameCard = createGameCard(game);
        gameGrid.appendChild(gameCard);
    });
}

window.addEventListener("load", populateGameGrid);
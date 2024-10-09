const board = document.getElementById("board");
const resultDisplay = document.getElementById("result");
const restartButton = document.getElementById("restart");
let cells = Array.from(document.getElementsByClassName("cell"));
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute("data-index");

    if (cell.textContent !== "" || !gameActive) {
        return;
    }

    cell.textContent = currentPlayer;
    checkWinner();

    if (gameActive) {
        computerMove();
    }
}

function computerMove() {
    let emptyCells = cells.filter(cell => cell.textContent === "");
    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        randomCell.textContent = "O";
        checkWinner();
    }
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (cells[a].textContent === "" || cells[b].textContent === "" || cells[c].textContent === "") {
            continue;
        }
        if (cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        resultDisplay.textContent = `${currentPlayer} виграв!`;
        gameActive = false;
        return;
    }

    if (cells.every(cell => cell.textContent !== "")) {
        resultDisplay.textContent = "Нічия!";
        gameActive = false;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

restartButton.addEventListener("click", restartGame);

function restartGame() {
    currentPlayer = "X";
    gameActive = true;
    resultDisplay.textContent = "";
    cells.forEach(cell => {
        cell.textContent = "";
    });
}

// Автоматичний кидок при завантаженні сторінки
window.onload = () => {
    cells.forEach(cell => {
        cell.textContent = "";
    });
    resultDisplay.textContent = "";
};

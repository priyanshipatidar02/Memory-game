const symbols = ['🍎', '🍌', '🍒', '🍇', '🍉', '🥝', '🍎', '🍌', '🍒', '🍇', '🍉', '🥝'];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;

const gameBoard = document.getElementById('gameBoard');
const moveCounter = document.getElementById('moveCounter');
const resetBtn = document.getElementById('resetBtn');
const toggleThemeBtn = document.getElementById('toggleThemeBtn');
const body = document.body;

const winModal = document.getElementById('winModal');
const finalMoves = document.getElementById('finalMoves');
const playAgainBtn = document.getElementById('playAgainBtn');

startGame();

resetBtn.addEventListener('click', startGame);
toggleThemeBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
    body.classList.toggle('light');
    toggleThemeBtn.textContent = body.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';
});
playAgainBtn.addEventListener('click', () => {
    winModal.classList.add('hidden');
    startGame();
});

function startGame() {
    gameBoard.innerHTML = '';
    moves = 0;
    matchedPairs = 0;
    moveCounter.textContent = moves;
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    const shuffledSymbols = symbols.sort(() => 0.5 - Math.random());

    shuffledSymbols.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">❓</div>
        <div class="card-back">${symbol}</div>
      </div>
    `;
        card.addEventListener('click', () => flipCard(card, symbol));
        gameBoard.appendChild(card);
    });
}

function flipCard(card, symbol) {
    if (lockBoard || card.classList.contains('flipped')) return;

    card.classList.add('flipped');

    if (!firstCard) {
        firstCard = {
            card,
            symbol
        };
    } else {
        secondCard = {
            card,
            symbol
        };
        moves++;
        moveCounter.textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    if (firstCard.symbol === secondCard.symbol) {
        matchedPairs++;
        firstCard = null;
        secondCard = null;
        if (matchedPairs === symbols.length / 2) {
            showWinModal();
        }
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.card.classList.remove('flipped');
            secondCard.card.classList.remove('flipped');
            firstCard = null;
            secondCard = null;
            lockBoard = false;
        }, 1000);
    }
}

function showWinModal() {
    finalMoves.textContent = moves;
    winModal.classList.remove('hidden');
}

const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;
const totalPairs = 6;

const cardPairs = {
    1: 2,
    3: 4,
    5: 6,
    7: 8,
    9: 10,
    11: 12,
};

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const firstCardId = parseInt(firstCard.dataset.id);
    const secondCardId = parseInt(secondCard.dataset.id);

    if (cardPairs[firstCardId] === secondCardId || cardPairs[secondCardId] === firstCardId) {
        disableCards();
        matchedPairs++;

        if (matchedPairs === totalPairs) {
            setTimeout(showCongratulations, 500);
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function showCongratulations() {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('congratulations-message');

    const message = document.createElement('h2');
    message.textContent = 'Parabéns! Você concluiu o jogo!';

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Reiniciar Jogo';
    restartButton.addEventListener('click', restartGame);

    messageContainer.appendChild(message);
    messageContainer.appendChild(restartButton);

    document.body.appendChild(messageContainer);
}

function restartGame() {
    matchedPairs = 0;
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });

    document.querySelector('.congratulations-message').remove();
    shuffle();
}

cards.forEach(card => card.addEventListener('click', flipCard));

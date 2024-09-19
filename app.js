let deckId;
let myScore = 0;
let computerScore = 0;
const cardsContainer = document.getElementById('cards');
const newDeckBtn = document.getElementById('new-deck');
const drawCardBtn = document.getElementById('draw-cards');
const header = document.getElementById('header');
const cardCount = document.getElementById('card-left');
const result = document.getElementById('score');

async function handleClick() {
   const res = await fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    const data= await res.json()
            deckId = data.deck_id;
            console.log(deckId);
            drawCardBtn.disabled = false; // Enable Draw button for a new deck
            cardCount.innerHTML = `Remaining Cards: 52`; // A new deck starts with 52 cards
            header.innerHTML = ''; // Reset the header message
            myScore = 0;
            computerScore = 0; // Reset scores
            result.innerHTML = `My score: 0 | Computer score: 0`; // Reset the score display
            drawCardBtn.textContent = 'Draw Cards'; // Set the button text back to 'Draw Cards'
        }

// Event listener for "New Deck" button
newDeckBtn.addEventListener('click', handleClick);

// Event listener for "Draw Cards" button
drawCardBtn.addEventListener('click', () => {
    if (!deckId) {
        header.innerHTML = 'Please create a new deck first!';
        return;
    }

    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then((res) => res.json())
        .then((data) => {
            cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `;
            cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />
            `;

            header.innerHTML = calculate(data.cards[0].value, data.cards[1].value);

            // Update the remaining card count
            cardCount.innerHTML = `Remaining Cards: ${data.remaining}`;

            // Update the score
            result.innerHTML = `My score: ${myScore} | Computer score: ${computerScore}`;

            // Check if the deck is empty and show the final winner
            if (data.remaining === 0) {
                drawCardBtn.disabled = true;
                drawCardBtn.textContent = 'Restart';
                header.innerHTML = determineWinner();
                drawCardBtn.classList.add('disabled');

                // Add an event listener for restarting the game
                drawCardBtn.addEventListener('click', handleClick);
            }
        });
});

// Function to calculate card values and determine the round winner
function calculate(card1, card2) {
    const values = {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        JACK: 11,
        QUEEN: 12,
        KING: 13,
        ACE: 14,
    };

    let cardValue1 = values[card1];
    let cardValue2 = values[card2];
    header.classList.remove('won', 'lost', 'draw');

    if (cardValue1 === cardValue2) {
        header.classList.add('draw');
        return 'It\'s a Draw!';
    } else if (cardValue1 < cardValue2) {
        header.classList.add('lost');
        computerScore++;
        return 'Computer Won!';
    } else {
        header.classList.add('won');
        myScore++;
        return 'You Won!';
    }
}

function determineWinner() {
    if (myScore > computerScore) {
        return 'Game Over! You are the winner!';
    } else if (myScore < computerScore) {
        return 'Game Over! Computer is the winner!';
    } else {
        return 'Game Over! It\'s a draw!';
    }
}

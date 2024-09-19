let deckId
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const header = document.getElementById("header")

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            console.log(deckId)
        })
}

newDeckBtn.addEventListener("click", handleClick)


drawCardBtn.addEventListener("click", () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `
            cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />
            `
            calculate(data.cards[0].value, data.cards[1].value);         
            document.getElementById('header').innerText=  calculate(data.cards[0].value, data.cards[1].value)

          });
        });
                 

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
      "JACK": 10,
      "QUEEN": 11,
      "KING": 12,
      "ACE": 13
  };

  let cardValue1 = values[card1];
  let cardValue2 = values[card2];
  if (cardValue1 === cardValue2) {
      return'draw';
  } else if (cardValue1 < cardValue2) {
      return'lost card1'
  } else if (cardValue1 > cardValue2) {
      return'won card1'
  }
}

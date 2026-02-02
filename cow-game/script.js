"use strict";

const player0Section = document.querySelector(".player--0");
const player1Section = document.querySelector(".player--1");
const score0Element = document.querySelector("#score--0");
const score1Element = document.getElementById("score--1");
const currentScore0Element = document.getElementById("current--0");
const currentScore1Element = document.getElementById("current--1");
const diceElement = document.querySelector(".dice");
const rollDiceButton = document.querySelector(".btn--roll");
const newGameButton = document.querySelector(".btn--new");
const holdButton = document.querySelector(".btn--hold");

const WINNING_SCORE = 100;

let scores, activePlayer, currentScore, playing;

const init = () => {
    activePlayer = 0;
    scores = [0, 0];
    playing = true;
    currentScore = 0;

    score0Element.textContent = 0;
    score1Element.textContent = 0;

    currentScore0Element.textContent = 0;
    currentScore1Element.textContent = 0;

    player0Section.classList.add("player--active");
    player1Section.classList.remove("player--active");
    player1Section.classList.remove("player--winner");
    player0Section.classList.remove("player--winner");

    diceElement.classList.add("hidden");
};

init();

const switchPlayer = function () {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Section.classList.toggle("player--active");
    player1Section.classList.toggle("player--active");
}


rollDiceButton.addEventListener("click", () => {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        diceElement.classList.remove("hidden");
        diceElement.src = `dice-${dice}.png`;

        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
})

holdButton.addEventListener("click", () => {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= WINNING_SCORE) {
            playing = false;
            diceElement.classList.add("hidden");
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        } else {
            switchPlayer();
        }
    }
})


newGameButton.addEventListener("click", init);

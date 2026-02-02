"use strict"

const generateSecretNumber = function () {
    return Math.trunc(Math.random() * 20) + 1;
}

let secretNumber = generateSecretNumber();

let score = 20;
let highscore = 0;

const setMessageContent = function (msg) {
    document.querySelector(".message").textContent = msg;
}

document.querySelector(".check").addEventListener("click", function () {
    if (score <= 0) return;
    const guess = Number(document.querySelector(".guess").value);

    if (guess === 0) {
        setMessageContent("⛔ Not between 1 and 20!");
    } else if (!guess) {
        setMessageContent("⛔ No number!");
    } else if (guess < 1 || guess > 20) {
        setMessageContent("⛔ Not between 1 and 20!");
    } else if (guess === secretNumber) {
        //correct guess scenario
        setMessageContent("🎉 Correct Number!");
        document.querySelector(".number").textContent = secretNumber;
        document.querySelector("body").style.backgroundColor = "#60b347";
        document.querySelector(".number").style.width = "45rem";
        if (score > highscore) {
            highscore = score;
            document.querySelector(".highscore").textContent = highscore;
        }
    } else if (guess > secretNumber) {
        //wrong guess scenario
        setMessageContent("📈 High!");
        score--;
    } else if (guess < secretNumber) {
        //wrong guess scenario
        setMessageContent("📉 Low!");
        score--;
    }

    if (score > 0) {
        document.querySelector(".score").textContent = score;
    } else if (score <= 0) {
        setMessageContent("You lost the game!");
        document.querySelector(".score").textContent = 0;
    }
});

document.querySelector(".again").addEventListener("click", function () {
    score = 20;
    secretNumber = generateSecretNumber();
    document.querySelector(".score").textContent = score;
    setMessageContent("Start guessing...");
    document.querySelector(".number").textContent = "?";
    document.querySelector(".guess").value = "";
    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector(".number").style.width = "15rem";
});


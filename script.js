"use strict";

// Assigning variables to the Scores and dice
const scoreP1 = document.getElementById("score--0");
const scoreP2 = document.getElementById("score--1");
const dice = document.getElementsByClassName("dice");
const btnNew = document.getElementsByClassName("btn--new");
const btnRoll = document.getElementsByClassName("btn--roll");
const btnHold = document.getElementsByClassName("btn--hold");
const currentScorePl = document.querySelectorAll(".current-score");

// Giving the selector to the players so to be used in toggle active player and also Current Score are defined similarly
let player, currentScore;

// Declaring score for hold button
let score1 = 0;
let score2 = 0;

// Default start values + New Game button function.
const newGame = () => {
  scoreP1.textContent = 0;
  scoreP2.textContent = 0;
  dice[0].classList.add("hidden");
  currentScorePl[0].textContent = 0;
  currentScorePl[1].textContent = 0;

  // Changing backgrounds to player 1 as active and remove winner background;
  document.querySelector(".player--0").classList.add("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
  document.querySelector(".player--0").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");

  // Setting player value to player 1 and resetting current score
  player = 0;
  currentScore = 0;
  score1 = 0;
  score2 = 0;
};

// To set the values to default at start
newGame();

// To reset the values on click of New Game Button
btnNew[0].addEventListener("click", () => {
  newGame();
});

// Function to create random dice no. also assign variable for score
const randomDiceNum = () => {
  return Math.trunc(Math.random() * 6 + 1);
};

// Function to change the Current Score according to the dice role
const changeCurrentScore = () => {
  document.getElementById(`current--${player}`).textContent = currentScore;
};

// Function to change the background of the active player
const changeActivePlayer = () => {
  document
    .querySelector(`.player--${player}`)
    .classList.toggle("player--active");
};

// functions for dice roll on click for P1
btnRoll[0].addEventListener("click", () => {
  if (score1 < 100 && score2 < 100) {
    let num = randomDiceNum();

    // Setting dice image and unhiding image
    dice[0].src = `dice-${num}.png`;
    dice[0].classList.remove("hidden");

    // Creating function to set Current Score
    if (num !== 1) {
      currentScore += num;
      changeCurrentScore();
    } else {
      changeActivePlayer();
      currentScore = 0;
      changeCurrentScore();
      player = player === 0 ? 1 : 0;
      changeActivePlayer();
    }
  }
});

// Function of Hold button
btnHold[0].addEventListener("click", () => {
  if (currentScore != 0) {
    if (player === 0) {
      score1 += currentScore;
      scoreP1.textContent = score1;
      currentScore = 0;
      document.getElementById(`current--0`).textContent = 0;
      document.querySelector(`.player--0`).classList.toggle("player--active");
      document.querySelector(`.player--1`).classList.toggle("player--active");
      player = 1;

      // To declare player 1 winner
      if (score1 >= 100) {
        document.querySelector(`.player--0`).classList.add("player--winner");
      }
    } else {
      score2 += currentScore;
      scoreP2.textContent = score2;
      currentScore = 0;
      document.getElementById(`current--1`).textContent = 0;
      document.querySelector(`.player--1`).classList.toggle("player--active");
      document.querySelector(`.player--0`).classList.toggle("player--active");
      player = 0;

      // To declare player 2 winner
      if (score2 >= 100) {
        document.querySelector(`.player--1`).classList.add("player--winner");
      }
    }
  }
});


const winRules = {
    //lookup dictionary for human showing key/value pairs, key = selection, value = what it beats
    rock: "scissors",
    paper: "rock",
    scissors: "paper"
};

const scoreDiv = document.querySelector("#score");
const resultDiv = document.querySelector("#result");
const buttons = document.querySelectorAll("[data-move]"); // a node list containing 3 button elements, each one has a different data-move value
const resetBtn = document.querySelector("#reset");



let humanScore = 0;
let computerScore = 0;
let gameOver = false;

/* more advance way would be to group all these variables together using 

const state = {
  humanScore: 0,
  computerScore: 0,
  gameOver: false
};

so now youd access them like state.humanScore = 0; or state.humanScore++ or state.gameOver = True;

*/

function resetGame() {
    humanScore = 0; // any function can access and change this as we set them in the top level scope of the script
    computerScore = 0;
    gameOver = false;
    buttons.forEach(btn => btn.disabled = false);
    updateScoreUI();
    resultDiv.textContent = "Make your move.";
}


function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

function updateScoreUI() {
    scoreDiv.textContent = `Score — Human: ${humanScore}, Computer: ${computerScore}`;
}

function checkWinner() {
    if (humanScore >= 5) {
        resultDiv.textContent = "You win the game!";
        gameOver = true;
        buttons.forEach(btn => btn.disabled = true);
    } else if (computerScore >= 5) {
        resultDiv.textContent = "Computer wins the game!";
        gameOver = true;
        buttons.forEach(btn => btn.disabled = true);
    }
}


function playRound(humanChoice) {
    if (gameOver) return;

    const computerChoice = getComputerChoice();
    if (humanChoice === computerChoice) {
        resultDiv.textContent = `It's a tie! You both chose ${humanChoice}.`;
        updateScoreUI();
        return;
    }

    if (winRules[humanChoice] === computerChoice) {
        resultDiv.textContent = `You win! ${humanChoice} beats ${computerChoice}`;
        humanScore++;
    } else {
        resultDiv.textContent = `You lose! ${computerChoice} beats ${humanChoice}`;
        computerScore++;
    }

    updateScoreUI();
    checkWinner();
}

buttons.forEach(button => { // for each button element, run this function once, button is just a parameter name being the singular of buttons in this case
    button.addEventListener("click", () => {
        playRound(button.dataset.move);
    });
});

resetBtn.addEventListener("click", resetGame);

updateScoreUI(); // at load time, scores are both zero so it simply shows this
resultDiv.textContent = "Make your move."; // shows the inital instruction text on load, and this is later updated with who won each round


/*
========================================
ROCK PAPER SCISSORS — JS NOTES
========================================

MENTAL MODEL
----------------------------------------
- This is an event-driven program
- Nothing "runs" the game in a loop
- The browser waits for user clicks
- Each click = one round

----------------------------------------
DOM REFERENCES
----------------------------------------
- querySelector / querySelectorAll are run ONCE
- Stored at top-level to avoid repeated DOM queries
- These are references, not copies

----------------------------------------
STATE (GLOBAL TO THIS SCRIPT)
----------------------------------------
humanScore
computerScore
gameOver

- These live in top-level scope
- Shared by all functions
- Updated over time as the game progresses
- Using `let` because values change

----------------------------------------
WHY NOT const FOR SCORES
----------------------------------------
- Numbers require reassignment (score++)
- const would throw an error
- If grouping state later, use:
  const state = { humanScore: 0, ... }

----------------------------------------
CORE FUNCTIONS
----------------------------------------

getComputerChoice()
- Returns one random move per round
- Pure function (no side effects)

playRound(humanChoice)
- Runs ONE round only
- Called by button click
- Updates state (scores)
- Updates UI
- Checks for game end

checkWinner()
- Runs after each round
- Ends game at 5 points
- Disables buttons
- Sets gameOver flag

resetGame()
- Resets state
- Re-enables buttons
- Resets UI text

updateScoreUI()
- Syncs scoreDiv with current state
- Called after any score change

----------------------------------------
EVENT HANDLERS
----------------------------------------

buttons.forEach(...)
- Attaches ONE listener per button
- button.dataset.move determines humanChoice
- No if/else or switch needed

reset button
- Calls resetGame()
- Restores initial state

----------------------------------------
CONTROL FLOW (IMPORTANT)
----------------------------------------
- Game starts in neutral state (0–0)
- User clicks → playRound()
- playRound updates state + UI
- Game stops when gameOver === true
- Further clicks do nothing

----------------------------------------
KEY CONCEPTS USED
----------------------------------------
- Event-driven programming
- Lexical scope
- Closures
- DOM manipulation via textContent
- data-* attributes for semantic JS hooks

----------------------------------------
RULES TO REMEMBER
----------------------------------------
- Shared logic goes AFTER conditionals
- Early return means code below will not run
- State changes first, UI updates second
- One function = one responsibility

========================================
END NOTES
========================================
*/
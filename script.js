
const winRules = {
    //lookup dictionary for human showing key/value pairs, key = selection, value = what it beats
    rock: "scissors",
    paper: "rock",
    scissors: "paper"
};

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

function getHumanChoice() {
    const input = prompt("Choose an option (rock, paper or scissors): ").toLowerCase();
    return input;
}



function playGame(rounds) {
    let humanScore = 0;
    let computerScore = 0;

    function playRound(humanChoice, computerChoice) {
        // Compare the two choices and determine the round winner.
        // Print the result to the console.
        // Update the global humanScore or computerScore depending on the winner.
        if (humanChoice === computerChoice) {
            console.log("It's a tie!");
            return;
        }

        if (winRules[humanChoice] === computerChoice) {
            console.log(`You win! ${humanChoice} beats ${computerChoice}`);
            humanScore++;
        } else {
            console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
            computerScore++;
        }
    }

    for (let i = 0; i < rounds; i++) {
        playRound(getHumanChoice(), getComputerChoice())
    }
    //declare winner by comaparing scores after 5 rounds
    // After all rounds, show the final score
    console.log(`Final score — Human: ${humanScore}, Computer: ${computerScore}`);

    if (humanScore > computerScore) {
        console.log("You win the game!");
    } else if (computerScore > humanScore) {
        console.log("Computer wins the game!");
    } else {
        console.log("The game is a tie overall!");
    }
}

function main() {
    const rounds = 5;
    playGame(rounds);
}

main();

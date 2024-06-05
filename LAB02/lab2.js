const prompt = require('prompt');

// Function to get user choice
function promptUserChoice() {
    return new Promise((resolve, reject) => {
        prompt.start();

        prompt.get(['choice'], (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            const playerSelection = result.choice.toLowerCase();
            if (playerSelection === 'rock' || playerSelection === 'paper' || playerSelection === 'scissors') {
                resolve(playerSelection);
            } else {
                console.log("Invalid choice, please enter rock, paper, or scissors.");
                resolve(promptUserChoice());
            }
        });
    });
}

function generateComputerChoice() {
    const randomNumber = Math.random();
    
    if (randomNumber <= 0.34) {
        return 'paper';
    } else if (randomNumber <= 0.67) {
        return 'scissors';
    } else {
        return 'rock';
    }
}

// Function to determine the winner
function decideWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "It's a tie!";
    }
    if (playerChoice === 'rock') {
        if (computerChoice === 'scissors') {
            return "You win!";
        } else {
            return "Computer wins!";
        }
    }
    if (playerChoice === 'paper') {
        if (computerChoice === 'rock') {
            return "You win!";
        } else {
            return "Computer wins!";
        }
    }
    if (playerChoice === 'scissors') {
        if (computerChoice === 'paper') {
            return "You win!";
        } else {
            return "Computer wins!";
        }
    }
}

// Function to play the game
async function initiateGame() {
    console.log(`lets play Game " ROCK PAPER SCISSORS"`);
    const playerChoice = await promptUserChoice();
    const computerChoice = generateComputerChoice();
    console.log(`Enter your Choice: ${playerChoice}`);
    console.log(`Computer chose: ${computerChoice}`);
    console.log(decideWinner(playerChoice, computerChoice));
}

// Start the game
initiateGame();


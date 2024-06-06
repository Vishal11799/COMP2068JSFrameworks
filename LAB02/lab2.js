const prompt = require("prompt");

// Function to get user input from using prompt
function promptUserChoice() {
  return new Promise((resolve, reject) => {
    prompt.start();

    prompt.get(["choice"], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      const userChoice = result.choice.toLowerCase(); //coverting to lower case
      if (
        userChoice === "rock" ||
        userChoice === "paper" ||
        userChoice === "scissors"
      ) {
        resolve(userChoice); // resolving the user
      } else {
        console.log("Invalid choice!!");
        console.log("make Sure! you enter  your Choice from only Below");
        Console.log("Rock  Paper & scissors");
        resolve(promptUserChoice()); // Prompt the user again for a valid choice
      }
    });
  });
}

// Function for rendom function 
function generateComputerChoice() {
  const randomNumber = Math.random(); // Generate a random number between 0 and 1

  if (randomNumber <= 0.34) {
    return "paper"; // Return 'paper' if the number is in the range 0.00 - 0.34
  } else if (randomNumber <= 0.67) {
    return "scissors"; // Return 'scissors' if the number is in the range 0.35 - 0.67
  } else {
    return "rock"; // Return 'rock' if the number is in the range 0.68 - 1.00
  }
}

// function for logic and  winner Choose winner 
function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return "It's a tie"; // tie logic for 
  }
  if (userChoice === "rock") {
    if (computerChoice === "scissors") {
      return "User Wins"; // User win situation  if it rock 
    } else {
      return "Computer Wins"; // Computer win logic if its not scissors 
    }
  }
  if (userChoice === "paper") {
    if (computerChoice === "rock") {
      return "User Wins"; // user win situation if its paper  
    } else {
      return "Computer Wins"; // Computer wins if it chose scissors
    }
  }
  if (userChoice === "scissors") {
    if (computerChoice === "paper") {
      return "User Wins"; // User wins if they chose scissors 
    } else {
      return "Computer Wins"; // Computer wins if it chose rock
    }
  }
}

// function for plying games 
async function Game() {
  console.log(`Let's play "ROCK, PAPER, SCISSORS"!`);
  const userChoice = await promptUserChoice(); // user inout 
  const computerChoice = generateComputerChoice(); // computer choice using rendom function 

  //printing both the outputs  
  console.log(`User's choice: ${userChoice}`);
  console.log(`Computer's choice: ${computerChoice}`);
//   winner situation 
  console.log(determineWinner(userChoice, computerChoice)); // Determine and print the winner
}

// paly game start 
Game();

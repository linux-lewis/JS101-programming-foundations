const readline = require('readline-sync');
const VALID_CHOICES = ['r', 'p', 'sc', 'sp', 'l'];
const CHOICE_NAMES = ['rock', 'paper', 'scissors',
  'spock', 'lizard'];
const WINNING_COMBOS = [['scissors', 'paper'], ['paper', 'rock'],
  ['rock', 'lizard'], ['lizard', 'spock'], ['spock', 'scissors'],
  ['scissors', 'lizard'], ['lizard', 'paper'], ['paper', 'spock'],
  ['spock', 'rock'], ['rock', 'scissors']];

let score = [0, 0];

function prompt(message) {
  console.log(`=> ${message}`);
}

function displayWinner(playerChoice, computerChoice) {
  prompt(`You choose ${playerChoice}, computer chose ${computerChoice}`);

  let winningStatement;
  for (let ii = 0; ii < WINNING_COMBOS.length; ii += 1) {
    if (playerChoice === WINNING_COMBOS[ii][0] &&
      computerChoice === WINNING_COMBOS[ii][1]) {
      winningStatement = 'You win!\n';
      break;
    } else if (playerChoice === WINNING_COMBOS[ii][1] &&
      computerChoice === WINNING_COMBOS[ii][0]) {
      winningStatement = 'Computer wins!\n';
      break;
    } else {
      winningStatement = "It's a tie\n";
    }
  }
  return prompt(winningStatement);
}

function updateScoreboard(playerChoice, computerChoice) {
  for (let ii = 0; ii < WINNING_COMBOS.length; ii += 1) {
    if (playerChoice === WINNING_COMBOS[ii][0] &&
      computerChoice === WINNING_COMBOS[ii][1]) {
      score[0] += 1;
      break;
    } else if (playerChoice === WINNING_COMBOS[ii][1] &&
      computerChoice === WINNING_COMBOS[ii][0]) {
      score[1] += 1;
      break;
    } else {
      continue;
    }
  }
}

function grandWinner(score) {
  if (score[0] === 5) {
    prompt(`You are the Grand Winner!`);
  } else {
    prompt(`The Computer is the Grand Winner!`);
  }
}

while (true) {
  while (score[0] < 5 && score [1] < 5) {

    prompt(`The score is You: ${score[0]}, Computer: ${score[1]}`);

    prompt(`Choose one: 
    ${VALID_CHOICES[0]} for rock 
    ${VALID_CHOICES[1]} for paper
    ${VALID_CHOICES[2]} for scissors 
    ${VALID_CHOICES[3]} for spock
    ${VALID_CHOICES[4]} for lizard`);

    let choice = readline.question();

    while (!VALID_CHOICES.includes(choice)) {
      prompt("That's not a valid choice");
      choice =  readline.question();
    }

    let playerChoice;
    switch (choice) {
      case 'r':
        playerChoice = 'rock';
        break;
      case 'p':
        playerChoice = 'paper';
        break;
      case 'sc':
        playerChoice = 'scissors';
        break;
      case 'sp':
        playerChoice = 'spock';
        break;
      case 'l':
        playerChoice = 'lizard';
        break;
    }

    console.clear();
    let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
    let computerChoice = CHOICE_NAMES[randomIndex];

    displayWinner(playerChoice, computerChoice);
    updateScoreboard(playerChoice, computerChoice);
  }

  grandWinner(score);

  prompt('Do you want to play again (y/n)?');
  let answer = readline.question().toLowerCase();
  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt('Please enter "y" or "n".');
    answer = readline.question().toLowerCase();
  }

  if (answer[0] === 'y') {
    score = [0, 0];
  } else {
    break;
  }

  console.clear();
}
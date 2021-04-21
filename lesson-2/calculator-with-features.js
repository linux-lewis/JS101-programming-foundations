// Ask the user for the first number.
// Ask the user for the second number.
// Ask the user for the operation to perform.
// Perform the operation on the two numbers.
// Print the result to the terminal.

// Require readline-sync and calculator_messages json file for use below
const readline = require('readline-sync');
const MESSAGES = require('./calculator_messages.json');

// Initialize restart variable as true for while loop
let restart = true;

// Create prompt function for user input messages
function prompt(message) {
  console.log(`=> ${message}`);
}

console.log(MESSAGES['welcome_message']);

// create function to validate number input
function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

// create funtction to validate y/n input for restart
function invalidString(string) {
  string = string.toLowerCase();
  return string.length !== 1 || (!string.includes('n') && !string.includes('y'));
}

while (restart) {
  // Ask the user to input the first number and assign to variable
  prompt(MESSAGES['first_number']);
  let number1 = readline.question();

  // Check to see if number is valid and input new value if not
  while (invalidNumber(number1)) {
    prompt(MESSAGES['invalid_number']);
    number1 = readline.question();
  }

  // Do the same for the second number
  prompt(MESSAGES['second_number']);
  let number2 = readline.question();

  while (invalidNumber(number2)) {
    prompt(MESSAGES['invalid_number']);
    number2 = readline.question();
  }

  // Ask the user which operation to perform
  prompt(MESSAGES['operation']);
  let operation = readline.question();

  // Validate operation checking operation if doesn't include 1,2,3,4
  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt(MESSAGES['invalid_operation']);
    operation = readline.question();
  }

  // Each comparison will compare variable operation with a different value.
  // Perfect use-case for switch statement
  let output;
  switch (operation) {
    case '1':
      output = Number(number1) + Number(number2); // Use Number to convert string output from readline.question to a number
      break;
    case '2':
      output = Number(number1) - Number(number2);
      break;
    case '3':
      output = Number(number1) * Number(number2);
      break;
    case '4':
      output = Number(number1) / Number(number2);
      break;
  }

  // Log the output to the console
  console.log(`\nThe result is: ${output}\n`);

  // Ask user if they would like to do another calculation
  prompt(MESSAGES['restart']);
  let restartQustion = readline.question();

  // Check to see if restart input is valid
  while (invalidString(restartQustion)) {
    prompt(MESSAGES['invalid_restart']);
    restartQustion = readline.question();
  }

  // restart calculator or quit based on user input
  if (restartQustion === 'y') {
    restart = true;
  } else {
    restart = false;
    console.log(MESSAGES['quit_message']);
  }
}
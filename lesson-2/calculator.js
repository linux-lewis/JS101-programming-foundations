// Ask the user for the first number.
// Ask the user for the second number.
// Ask the user for the operation to perform.
// Perform the operation on the two numbers.
// Print the result to the terminal.

// Require readline-sync at the top so it can be used in code below
const readline = require('readline-sync');

// Create prompt function for user input messages
function prompt(message) {
  console.log(`=> ${message}`);
}

prompt('Welcome to Calculator!');

// create function to validate number input
function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

// Ask the user to input the first number and assign to variable
prompt("What's the first number?");
let number1 = readline.question();

// Check to see if number is valid and input new value if not
while (invalidNumber(number1)) {
  prompt("Hmm... that doesn't look like a valid number.");
  number1 = readline.question();
}

// Do the same for the second number
prompt("What's the second number?");
let number2 = readline.question();

while (invalidNumber(number2)) {
  prompt("Hmm... that doesn't look like a valid number.");
  number2 = readline.question();
}

// Ask the user which operation to perform
console.log('What operation would you like to perform?\n1) Add 2) Subtract 3) Multiply 4) Divide');
let operation = readline.question();

// Validate operation with while loop checking operation doesn't include 1,2,3,4
while (!['1', '2', '3', '4'].includes(operation)) {
  prompt('Must choose 1, 2, 3, or 4');
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
console.log(`The result is: ${output}`);
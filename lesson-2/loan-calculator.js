// Require readline-sync and calculator_messages json file for use below
const readline = require('readline-sync');
const MESSAGES = require('./loan_messages.json');
const MONTHS_IN_YEAR = 12;
const PERCENTAGE_MULTIPLIER = .01;

// Initialize restart variable as true for while loop
let restart = true;

// Create prompt function for user input messages
function prompt(message) {
  console.log(`=> ${message}`);
}

// Create function to validate number input
function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

// Create function to validate restart input
function invalidString(string) {
  string = string.toLowerCase();
  return string.length !== 1 || (!string.includes('n') && !string.includes('y'));
}

// Create function to ask user for loan amount
function getLoanAmount() {
  prompt(MESSAGES['loan_amount']);
  let amount = readline.question();

  // Check to see if number is valid and input new value if not
  while (invalidNumber(amount)) {
    prompt(MESSAGES['invalid_number']);
    amount = readline.question();
  }
  return parseFloat(amount);
}

// Create function to ask user for annual percentage rate and convert to monthly
function getPercentageRate() {
  prompt(MESSAGES['annual_percentage_rate']);
  let annualRate = readline.question();

  // Check to see if number is valid and input new value if not
  while (invalidNumber(annualRate)) {
    prompt(MESSAGES['invalid_number']);
    annualRate = readline.question();
  }
  return (parseFloat(annualRate) * PERCENTAGE_MULTIPLIER) / MONTHS_IN_YEAR;
}

// Create function to ask user for loan duration in years and convert to months
function getLoanDuration() {
  prompt(MESSAGES['loan_duration']);
  let annualDuration = readline.question();

  // Check to see if number is valid and input new value if not
  while (invalidNumber(annualDuration)) {
    prompt(MESSAGES['invalid_number']);
    annualDuration = readline.question();
  }
  return parseFloat(annualDuration) * MONTHS_IN_YEAR;
}

// Create calculator function
function loanCalculator() {
  let loanAmount = getLoanAmount();
  let monthlyRate = getPercentageRate();
  let durationMonths = getLoanDuration();

  let monthlyPayment = loanAmount * (monthlyRate / (1 - Math.pow(
    (1 + monthlyRate), (-durationMonths))));
  return monthlyPayment.toFixed(2);
}

while (restart === true) {
  // Call loan calculator and log result to console
  console.log(`\nThe monthly payment for this loan is $${loanCalculator()}\n`);

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
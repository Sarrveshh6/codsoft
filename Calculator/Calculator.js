// Select the calculator display
const display = document.querySelector('.calculator-screen');

// Variables to store the current state
let currentValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

// Function to update the display with the current value and operator
function updateDisplay() {
  if (operator && waitingForSecondValue) {
    // Display the first value and the operator when operator is selected
    display.value = `${firstValue} ${operator}`;
  } else {
    // Otherwise, display the current value (number being entered)
    display.value = currentValue;
  }
}

// Function to handle number button clicks
function handleNumber(number) {
  if (waitingForSecondValue) {
    // If waiting for second value, replace the display value
    currentValue = number;
    waitingForSecondValue = false;
  } else {
    // If not waiting, append the number to the current display value
    currentValue = currentValue === '0' ? number : currentValue + number;
  }
}

// Function to handle decimal button
function handleDecimal() {
  if (!currentValue.includes('.')) {
    currentValue += '.';
  }
}

// Function to handle operator buttons (+, -, *, /)
function handleOperator(nextOperator) {
  const inputValue = parseFloat(currentValue);

  if (firstValue === null) {
    // If firstValue is null, set it to the current input value
    firstValue = inputValue;
  } else if (operator) {
    // Perform calculation if operator is set and the second operand is entered
    const result = calculate(firstValue, inputValue, operator);
    currentValue = String(result);
    firstValue = result;
  }

  // Map display symbols '×' and '÷' to JavaScript operators '*' and '/'
  if (nextOperator === '×') {
    operator = '*';
  } else if (nextOperator === '÷') {
    operator = '/';
   
  } else {
    operator = nextOperator;
  }

  waitingForSecondValue = true;
}


function calculate(first, second, operator) {
  if (operator === '+') return first + second;
  if (operator === '-') return first - second;
  if (operator === '*') return first * second;
  if (operator === '/') return first / second;
  return second;
}

// Function to clear the display (reset the calculator)
function clearCalculator() {
  currentValue = '0';
  firstValue = null;
  operator = null;
  waitingForSecondValue = false;
  updateDisplay();  // Update display when cleared
}

// Event listener for button clicks
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', event => {
  const { target } = event;

  // Ignore clicks that are not buttons
  if (!target.matches('button')) return;

  // Check if the button is a number
  if (target.textContent >= '0' && target.textContent <= '9') {
    handleNumber(target.textContent);
    updateDisplay();
    return;
  }

  // Check if the button is a decimal point
  if (target.textContent === '.') {
    handleDecimal();
    updateDisplay();
    return;
  }

  // Check if the button is an operator
  if (target.classList.contains('operator')) {
    handleOperator(target.textContent);
    updateDisplay();
    return;
  }

  // Check if the button is the equal sign
  if (target.textContent === '=') {
    handleOperator(null);  // Trigger the calculation
    updateDisplay();
    return;
  }

  // Check if the button is "AC" (All Clear)
  if (target.textContent === 'AC') {
    clearCalculator();  // Reset the calculator
    updateDisplay();
    return;
  }
});

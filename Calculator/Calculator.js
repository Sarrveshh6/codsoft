
const display = document.querySelector('.calculator-screen');


let currentValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

function updateDisplay() {
  if (operator && waitingForSecondValue) {
    
    display.value = `${firstValue} ${operator}`;
  } else {
    
    display.value = currentValue;
  }
}


function handleNumber(number) {
  if (waitingForSecondValue) {
    
    currentValue = number;
    waitingForSecondValue = false;
  } else {

    currentValue = currentValue === '0' ? number : currentValue + number;
  }
}


function handleDecimal() {
  if (!currentValue.includes('.')) {
    currentValue += '.';
  }
}


function handleOperator(nextOperator) {
  const inputValue = parseFloat(currentValue);

  if (firstValue === null) {
    
    firstValue = inputValue;
  } else if (operator) {
  
    const result = calculate(firstValue, inputValue, operator);
    currentValue = String(result);
    firstValue = result;
  }


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


function clearCalculator() {
  currentValue = '0';
  firstValue = null;
  operator = null;
  waitingForSecondValue = false;
  updateDisplay();  
}


const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', event => {
  const { target } = event;

  
  if (!target.matches('button')) return;

 
  if (target.textContent >= '0' && target.textContent <= '9') {
    handleNumber(target.textContent);
    updateDisplay();
    return;
  }


  if (target.textContent === '.') {
    handleDecimal();
    updateDisplay();
    return;
  }

  if (target.classList.contains('operator')) {
    handleOperator(target.textContent);
    updateDisplay();
    return;
  }

  
  if (target.textContent === '=') {
    handleOperator(null);  
    updateDisplay();
    return;
  }

  if (target.textContent === 'AC') {
    clearCalculator();  
    return;
  }
});

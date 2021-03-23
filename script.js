// BASIC FUNCTIONS
function doingMath(operand1, newOperator, operand2){
  let op1 = Number(operand1);
  let op2 = Number(operand2);
  switch (newOperator) {
    case '+':
      return add(op1, op2);
      break;
    case '-':
      return subtract(op1, op2);
      break;
    case '*':
      return multiply(op1, op2);
      break;
    case '/':
      return divide(op1, op2);
      break;
    case '%':
      return subtract(op1);
      break;
  }
}

function add(operand1, operand2) {
  return operand1 + operand2;
}

function subtract(operand1,operand2) {
  return operand1 - operand2;
}

function multiply(operand1, operand2) {
  return operand1 * operand2;
}

function divide(operand1,operand2) {
  return operand1 / operand2;
}

function percent(operand) {
  return operand / 100;
}

// Handling mouse click and keyboard keypress
function inputHandler() {
  let oldOperand = '';
  let newOperand = '';
  let newOperator = '';
  let toDisplay = '0';

  // Mouse Click Watcher
  function clickHandler() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('click', event => {
        calc(button.value);
        console.log(button.value);
        displayRefresh(toDisplay);
      })
    })
  }

  // Keyboard keypress listener
  function keyDownHandler() {
    window.addEventListener('keydown', key => {
      const button = document.querySelector(`button[data-key="${key.keyCode}"]`);
      if (!button) return;
      button.classList.add('buttonactive');

    }, );
  }

  // KeyUp handler, Activate keyDownHandler on release
  function keyUpHandler() {
    window.addEventListener('keyup', key => {
      const button = document.querySelector(`button[data-key="${key.keyCode}"]`);
      calc(button.value);
      displayRefresh(toDisplay);
      button.classList.remove('buttonactive');
      })
    
  }

  // Refreshing display
  function displayRefresh(toDisplay) {
    const display = document.querySelector('#display');
      if (toDisplay.length > 12) {
        display.innerText = toDisplay.slice(0,12);
      } else {
        display.innerText = toDisplay;
      }
  }

  // Handling operands
  // if value == AC
  // If value !0-9 or . operatorNew -> operatorOld
  function calc(input) {
    // If input == AC
    if (input == "AC") {
      newOperand = '';
      oldOperand = '';
      newOperator = '';
      toDisplay = '0';
    }

    // If input == 0-9 or .
    if (/[\d|.]/.test(input)) {

      // if input: . and already has one in operand
      if (input == '.' && newOperand.indexOf('.') >= 0) {
      return;}

      // if newOperator empty and input: .
      if (newOperand == '' && input == '.') {
        newOperand = '0.';
        toDisplay = newOperand;
      return;}


      if (newOperand.length == 1 && newOperand[0] == '0' && input == '0') {
        return;
      }

      if (newOperand.length == 1 && newOperand[0] == '0' && newOperand[1] !== '0' && input !== '.') {
        newOperand = input;
        toDisplay = newOperand;
        return;}

      newOperand += input;
      toDisplay = newOperand;
    }
    // ENDOF If input == 0-9 or .

    // INPUT =
    if (input == '=') {
      if (!oldOperand || (newOperator && !newOperand)) {
        return;
      } else {
        oldOperand = doingMath(oldOperand, newOperator, newOperand);
        toDisplay = oldOperand;
        newOperand = '';
      }
    }

    // If input == + - * / %
    if (/[+\-*\/%]/.test(input)){
      if (newOperand) {
        newOperator = input;
        oldOperand = newOperand;
        newOperand = '';
      } else if (oldOperand) {
        newOperator = input;
      }
    }
    console.log('-------------------------')
    console.log('oldOperand: ' + oldOperand)
    console.log('newOperator: ' + newOperator)
    console.log('newOperand: ' + newOperand)
    console.log('-------------------------')

  }

  // Calling Functions
  clickHandler();
  keyDownHandler();
  keyUpHandler();
}



inputHandler();

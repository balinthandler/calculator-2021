// BASIC FUNCTIONS
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
  let operator = '';
  let toDisplay = '';

  // Mouse Click Watcher
  function clickHandler() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('click', event => {
        calc(button.value);
        //return button.value;
        displayRefresh(toDisplay);
        console.log('oldOperand: ' + oldOperand)
        console.log('newOperand: ' + newOperand)
        console.log('operator: ' + operator)
        console.log('toDisplay: ' + toDisplay)
      })
    })
  }
  
  // Keyboard keypress listener
  function keyDownHandler() {
    window.addEventListener('keydown', key => {
      const button = document.querySelector(`button[data-key="${key.keyCode}"]`);
      if (!button) return;
      button.classList.add('buttonactive');
      calc(button.value)
      //return button.value;
      displayRefresh(toDisplay);
      console.log('oldOperand: ' + oldOperand)
      console.log('newOperand: ' + newOperand)
      console.log('operator: ' + operator)
      console.log('toDisplay: ' + toDisplay)
    },{once: true});
  }

  // KeyUp handler, Activate keyDownHandler on release
  function keyUpHandler() {
    window.addEventListener('keyup', () => {
      keyDownHandler();
      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => {
      button.classList.remove('buttonactive')
      })
    })
  }

  // Refreshing display
  function displayRefresh(toDisplay) {
    const display = document.querySelector('#display');
      display.innerText = toDisplay;
  }

  // Handling operands
  // if value == AC 
  // If value !0-9 or . operatorNew -> operatorOld
  function calc(input) {
    // If input == AC
    if (input == "AC") {
      newOperand = '';
      oldOperand = '';
      operator = '';
      toDisplay = 0;
    }
    
    // If input == 0-9 or .
    if (/[\d|.]/.test(input)) {
      if (input == '.' && newOperand.indexOf('.') >= 0) {return}
      if (newOperand == '' && input =='.') {newOperand = '0'}
      newOperand += input;
      toDisplay = newOperand;
    }
    
    // If input == + - * / % =
    
  }



  // Calling Functions
  clickHandler();
  keyDownHandler();
  keyUpHandler();
    return oldOperand, newOperand, operator;
  }



inputHandler();

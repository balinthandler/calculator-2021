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
  if (operand2 == 0) {
    return `DIVISION BY 0!`;
  } else {
  return operand1 / operand2;
  }
}
function percent(operand, operand2) {
  if (operand && !operand2){
    return operand / 100;
  } else if (!operand && operand2) {
    return operand2 / 100;
  } else if (operand && operand2) {
  } else if (!operand && !operand2) {
    return 0;
  }
}

// function chooser
function doOperation(operand1, operator, operand2){
  let op1 = Number(operand1);
  let op2 = Number(operand2);
  switch (operator) {
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
      return percent(op1, op2);
      break;
    }
}

// Calculator main function
function calculator() {
  let oldOperand = '';
  let newOperand = '';
  let reOperand = '';
  let reOperator = '';
  let operator = '';
  let toDisplay = '0';

  // Mouse Click Watcher
  function clickHandler() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('click', event => {
        operandHandling(button.value);
        displayRefresh(toDisplay);
      })
    })
  }

  // Keyboard keypress listener
  function keyDownHandler() {
    window.addEventListener('keydown', event => {
      const button = document.querySelector(`button[data-key="${event.keyCode}"]`);
      event.preventDefault();
      if (!button) return;
      button.classList.add('buttonactive');

    }, );
  }

  // KeyUp handler, Activate keyDownHandler on release
  function keyUpHandler() {
    window.addEventListener('keyup', event => {
      const button = document.querySelector(`button[data-key="${event.keyCode}"]`);
      operandHandling(button.value);
      displayRefresh(toDisplay);
      button.classList.remove('buttonactive');
      });
    
  }

  // Refreshing display
  function displayRefresh(toDisplay) {
    const display = document.querySelector('#display');
      if (typeof toDisplay == 'number') {
        if(toDisplay.toString().length > 12 && (toDisplay > 999999999999)) {
            display.innerText = toDisplay.toExponential(6);
        } else if(toDisplay.toString().length > 12 && (toDisplay < 999999999999 && toDisplay > -999999999999)) {
            let decimalIndex = toDisplay.toString().indexOf('.');
            
            display.innerText = toDisplay.toFixed(12 - decimalIndex);
            // display.innerText = toDisplay.toString().slice(0,12);
        } else {
            display.innerText = toDisplay;
        }
      } else {
        display.innerText = toDisplay;
      }
  }

  // Handling operands
  // if value == AC
  // If value !0-9 or . 
  function operandHandling(input) {

    // INPUT 'AC'
    if (input == 'AC') {
      newOperand = '';
      oldOperand = '';
      reOperand = '';
      reOperator = '';
      operator = '';
      toDisplay = '0';
    }

    // INPUT 0-9 or '.'
    if (/[\d|.]/.test(input)) {

      // if input: . and already has one in the operand
      if (input == '.' && newOperand.indexOf('.') >= 0) {
      return;}

      // if operand empty and input: .
      if (newOperand == '' && input == '.') {
        newOperand = '0.';
        toDisplay = newOperand;
      return;}

      if (newOperand == '-' && input == '.') {
        newOperand = '-0.';
        toDisplay = newOperand;
      return;}
      
      // operand can't start with zeros (eg. 00, 000)
      if (newOperand.length == 1 && newOperand[0] == '0' && input == '0') {
        return;
      }
      
      // operand can't start with zeros except 0.xxx
      if (newOperand.length == 1 && newOperand[0] == '0' && newOperand[1] !== '0' && input !== '.') {
        newOperand = input;
        toDisplay = newOperand;
        return;
      }

      // if oldOperand has value, but there is no operator
      if (oldOperand && !operator) {
        return;
      }

      // Enter '-' before numbers
      if (!oldOperand && !newOperand && input == '-') {
        newOperand = newOperand * -1;
        
      }

      // can't enter a number longer than 12 character
      if (newOperand.length > 11) {
        return;
      } else {
      newOperand += input;
      toDisplay = newOperand;
      }
    }
    // ENDOF If input == 0-9 or .

    // INPUT %
    if(input == '%') {
      if (oldOperand && operator && newOperand) {
        oldOperand = doOperation(oldOperand, operator, newOperand);
        toDisplay = oldOperand;
        operator = input;
        newOperand = '';
      }
      oldOperand = doOperation(oldOperand, input, newOperand);
      toDisplay = oldOperand;
      newOperand = '';
      operator = '';
    }

    // INPUT =
    if (input == '=') {
      

      if (!operator && !newOperand && !oldOperand && oldOperand !== 0) {
        return;
      } else if ((!oldOperand && oldOperand !== 0) || (operator && !newOperand)) {
        return;
      } else if((oldOperand || oldOperand == 0) && !operator){
        oldOperand = doOperation(oldOperand, reOperator, reOperand);
        toDisplay = oldOperand;
        console.log('fhaszom')

      } else {
        oldOperand = doOperation(oldOperand, operator, newOperand);
        reOperand = newOperand.toString();
        reOperator = operator;
        toDisplay = oldOperand;
        newOperand = '';
        operator = '';
      
      } 
    }

    // INPUT * /
    if (/[*\/]/.test(input)){
      // if there are 2 operands with operator, evaluate them before add new operator
      if ((oldOperand !== '') && operator && newOperand && (newOperand !== '-')) {
        oldOperand = doOperation(oldOperand, operator, newOperand);
        toDisplay = oldOperand;
        operator = input;
        newOperand = '';
      } else if (newOperand && !operator) {
        oldOperand = newOperand;
        operator = input;
        newOperand = '';
      } else if (oldOperand && !operator) {
        operator = input;
      }
    }

    // INPUT + -
    if (/[+\-]/.test(input)){
      // if there are 2 operands with operator, evaluate them before add new operator
      if ((oldOperand !== '') && operator && newOperand && (newOperand !== '-')) {
        oldOperand = doOperation(oldOperand, operator, newOperand);
        toDisplay = oldOperand;
        operator = input;
        newOperand = '';
      }       
      // INPUT + with oldOperand and newOperand
      if (input == '+' && oldOperand == '' && newOperand == '-') {
          newOperand = '';
      }
      // INPUT - without operands
      if (input == '-' && (oldOperand == '' && oldOperand !== 0) && newOperand == '') {
          newOperand = input;
          toDisplay = newOperand;
      }

      // 1 new operand without operator
      if ((newOperand && newOperand !== '-' && !operator)) {
        operator = input;
          oldOperand = newOperand;
          newOperand = '';
      }
      
      // 1 old operand without operator
      if (oldOperand !== '' && !operator ) {
        if (input == '-') {
          operator = '-';
        } else {
          operator = '+'
        }
      }

      // INPUT - with old operand, with * or / operator, and without new operand
      if (input == '-' && oldOperand && /[*\/]/.test(operator) && !newOperand) {
          newOperand = input;
          toDisplay = newOperand;
      }
    }

    console.log('-------------------------')
    console.log('oldOperand: ' + oldOperand)
    console.log('oldOperand type: ' + typeof oldOperand)
    console.log('reOperand: ' + reOperand)
    console.log('reOperand type: ' + typeof reOperand)
    console.log('operator: ' + operator)
    console.log('reOperator: ' + reOperator)
    console.log('newOperand: ' + newOperand)
    console.log('-------------------------')

  }

  // Calling Event Listener Functions
  clickHandler();
  keyDownHandler();
  keyUpHandler();
}



calculator();

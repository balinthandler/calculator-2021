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
  let operand = '';
  // Mouse Click Watcher
  function clickHandler() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('click', event => {
        operand = button.value;
        return button.value;
      })
    })
  }
  
  // Keyboard keypress listener
  function keyDownHandler() {
    window.addEventListener('keydown', key => {
      const button = document.querySelector(`button[data-key="${key.keyCode}"]`);
      if (!button) return;
      button.classList.add('buttonactive');
      operand = button.value;
      return button.value;
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
    return operand;
  }

  // Calling Functions
  clickHandler();
  keyDownHandler();
  keyUpHandler();
}

inputHandler();

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


// Mouse Click Watcher
function clickWatcher() {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', event => {
      console.log(button.value);
      return button.value;
    })
  })
}

// Keyboard Listener
function keyDownHandler() {
  window.addEventListener('keydown', key => {
    const button = document.querySelector(`button[data-key="${key.keyCode}"]`);
    if (!button) return;
    console.log(button.value);
    button.classList.add('buttonactive');
  },{once: true});
}

// Activate keyDownHandler on release
function keyUpHandler() {
  window.addEventListener('keyup', keyDownHandler);

  const buttons = document.querySelectorAll('button');
  buttons.forEach(btn => btn.addEventListener('transitionend', removeTransition));
}

// Remove Transition on buttons
function removeTransition(e) {
  if (e.propertyName !== 'transfom'){
    this.classList.remove('buttonactive');
  }
} 

clickWatcher()
keyDownHandler();
keyUpHandler();

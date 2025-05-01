
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const section = document.querySelector(this.getAttribute('href'));
    section.scrollIntoView({ behavior: 'smooth' });
  });
});

  (function() {
    const display = document.getElementById('display');
    let currentInput = '';
    let lastInput = '';
    let operators = ['+', '-', '*', '/'];

    function updateDisplay() {
      display.textContent = currentInput || '0';
    }

    function clear() {
      currentInput = '';
      updateDisplay();
    }

    function appendNumber(num) {
      if (num === '.' && currentInput.includes('.')) return;
      currentInput += num;
      updateDisplay();
    }

    function appendOperator(op) {
      if (currentInput === '') return;
      const lastChar = currentInput.slice(-1);
      if (operators.includes(lastChar)) {
        currentInput = currentInput.slice(0, -1) + op;
      } else {
        currentInput += op;
      }
      updateDisplay();
    }

    function calculate() {
      if (!currentInput) return;
      // Remove trailing operator if any
      let expression = currentInput;
      while (operators.includes(expression.slice(-1))) {
        expression = expression.slice(0, -1);
      }
      try {
        // Use eval safely by restricting input to numbers and operators only
        if (/^[0-9+\-*/.\s]+$/.test(expression)) {
          let result = eval(expression);
          if (result === Infinity || result === -Infinity) {
            currentInput = 'Error';
          } else {
            currentInput = String(result);
          }
        } else {
          currentInput = 'Error';
        }
      } catch (e) {
        currentInput = 'Error';
      }
      updateDisplay();
    }

    document.querySelectorAll('.buttons button').forEach(button => {
      button.addEventListener('click', () => {
        const val = button.textContent;
        if (button.classList.contains('clear')) {
          clear();
        } else if (button.classList.contains('operator')) {
          appendOperator(val);
        } else if (button.classList.contains('equal')) {
          calculate();
        } else if (val >= '0' && val <= '9' || val === '.') {
          appendNumber(val);
        }
      });
    });

  })();
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = calculator.querySelector('.calculator__display');
let ancien = null;
let opérateur = null;
let opération = false;

keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const key = e.target;
    const keyValue = key.textContent;

    if (key.dataset.action === 'clear') {
      display.textContent = '0';
      ancien = null;
      opérateur = null;
      opération = false;
      return;
    }

    if (!isNaN(keyValue)) {
      if (display.textContent === '0' || opération) {
        display.textContent = keyValue;
        opération = false;
      } else {
        display.textContent += keyValue;
      }
      return;
    }

    if (key.classList.contains('key--operator')) {
      const currentValue = parseFloat(display.textContent);
      if (opérateur && !opération) {
        calculate(currentValue);
      } else {
        ancien = currentValue;
      }
      opérateur = keyValue;
      opération = true;
      return;
    }

    if (key.dataset.action === 'calculate') {
      const currentValue = parseFloat(display.textContent);
      if (opérateur && !opération) {
        calculate(currentValue);
        opérateur = null;
      } else {
        ancien = currentValue;
      }
      return;
    }
  }
});

function calculate(terme) {
  let résultat = 0;
  switch (opérateur) {
    case '+':
      résultat = ancien + terme;
      break;
    case '-':
      résultat = ancien - terme;
      break;
    case '×':
      résultat = ancien * terme;
      break;
    case '÷':
      if (terme === 0) {
        display.textContent = 'Erreur';
        return;
      }
      résultat = ancien / terme;
      break;
  }
  display.textContent = résultat;
  ancien = résultat;
  opération = true;
}


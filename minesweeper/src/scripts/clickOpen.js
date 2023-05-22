/* eslint-disable import/no-cycle */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
import
{
  randomArr, gameSound, gameIcon, emptysArr, qtyBoom, widthField, heightField,
}
  from './index.js';
import { showGameModal, checkIfwin } from './showGameModal.js';

const loseSound = new Audio('assets/sounds/lose-sound.mp3');

function clickOpen(cell, isOver, arrCells = randomArr) {
  const currentNumber = +cell.getAttribute('number');
  const currentId = +cell.id;
  const cells = document.querySelectorAll('.cell');
  if (cell.classList.contains('open') || cell.classList.contains('flag') || cell.classList.contains('boom')) return;
  if (arrCells[currentId] === 'boom') {
    if (gameSound.innerHTML !== 'OFF') loseSound.play();
    isOver = 'lose';
    showGameModal(isOver, arrCells, gameIcon);
  } else if (currentNumber === 0) {
    checkArea(currentId);
    cell.classList.add('open');
    if (currentNumber === 0) cell.style.backgroundColor = '#a6f1a6';
    cell.style.border = 'none';
    checkIfwin(arrCells, cells, emptysArr, qtyBoom, isOver);
  } else {
    cell.textContent = currentNumber;
    cell.classList.add('open');
    cell.style.border = 'none';
    addColor(currentNumber, cell);
    // if (currentNumber === 1) cell.style.backgroundColor = '#90ee90';
    // if (currentNumber === 2) cell.style.backgroundColor = '#C4E97D';
    // if (currentNumber === 3) cell.style.backgroundColor = '#FFDA84';
    // if (currentNumber === 4) cell.style.backgroundColor = '#FFC75F';
    // if (currentNumber === 5) cell.style.backgroundColor = '#FF9671';
    // if (currentNumber === 6) cell.style.backgroundColor = '#FF847D';
    // if (currentNumber === 7) cell.style.backgroundColor = '#FF6F91';
    // if (currentNumber === 8) cell.style.backgroundColor = '#D65DB1';
    checkIfwin(arrCells, cells, emptysArr, qtyBoom, isOver);
    // eslint-disable-next-line no-useless-return
    return;
  }
}

function checkArea(id) {
  const leftSide = id % widthField === 0;
  const rigthSide = id % widthField === widthField - 1;
  const topSide = (id / heightField) < 1;
  const bottomSide = (id / heightField) >= (heightField - 1);
  setTimeout(() => {
    if (!leftSide) {
      const newCell = document.getElementById(id - 1);
      clickOpen(newCell);
    }
    if (!rigthSide) {
      const newCell = document.getElementById(id + 1);
      clickOpen(newCell);
    }
    if (!topSide) {
      const newCell = document.getElementById(id - widthField);
      clickOpen(newCell);
    }
    if (!bottomSide) {
      const newCell = document.getElementById(id + widthField);
      clickOpen(newCell);
    }
    if (!topSide && !leftSide) {
      const newCell = document.getElementById(id - widthField - 1);
      clickOpen(newCell);
    }
    if (!topSide && !rigthSide) {
      const newCell = document.getElementById(id - widthField + 1);
      clickOpen(newCell);
    }
    if (!bottomSide && !leftSide) {
      const newCell = document.getElementById(id + widthField - 1);
      clickOpen(newCell);
    }
    if (!bottomSide && !rigthSide) {
      const newCell = document.getElementById(id + widthField + 1);
      clickOpen(newCell);
    }
  }, 5);
}

function addColor(number, cell) {
  if (number === 1) cell.style.backgroundColor = '#90ee90';
  if (number === 2) cell.style.backgroundColor = '#C4E97D';
  if (number === 3) cell.style.backgroundColor = '#FFDA84';
  if (number === 4) cell.style.backgroundColor = '#FFC75F';
  if (number === 5) cell.style.backgroundColor = '#FF9671';
  if (number === 6) cell.style.backgroundColor = '#FF847D';
  if (number === 7) cell.style.backgroundColor = '#FF6F91';
  if (number === 8) cell.style.backgroundColor = '#D65DB1';
}

export { clickOpen, addColor };

/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-return */
import generateNumbers from './generateNumbers.js';
import showGameModal from './showGameModal.js';

const body = document.querySelector('.body');
let isOver = '';
const sizeCell = 24;
const widthField = 10;
const heightField = 10;
const arrLenght = widthField * heightField;
const qtyBoom = 10;
const qtyFlag = qtyBoom;
let move = 0;

const lenghtEmptyArr = arrLenght - qtyBoom;
const boomArr = new Array(qtyBoom).fill('boom');
const cellsArr = new Array(lenghtEmptyArr).fill('empty');
const mainArr = boomArr.concat(cellsArr);
let randomArr;

const modal = document.createElement('div');
modal.className = 'modal hide';
body.insertAdjacentElement('afterbegin', modal);

const overlay = document.createElement('div');
overlay.className = 'overlay hide';
body.insertAdjacentElement('afterbegin', overlay);

const mainWrapper = document.createElement('div');
mainWrapper.className = 'wrapper';
body.append(mainWrapper);

const header = document.createElement('h1');
header.className = 'header';
header.textContent = 'RSS Minesweeper';
mainWrapper.insertAdjacentElement('beforeend', header);

const field = document.createElement('div');
field.className = 'minefield';
field.style.width = `${widthField * sizeCell}px`;
field.style.height = `${heightField * sizeCell}px`;
mainWrapper.insertAdjacentElement('beforeend', field);

const levelBox = document.createElement('div');
levelBox.className = 'level-wrapper';
header.insertAdjacentElement('afterend', levelBox);

const levelBeginner = document.createElement('a');
levelBeginner.setAttribute('width', 10);
levelBeginner.className = 'level-beginner btn';
levelBeginner.innerHTML = 'Easy';
levelBox.insertAdjacentElement('beforeend', levelBeginner);

const levelInt = document.createElement('a');
levelInt.setAttribute('width', 15);
levelInt.className = 'level-int btn';
levelInt.innerHTML = 'Medium';
levelBox.insertAdjacentElement('beforeend', levelInt);

const levelExpert = document.createElement('a');
levelExpert.setAttribute('width', 25);
levelExpert.className = 'level-expert btn';
levelExpert.innerHTML = 'Hard';
levelBox.insertAdjacentElement('beforeend', levelExpert);

const labelBomb = document.createElement('lable');
labelBomb.setAttribute('for', 'bomb-input');
labelBomb.className = 'lable-bomb-qty';
labelBomb.innerHTML = 'Bombs';
levelBox.insertAdjacentElement('beforeend', labelBomb);

const levelBomb = document.createElement('input');
levelBomb.setAttribute('id', 'bomb-input');
levelBomb.setAttribute('type', 'number');
levelBomb.setAttribute('min', 10);
levelBomb.setAttribute('max', 99);
levelBomb.className = 'level-bomb';
levelBomb.placeholder = '10';
levelBox.insertAdjacentElement('beforeend', levelBomb);

function init(sizeX, sizeY) {
  move = 0;
  randomArr = mainArr.sort(() => Math.random() - 0.5);
  for (let i = 0; i < sizeX * sizeY; i += 1) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = i;
    field.insertAdjacentElement('beforeend', cell);

    cell.addEventListener('click', () => {
      move += 1;
      console.log(move);
      if (move === 1) {
        console.log('first step', cell.id);
      }
      clickOpen(cell, randomArr);
    });

    cell.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      pickFlag(cell);
    });
  }
}
init(widthField, heightField);
generateNumbers(widthField, heightField, randomArr);

function pickFlag(cell) {
  if (!cell.classList.contains('open') && !cell.classList.contains('flag')) {
    cell.classList.add('flag');
    cell.insertAdjacentHTML('afterbegin', '<img src = \'assets/game-icons/red-flag.png\' width=16px height =18px>');
  } else if (!cell.classList.contains('open') && cell.classList.contains('flag')) {
    cell.classList.remove('flag');
    cell.innerHTML = '';
  }
  if (isOver === 'lose') return;
}

function clickOpen(cell, arrCells = randomArr) {
  const currentNumber = +cell.getAttribute('number');
  const currentId = +cell.getAttribute('id');
  if (cell.classList.contains('open') || cell.classList.contains('flag')) return;
  if (arrCells[currentId] === 'boom') {
    isOver = 'loose';
    showGameModal(isOver, arrCells);
  } else if (currentNumber === 0) {
    checkArea(currentId);
    cell.classList.add('open');
    if (currentNumber === 0) cell.style.backgroundColor = '#a6f1a6';
    cell.style.border = 'none';
  } else {
    cell.textContent = currentNumber;
    cell.classList.add('open');
    cell.style.border = 'none';
    if (currentNumber === 1) cell.style.backgroundColor = '#90ee90';
    if (currentNumber === 2) cell.style.backgroundColor = '#C4E97D';
    if (currentNumber === 3) cell.style.backgroundColor = '#FFDA84';
    if (currentNumber === 4) cell.style.backgroundColor = '#FFC75F';
    if (currentNumber === 5) cell.style.backgroundColor = '#FF9671';
    if (currentNumber === 6) cell.style.backgroundColor = '#FF847D';
    if (currentNumber === 7) cell.style.backgroundColor = '#FF6F91';
    if (currentNumber === 8) cell.style.backgroundColor = '#D65DB1';
    // eslint-disable-next-line no-useless-return
    return;
  }
}

function checkArea(id) {
  const leftSide = id % widthField === 0;
  const rigthSide = id % widthField === widthField - 1;
  const topSide = id / heightField < 1;
  const bottomSide = id / heightField >= heightField - 1;
  setTimeout(() => {
    if (!leftSide) {
      const newId = id - 1;
      const newCell = document.getElementById(newId);
      clickOpen(newCell);
    }
    if (!rigthSide) {
      const newId = id + 1;
      const newCell = document.getElementById(newId);
      clickOpen(newCell);
    }
    if (!topSide) {
      const newId = id - widthField;
      const newCell = document.getElementById(newId);
      clickOpen(newCell);
    }
    if (!bottomSide) {
      const newId = id + widthField;
      const newCell = document.getElementById(newId);
      clickOpen(newCell);
    }
    if (!topSide && !leftSide) {
      const newId = id - widthField - 1;
      const newCell = document.getElementById(newId);
      clickOpen(newCell);
    }
    if (!topSide && !rigthSide) {
      const newId = id - widthField + 1;
      const newCell = document.getElementById(newId);
      clickOpen(newCell);
    }
    if (!bottomSide && !leftSide) {
      const newId = id + widthField - 1;
      const newCell = document.getElementById(newId);
      clickOpen(newCell);
    }
    if (!bottomSide && !rigthSide) {
      const newId = id + widthField + 1;
      const newCell = document.getElementById(newId);
      clickOpen(newCell);
    }
  }, 20);
}

function closeModal(e) {
  const { target } = e;
  if (target.classList.contains('overlay')) {
    document.querySelector('.overlay').classList.add('hide');
    document.querySelector('.modal').classList.add('hide');
  }
}

document.addEventListener('click', closeModal);

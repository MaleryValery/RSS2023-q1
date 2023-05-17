/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-return */
import generateNumbers from './generateNumbers.js';
import { showGameModal, checkIfwin } from './showGameModal.js';

const body = document.querySelector('.body');
let isOver = '';
const sizeCell = 24;
const widthField = 5;
const heightField = 5;
const arrLenght = widthField * heightField;

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

const qtyBoom = +levelBomb.textContent || 10;
const qtyFlag = qtyBoom;
let move = 0;

const lenghtEmptyArr = arrLenght - qtyBoom;
const boomArr = new Array(qtyBoom).fill('boom');
const emptysArr = new Array(lenghtEmptyArr).fill('empty');
const mainArr = boomArr.concat(emptysArr);
let randomArr;
let chengetArr;
console.log(levelBomb.value);

function init(sizeX, sizeY) {
  move = 0;
  const tempArr = [];
  randomArr = mainArr.sort(() => Math.random() - 0.5);
  for (let i = 0; i < randomArr.length; i += 1) {
    if (randomArr[i] === 'empty') tempArr.push(i);
  }
  console.log(randomArr);
  for (let i = 0; i < sizeX * sizeY; i += 1) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = i;
    field.insertAdjacentElement('beforeend', cell);

    // eslint-disable-next-line no-loop-func
    cell.addEventListener('click', () => {
      move += 1;
      console.log(move);
      if (move === 1 && randomArr[cell.id] === 'boom') {
        const firstBoom = cell.id;
        const index = Math.floor(Math.random() * tempArr.length);
        randomArr[tempArr[index]] = 'boom';
        randomArr[firstBoom] = 'empty';
        chengetArr = [...randomArr];
        generateNumbers(widthField, heightField, chengetArr);
      }
      clickOpen(cell, chengetArr);
    });

    cell.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      pickFlag(cell, qtyFlag);
    });
  }
}
init(widthField, heightField);

generateNumbers(widthField, heightField, randomArr);

function pickFlag(cell, flags) {
  if (!cell.classList.contains('open') && !cell.classList.contains('flag')) {
    cell.classList.add('flag');
    cell.insertAdjacentHTML('afterbegin', '<img src = \'assets/game-icons/red-flag.png\' width=16px height =18px>');
    flags -= 1;
  } else if (!cell.classList.contains('open') && cell.classList.contains('flag')) {
    cell.classList.remove('flag');
    cell.innerHTML = '';
    flags += 1;
  }
  if (isOver === 'lose' || isOver === 'win') return;
}

function clickOpen(cell, arrCells = randomArr) {
  const currentNumber = +cell.getAttribute('number');
  const currentId = +cell.getAttribute('id');
  const cells = document.querySelectorAll('.cell');
  if (cell.classList.contains('open') || cell.classList.contains('flag') || cell.classList.contains('boom')) return;
  if (arrCells[currentId] === 'boom') {
    isOver = 'loose';
    showGameModal(isOver, arrCells);
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
    if (currentNumber === 1) cell.style.backgroundColor = '#90ee90';
    if (currentNumber === 2) cell.style.backgroundColor = '#C4E97D';
    if (currentNumber === 3) cell.style.backgroundColor = '#FFDA84';
    if (currentNumber === 4) cell.style.backgroundColor = '#FFC75F';
    if (currentNumber === 5) cell.style.backgroundColor = '#FF9671';
    if (currentNumber === 6) cell.style.backgroundColor = '#FF847D';
    if (currentNumber === 7) cell.style.backgroundColor = '#FF6F91';
    if (currentNumber === 8) cell.style.backgroundColor = '#D65DB1';
    checkIfwin(arrCells, cells, emptysArr, qtyBoom, isOver);
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

// function checkIfwin(arr, cells, emptysArr, gameStatus) {
//   let cellOpen = 0;
//   cells.forEach((cell, i) => {
//     if (cell.classList.contains('open') && arr[i] !== 'boom') {
//       cellOpen += 1;
//       console.log(cellOpen, emptysArr.length);
//     }
//     if (cellOpen === emptysArr.length) {
//       gameStatus = 'win';
//       console.log(gameStatus, gameStatus === 'win');
//       showGameModal(gameStatus, arr);
//     }
//   });
// }

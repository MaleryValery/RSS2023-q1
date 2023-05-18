/* eslint-disable no-loop-func */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-return */
import { showGameModal, checkIfwin } from './showGameModal.js';
import generateNumbers from './generateNumbers.js';
import changeWidth from './changeWidth.js';

const body = document.querySelector('.body');
let isOver = '';
let sizeCell;
let widthField = 10;
let heightField = 10;
document.addEventListener('DOMContentLoaded', () => {
  const { innerWidth } = window;
  changeWidth(innerWidth, sizeCell, field, widthField, heightField);
});
window.addEventListener('resize', (e) => {
  const { innerWidth } = e.target;
  changeWidth(innerWidth, sizeCell, field, widthField, heightField);
});

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
// field.style.width = `${widthField * sizeCell}px`;
// field.style.height = `${heightField * sizeCell}px`;
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

const settingBox = document.createElement('div');
settingBox.className = 'level-wrapper';
levelBox.insertAdjacentElement('afterend', settingBox);

const gameTimer = document.createElement('div');
gameTimer.className = 'timer';
gameTimer.innerHTML = 0;
settingBox.insertAdjacentElement('beforeend', gameTimer);

const gameIcon = document.createElement('div');
gameIcon.className = 'game-icon';
// gameIcon.innerHTML = '<img src = \'assets/game-icons/init-game.png\'>';
settingBox.insertAdjacentElement('beforeend', gameIcon);

const gameMove = document.createElement('div');
gameMove.className = 'move';
gameMove.innerHTML = 0;
settingBox.insertAdjacentElement('beforeend', gameMove);

const gameFlag = document.createElement('div');
gameFlag.className = 'flags';
gameFlag.innerHTML = 'gameFlag';
settingBox.insertAdjacentElement('beforeend', gameFlag);

let arrLenght;
let qtyBoom;
let qtyFlag;
let move;

let lenghtEmptyArr;
let boomArr;
let emptysArr;
let randomArr;
let timer;

function init(sizeWidth = 10, sizeHeight = 10, booms = 10) {
  isOver = '';
  field.innerHTML = '';
  booms = +levelBomb.value || 10;
  arrLenght = sizeWidth * sizeHeight;
  lenghtEmptyArr = arrLenght - booms;
  boomArr = new Array(booms).fill('boom');
  emptysArr = new Array(lenghtEmptyArr).fill('empty');
  randomArr = boomArr.concat(emptysArr).sort(() => Math.random() - 0.5);
  move = 0;
  qtyFlag = booms;

  const tempArr = [];
  // randomArr = mainArr.sort(() => Math.random() - 0.5);
  for (let i = 0; i < randomArr.length; i += 1) {
    if (randomArr[i] === 'empty') tempArr.push(i);
  }
  for (let i = 0; i < sizeWidth * sizeHeight; i += 1) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = i;
    field.insertAdjacentElement('beforeend', cell);
    cell.addEventListener('click', () => {
      countMoves(isOver, cell);
      if (move === 1 && randomArr[cell.id] === 'boom') {
        const firstBoom = cell.id;
        const index = Math.floor(Math.random() * tempArr.length);
        randomArr[tempArr[index]] = 'boom';
        randomArr[firstBoom] = 'empty';
        generateNumbers(widthField, heightField, randomArr);
      }
      setTimer(timer);
      clickOpen(cell, randomArr);
    });

    cell.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      pickFlag(cell, qtyFlag);
    });
  }
}
init(widthField, heightField);
generateNumbers(widthField, heightField, randomArr);

function restartGame() {
  const minefield = document.querySelector('.minefield');
  clearTimer();
  timer = 0;
  move = 0;
  gameMove.innerHTML = 0;
  gameTimer.innerHTML = 0;
  gameIcon.innerHTML = '';
  minefield.innerHTML = '';
  init(widthField, heightField);
  generateNumbers(widthField, heightField, randomArr);
}

function changeSize(e) {
  const { target } = e;
  const btns = document.querySelectorAll('.btn');
  if (target.classList.contains('btn')) {
    if (!target.classList.contains('active')) {
      btns.forEach((el) => el.classList.remove('active'));
      target.classList.add('active');
      widthField = +target.getAttribute('width');
      heightField = +target.getAttribute('width');
      restartGame();
      changeWidth(innerWidth, sizeCell, field, widthField, heightField);
    } else {
      target.classList.remove('active');
      widthField = 10;
      heightField = 10;
      restartGame();
      changeWidth(innerWidth, sizeCell, field, widthField, heightField);
    }
  }
}

function pickFlag(cell, flags) {
  if (!cell.classList.contains('open') && !cell.classList.contains('flag')) {
    cell.classList.add('flag');
    cell.insertAdjacentHTML('afterbegin', '<img src = \'assets/game-icons/red-flag.png\' width=14px height =16px>');
    flags -= 1;
  } else if (!cell.classList.contains('open') && cell.classList.contains('flag')) {
    cell.classList.remove('flag');
    cell.innerHTML = '';
    flags += 1;
  }
  if (isOver === 'lose' || isOver === 'win') return;
}

function setTimer() {
  if (timer) return;
  let time = 0;
  timer = setInterval(() => {
    time += 1;
    gameTimer.innerHTML = time;
  }, 1000);
}

function clearTimer() {
  clearInterval(timer);
}

function countMoves(isOver, cell) {
  if (cell.classList.contains('open') || cell.classList.contains('flag')) return
  if (isOver === 'win' || isOver === 'lose') return;
  move += 1;
  gameMove.innerHTML = move;
  console.log(isOver);
}

function clickOpen(cell, arrCells = randomArr) {
  const currentNumber = +cell.getAttribute('number');
  const currentId = +cell.id;
  const cells = document.querySelectorAll('.cell');
  if (cell.classList.contains('open') || cell.classList.contains('flag') || cell.classList.contains('boom')) return;
  if (arrCells[currentId] === 'boom') {
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

function closeModal(e) {
  const { target } = e;
  if (target.classList.contains('overlay')) {
    document.querySelector('.overlay').classList.add('hide');
    document.querySelector('.modal').classList.add('hide');
    body.classList.remove('no-scroll');
  }
}

document.addEventListener('click', closeModal);
gameIcon.addEventListener('click', restartGame);
levelBomb.addEventListener('change', (e) => {
  e.preventDefault();
  init(widthField, heightField, levelBomb.value);
  generateNumbers(widthField, heightField, randomArr);
});
levelBox.addEventListener('click', (e) => {
  e.preventDefault();
  changeSize(e);
});

export { timer, clearTimer};

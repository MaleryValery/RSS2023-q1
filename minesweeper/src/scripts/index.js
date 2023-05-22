/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/no-cycle */
/* eslint-disable no-loop-func */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-return */
import generateNumbers from './generateNumbers.js';
import changeWidth from './changeWidth.js';
import { clickOpen, addColor } from './clickOpen.js';
import { getWinResult } from './showGameModal.js';

const clickSound = new Audio('assets/sounds/click-soundCrop.mp3');
const flagSound = new Audio('assets/sounds/flag-soundCrop.mp3');
const restartSound = new Audio('assets/sounds/restart-soundCrop.mp3');

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
mainWrapper.insertAdjacentElement('beforeend', field);

const levelBox = document.createElement('div');
levelBox.className = 'level-wrapper';
header.insertAdjacentElement('afterend', levelBox);

const themeSwicher = document.createElement('div');
themeSwicher.className = 'theme';
themeSwicher.innerHTML = '<img src=\'assets/game-icons/dark2.png\' alt=\'theme\'/>';
levelBox.insertAdjacentElement('beforeend', themeSwicher);

const levelBeginner = document.createElement('div');
levelBeginner.setAttribute('width', 10);
levelBeginner.className = 'level-beginner btn';
levelBeginner.innerHTML = '<img src=\'assets/game-icons/easy.png\' alt=\'eay\'/>';
levelBox.insertAdjacentElement('beforeend', levelBeginner);

const levelInt = document.createElement('div');
levelInt.setAttribute('width', 15);
levelInt.className = 'level-int btn';
levelInt.innerHTML = '<img src=\'assets/game-icons/inter.png\' alt=\'eay\'/>';
levelBox.insertAdjacentElement('beforeend', levelInt);

const levelExpert = document.createElement('div');
levelExpert.setAttribute('width', 25);
levelExpert.className = 'level-expert btn';
levelExpert.innerHTML = '<img src=\'assets/game-icons/hard.png\' alt=\'eay\'/>';
levelBox.insertAdjacentElement('beforeend', levelExpert);

const labelBomb = document.createElement('lable');
labelBomb.setAttribute('for', 'bomb-input');
labelBomb.className = 'lable-bomb-qty';
labelBomb.innerHTML = '<img src=\'assets/game-icons/hard2.png\' alt=\'eay\'/>';
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
settingBox.className = 'wrapper-current-game';
levelBox.insertAdjacentElement('afterend', settingBox);

const gameSound = document.createElement('div');
gameSound.className = 'sound setiing';
gameSound.innerHTML = 'OFF';
settingBox.insertAdjacentElement('beforeend', gameSound);

const gameTimer = document.createElement('div');
gameTimer.className = 'timer setiing';
gameTimer.innerHTML = 0;
settingBox.insertAdjacentElement('beforeend', gameTimer);

const gameIcon = document.createElement('div');
gameIcon.className = 'game-icon';
settingBox.insertAdjacentElement('beforeend', gameIcon);

const gameMove = document.createElement('div');
gameMove.className = 'move setiing';
gameMove.innerHTML = 0;
settingBox.insertAdjacentElement('beforeend', gameMove);

const gameFlag = document.createElement('div');
gameFlag.className = 'flags setiing';
gameFlag.innerHTML = '0';
settingBox.insertAdjacentElement('beforeend', gameFlag);

const saveGame = document.createElement('button');
saveGame.className = 'save';
saveGame.innerHTML = 'save';
field.insertAdjacentElement('afterend', saveGame);

const continueGame = document.createElement('button');
continueGame.className = 'continue';
continueGame.innerHTML = 'continue';
saveGame.insertAdjacentElement('afterend', continueGame);

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
  qtyBoom = booms;
  getWinResult();
  const tempArr = [];

  for (let i = 0; i < randomArr.length; i += 1) {
    if (randomArr[i] === 'empty') tempArr.push(i);
  }
  for (let i = 0; i < sizeWidth * sizeHeight; i += 1) {
    const cell = document.createElement('div');
    if (body.hasAttribute('theme')) {
      cell.className = 'cell dark';
    } else cell.className = 'cell';
    cell.id = i;
    field.insertAdjacentElement('beforeend', cell);
    cell.addEventListener('click', () => {
      countMoves(cell);
      setTimer(timer);
      if (gameSound.innerHTML !== 'OFF') {
        if (!cell.classList.contains('open')) {
          clickSound.play();
        }
        if (cell.classList.contains('flag') || cell.classList.contains('boom')) clickSound.pause();
      }
      if (move === 1) {
        qtyFlag = booms;
        gameFlag.innerHTML = qtyFlag;
      }
      if (move === 1 && randomArr[cell.id] === 'boom') {
        const firstBoom = cell.id;
        const index = Math.floor(Math.random() * tempArr.length);
        randomArr[tempArr[index]] = 'boom';
        randomArr[firstBoom] = 'empty';
        generateNumbers(widthField, heightField, randomArr);
      }
      clickOpen(cell, isOver, randomArr);
    });

    cell.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      pickFlag(cell);
    });
  }
}
init(widthField, heightField);
generateNumbers(widthField, heightField, randomArr);

function restartGame() {
  const minefield = document.querySelector('.minefield');
  clearTimer();
  if (gameSound.innerHTML !== 'OFF') restartSound.play();
  timer = 0;
  move = 0;
  gameMove.innerHTML = 0;
  gameTimer.innerHTML = 0;
  gameIcon.innerHTML = '';
  gameFlag.innerHTML = 0;
  minefield.innerHTML = '';
  init(widthField, heightField);
  generateNumbers(widthField, heightField, randomArr);
}

function changeBombQty(e) {
  e.preventDefault();
  if (+levelBomb.value > e.target.getAttribute('max')) levelBomb.value = 99;
  if (+levelBomb.value < e.target.getAttribute('min')) levelBomb.value = 10;
  gameIcon.innerHTML = '';
  init(widthField, heightField, levelBomb.value);
  generateNumbers(widthField, heightField, randomArr);
}

function changeSize(e) {
  let { target } = e;
  const btns = document.querySelectorAll('.btn');
  if (target.closest('.btn')) {
    target = target.closest('.btn');
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

function pickFlag(cell) {
  if (move === 0 || cell.classList.contains('open') || cell.classList.contains('boom')) return;
  if (gameSound.innerHTML !== 'OFF') flagSound.play();
  if (!cell.classList.contains('open') && !cell.classList.contains('flag')) {
    if (qtyFlag === 0) return;
    cell.classList.add('flag');
    cell.insertAdjacentHTML('afterbegin', '<img src = \'assets/game-icons/red-flag.png\' width=14px height =16px>');
    qtyFlag -= 1;
    gameFlag.innerHTML = qtyFlag;
  } else if (!cell.classList.contains('open') && cell.classList.contains('flag')) {
    cell.classList.remove('flag');
    cell.innerHTML = '';
    qtyFlag += 1;
    gameFlag.innerHTML = qtyFlag;
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

function countMoves(cell) {
  if (cell.classList.contains('open') || cell.classList.contains('flag')) return;
  if (isOver === 'win' || isOver === 'lose') return;
  move += 1;
  gameMove.innerHTML = move;
}

function playSound(e) {
  const { target } = e;
  if (target.innerHTML === 'OFF') {
    target.innerHTML = 'ON';
  } else target.innerHTML = 'OFF';
}

function changeTheme() {
  const cells = document.querySelectorAll('.cell');
  if (body.hasAttribute('theme')) {
    body.removeAttribute('theme');
    cells.forEach((cell) => {
      cell.classList.remove('dark');
    });
    themeSwicher.innerHTML = '<img src=\'assets/game-icons/dark2.png\' alt=\'theme\'/>';
  } else {
    body.setAttribute('theme', 'dark');
    themeSwicher.innerHTML = '<img src=\'assets/game-icons/light.png\' alt=\'theme\'/>';
    cells.forEach((cell) => {
      cell.classList.add('dark');
    });
  }
}

function closeModal(e) {
  const { target } = e;
  if (target.classList.contains('overlay')) {
    document.querySelector('.overlay').classList.add('hide');
    document.querySelector('.modal').classList.add('hide');
    body.classList.remove('no-scroll');
  }
}

gameSound.addEventListener('click', playSound);
themeSwicher.addEventListener('click', changeTheme);
document.addEventListener('click', closeModal);
gameIcon.addEventListener('click', restartGame);
levelBomb.addEventListener('change', changeBombQty);
levelBox.addEventListener('click', (e) => {
  e.preventDefault();
  changeSize(e);
});

saveGame.addEventListener('click', (e) => {
  e.preventDefault();
  const cells = document.querySelectorAll('.cell');
  const btns = document.querySelectorAll('.btn');
  const saveTimer = document.querySelector('.timer');
  const saveSound = document.querySelector('.sound');
  const saveMove = document.querySelector('.move');
  const saveFlags = document.querySelector('.flags');
  const mainRandomArr = [...randomArr];
  const tempClassArr = [];
  const tempBtnsActive = [];
  cells.forEach((cell) => {
    tempClassArr.push(cell.className);
  });
  btns.forEach((btn) => {
    tempBtnsActive.push(btn.className);
  });
  localStorage.setItem('fieldSize', JSON.stringify(tempBtnsActive));
  localStorage.setItem('mainArr', JSON.stringify(mainRandomArr));
  localStorage.setItem('classArr', JSON.stringify(tempClassArr));
  localStorage.setItem('saveTime', +saveTimer.innerHTML);
  localStorage.setItem('sound', saveSound.innerHTML);
  localStorage.setItem('move', +saveMove.innerHTML);
  localStorage.setItem('flags', +saveFlags.innerHTML);
});

continueGame.addEventListener('click', (e) => {
  e.preventDefault();
  if (localStorage.getItem('mainArr') !== null) {
    continueGame.disabled = false;
    continueSavedGame();
  } else {
    continueGame.disabled = true;
  }
});

function continueSavedGame() {
  const saveTimer = document.querySelector('.timer');
  const saveSound = document.querySelector('.sound');
  const saveMove = document.querySelector('.move');
  const saveFlags = document.querySelector('.flags');
  const btns = document.querySelectorAll('.btn');

  const saveSizeField = JSON.parse(localStorage.getItem('fieldSize'));
  const sevedGame = JSON.parse(localStorage.getItem('mainArr'));
  const sevedClasses = JSON.parse(localStorage.getItem('classArr'));

  field.innerHTML = '';
  init(Math.sqrt(sevedGame.length), Math.sqrt(sevedGame.length), sevedGame);
  changeWidth(innerWidth, sizeCell, field, Math.sqrt(sevedGame.length), Math.sqrt(sevedGame.length))
  generateNumbers(Math.sqrt(sevedGame.length), Math.sqrt(sevedGame.length), sevedGame);
  
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, i) => {
    cell.className = sevedClasses[i];
    if (cell.classList.contains('open')) {
      const currentNumber = cell.getAttribute('number');
      if (currentNumber === 0) {
        cell.innerHTML = '';
      } else cell.innerHTML = currentNumber;
      addColor(currentNumber, cell);
    }
  });
  btns.forEach((btn, i) => {
    btn.className = saveSizeField[i];
  });
  saveTimer.innerHTML = localStorage.getItem('saveTime');
  saveSound.innerHTML = localStorage.getItem('sound');
  saveMove.innerHTML = localStorage.getItem('move');
  saveFlags.innerHTML = localStorage.getItem('flags');
}

export {
  timer, clearTimer, randomArr, gameSound, isOver, gameIcon, emptysArr, qtyBoom,
  widthField, heightField,
};

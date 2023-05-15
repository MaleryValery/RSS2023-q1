/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
const body = document.querySelector('.body');
let isOver = '';
const sizeBtn = 24;
const widthField = 10;
const heightField = 10;
const arrLenght = widthField * heightField;
const qtyBoom = 20;

const lenghtEmptyArr = arrLenght - qtyBoom;
const boomArr = new Array(qtyBoom).fill('boom');
const cellsArr = new Array(lenghtEmptyArr).fill('empty');
const mainArr = boomArr.concat(cellsArr);
const randomArr = mainArr.sort(() => Math.random() - 0.5);

function init(sizeX, sizeY, size) {
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
  field.style.width = `${sizeX * size}px`;
  field.style.height = `${sizeY * size}px`;
  mainWrapper.insertAdjacentElement('beforeend', field);

  const levelBox = document.createElement('div');
  levelBox.className = 'level-wrapper';
  mainWrapper.insertAdjacentElement('beforeend', levelBox);

  const levelBeginner = document.createElement('button');
  levelBeginner.className = 'level-beginner btn';
  levelBeginner.innerHTML = 'Beginner';
  levelBox.insertAdjacentElement('beforeend', levelBeginner);

  const levelInt = document.createElement('button');
  levelInt.className = 'level-int btn';
  levelInt.innerHTML = 'Intermediate';
  levelBox.insertAdjacentElement('beforeend', levelInt);

  const levelExpert = document.createElement('button');
  levelExpert.className = 'level-expert btn';
  levelExpert.innerHTML = 'Expert';
  levelBox.insertAdjacentElement('beforeend', levelExpert);

  for (let i = 0; i < sizeX * sizeY; i += 1) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = i;
    cell.classList.add(randomArr[i]);
    field.insertAdjacentElement('beforeend', cell);

    cell.addEventListener('click', () => {
      // eslint-disable-next-line no-use-before-define
      clickOpen(cell);
    });
  }
}

init(widthField, heightField, sizeBtn);

console.log(randomArr);

function generateNumbers() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, i, arr) => {
    let countBoom = 0;
    const leftSide = i % widthField === 0;
    const rigthSide = i % widthField === widthField - 1;
    const topSide = i / heightField < 1;
    const bottomSide = i / heightField >= heightField - 1;
    if (!cell.classList.contains('boom')) {
      if (!topSide && arr[i - widthField].classList.contains('boom')) countBoom += 1;
      if (!bottomSide && arr[i + widthField].classList.contains('boom')) countBoom += 1;
      if (!leftSide && arr[i - 1].classList.contains('boom')) countBoom += 1;
      if (!rigthSide && arr[i + 1].classList.contains('boom')) countBoom += 1;
      if (!topSide && !leftSide && arr[i - widthField - 1].classList.contains('boom')) countBoom += 1;
      if (!topSide && !rigthSide && arr[i - widthField + 1].classList.contains('boom')) countBoom += 1;
      if (!bottomSide && !leftSide && arr[i + widthField - 1].classList.contains('boom')) countBoom += 1;
      if (!bottomSide && !rigthSide && arr[i + widthField + 1].classList.contains('boom')) countBoom += 1;
      cell.setAttribute('number', countBoom);
    }
  });
}
generateNumbers();

function showGameModal(flag) {
  if (flag === 'loose') {
    document.querySelector('.overlay').classList.remove('hide');
    document.querySelector('.modal').classList.remove('hide');
    document.querySelector('.modal').innerHTML = '\nYou lose! Try again!\n';
    document.querySelector('.modal')
      // eslint-disable-next-line quotes
      .insertAdjacentHTML('afterbegin', `<img src='assets/game-icons/boom.png' alt='Boom'/>`);
  }
  if (flag === 'win') {
    document.querySelector('.modal').innerHTML = '\nYou win! Well done!\n';

    document.querySelector('.modal')
      // eslint-disable-next-line quotes
      .insertAdjacentHTML('afterbegin', `<img src='assets/game-icons/winner.png' alt='winner'/>`);
  }
}

function closeModal(e) {
  const { target } = e;
  if (target.classList.contains('overlay')) {
    document.querySelector('.overlay').classList.add('hide');
    document.querySelector('.modal').classList.add('hide');
  }
}

function clickOpen(cell) {
  console.log(cell);
  const currentNumber = +cell.getAttribute('number');
  const currentId = +cell.getAttribute('id');
  console.log(cell, currentId);
  if (cell.classList.contains('cell')) {
    if (cell.classList.contains('open')) return;
    if (cell.classList.contains('boom')) {
      isOver = 'loose';
      showGameModal(isOver);
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
}
function checkArea(id) {
  const leftSide = id % widthField === 0;
  const rigthSide = id % widthField === widthField - 1;
  const topSide = id / heightField < 1;
  const bottomSide = id / heightField >= heightField - 1;
  setTimeout(() => {
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

document.addEventListener('click', closeModal);

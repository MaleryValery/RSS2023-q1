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
    // eslint-disable-next-line quotes
    document.querySelector('.modal').insertAdjacentHTML('afterbegin', `<img src='assets/game-icons/boom.png' alt='Boom'/>`);
  }
  if (flag === 'win') {
    document.querySelector('.modal').innerHTML = '\nYou win! Well done!\n';
    // eslint-disable-next-line quotes
    document.querySelector('.modal').insertAdjacentHTML('afterbegin', `<img src='assets/game-icons/winner.png' alt='winner'/>`);
  }
}

function closeModal(e) {
  const {
    target
  } = e;
  if (target.classList.contains('overlay')) {
    document.querySelector('.overlay').classList.add('hide');
    document.querySelector('.modal').classList.add('hide');
  }
}

function clickOpen(e) {
  const { target } = e;
  const currentCell = target.id;
  console.log(target);
  if (target.classList.contains('cell')) {
    if (target.classList.contains('open')) return;
    if (target.classList.contains('boom')) {
      isOver = 'loose';
      showGameModal(isOver);
    } else if (+target.getAttribute('number') === 0) {
      console.log('!');
    }
    target.classList.add('open');
  }
}

document.addEventListener('click', clickOpen);

document.addEventListener('click', closeModal);
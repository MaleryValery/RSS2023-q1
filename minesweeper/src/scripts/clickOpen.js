import showGameModal from './isOver.js';

function clickOpen(cell, randomArr, gameStatus, widthField, heightField) {
  console.log(cell);
  const currentNumber = +cell.getAttribute('number');
  const currentId = +cell.getAttribute('id');
  console.log(cell, currentId);
  if (cell.classList.contains('open') || cell.classList.contains('flag')) return;
  if (randomArr[cell.id] === 'boom') {
    gameStatus = 'loose';
    showGameModal(gameStatus);
  } else if (currentNumber === 0) {
    checkArea(currentId, widthField, heightField);
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

function checkArea(id, widthField, heightField) {
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

export default clickOpen;

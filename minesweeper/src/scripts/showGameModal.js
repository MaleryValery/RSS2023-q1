/* eslint-disable no-param-reassign */
function showGameModal(gameStatus, arr) {
  const cells = document.querySelectorAll('.cell');
  if (gameStatus === 'loose') {
    cells.forEach((el, i) => {
      const qtyBomb = +el.getAttribute('number');
      if (arr[i] === 'boom') {
        el.classList.add('boom');
        if (el.classList.contains('boom') && !el.classList.contains('flag')) {
          el.insertAdjacentHTML('afterbegin', '<img src = \'assets/game-icons/bomb.png\' width=22px height =22px>');
        }
      } else {
        el.classList.add('open');
        el.style.border = 'none';
        el.innerHTML = qtyBomb === 0 ? '' : qtyBomb;
        if (qtyBomb === 1) el.style.backgroundColor = '#90ee90';
        if (qtyBomb === 2) el.style.backgroundColor = '#C4E97D';
        if (qtyBomb === 3) el.style.backgroundColor = '#FFDA84';
        if (qtyBomb === 4) el.style.backgroundColor = '#FFC75F';
        if (qtyBomb === 5) el.style.backgroundColor = '#FF9671';
        if (qtyBomb === 6) el.style.backgroundColor = '#FF847D';
        if (qtyBomb === 7) el.style.backgroundColor = '#FF6F91';
        if (qtyBomb === 8) el.style.backgroundColor = '#D65DB1';
      }
    });
    document.querySelector('.overlay').classList.remove('hide');
    document.querySelector('.modal').classList.remove('hide');
    document.querySelector('.modal').innerHTML = '\nYou lose! Try again!\n';
    document.querySelector('.modal')
      // eslint-disable-next-line quotes
      .insertAdjacentHTML('afterbegin', `<img src='assets/game-icons/boom.png' alt='Boom'/>`);
  }
  if (gameStatus === 'win') {
    cells.forEach((el, i) => {
      const qtyBomb = +el.getAttribute('number');
      if (arr[i] === 'boom') {
        el.classList.add('boom');
        if (el.classList.contains('boom') && !el.classList.contains('flag')) {
          el.innerHTML = '';
          el.insertAdjacentHTML('afterbegin', '<img src = \'assets/game-icons/red-flag.png\' width=18px height =18px>');
        }
      } else {
        el.classList.add('open');
        el.style.border = 'none';
        el.innerHTML = qtyBomb === 0 ? '' : qtyBomb;
        if (qtyBomb === 1) el.style.backgroundColor = '#90ee90';
        if (qtyBomb === 2) el.style.backgroundColor = '#C4E97D';
        if (qtyBomb === 3) el.style.backgroundColor = '#FFDA84';
        if (qtyBomb === 4) el.style.backgroundColor = '#FFC75F';
        if (qtyBomb === 5) el.style.backgroundColor = '#FF9671';
        if (qtyBomb === 6) el.style.backgroundColor = '#FF847D';
        if (qtyBomb === 7) el.style.backgroundColor = '#FF6F91';
        if (qtyBomb === 8) el.style.backgroundColor = '#D65DB1';
      }
    });
    document.querySelector('.overlay').classList.remove('hide');
    document.querySelector('.modal').classList.remove('hide');
    document.querySelector('.modal').innerHTML = '\nYou win! Well done!\n';
    document.querySelector('.modal')
      .insertAdjacentHTML('afterbegin', '<img src=\'assets/game-icons/winner.png\' alt=\'winner\'/>');
  }
}

function checkIfwin(arr, cells, emptysArr, booms, gameStatus) {
  let cellOpen = 0;
  let flagAndBoom = 0;
  cells.forEach((cell, i) => {
    if ((cell.classList.contains('open') && arr[i] !== 'boom')) {
      cellOpen += 1;
    }
    if (cell.classList.contains('flag') && arr[i] === 'boom') {
      flagAndBoom += 1;
    }
    if (cellOpen === emptysArr.length) {
      gameStatus = 'win';
      showGameModal(gameStatus, arr);
    }
  });
}

export { showGameModal, checkIfwin };

/* eslint-disable no-param-reassign */
function showGameModal(gameStatus, arr) {
  const cells = document.querySelectorAll('.cell');
  if (gameStatus === 'loose') {
    cells.forEach((el, i) => {
      const qtyBomb = +el.getAttribute('number');
      if (arr[i] === 'boom') {
        el.insertAdjacentHTML('afterbegin', '<img src = \'assets/game-icons/bomb.png\' width=22px height =22px>');
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
    document.querySelector('.modal').innerHTML = '\nYou win! Well done!\n';

    document.querySelector('.modal')
      // eslint-disable-next-line quotes
      .insertAdjacentHTML('afterbegin', `<img src='assets/game-icons/winner.png' alt='winner'/>`);
  }
}

export default showGameModal;

/* eslint-disable no-param-reassign */
function changeWidth(innerWidth, sizeCell, field, widthField, heightField) {
  const gameIcon = document.querySelector('.game-icon');
  gameIcon.innerHTML = '';
  if (innerWidth > 700) {
    sizeCell = 24;
    field.style.width = `${widthField * sizeCell}px`;
    field.style.height = `${heightField * sizeCell}px`;
  }
  if (innerWidth <= 700) {
    sizeCell = 22;
    field.style.width = `${widthField * sizeCell}px`;
    field.style.height = `${heightField * sizeCell}px`;
  }
  if (innerWidth <= 600) {
    sizeCell = 20;
    field.style.width = `${widthField * sizeCell}px`;
    field.style.height = `${heightField * sizeCell}px`;
  }
  if (innerWidth <= 550) {
    sizeCell = 18;
    field.style.width = `${widthField * sizeCell}px`;
    field.style.height = `${heightField * sizeCell}px`;
  }
}

export default changeWidth;

function generateNumbers(width, height, arr) {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, i) => {
    let countBoom = 0;
    const leftSide = i % width === 0;
    const rigthSide = i % width === width - 1;
    const topSide = i / height < 1;
    const bottomSide = i / height >= height - 1;
    if (arr[i] !== 'boom') {
      if (!leftSide && arr[i - 1] === 'boom') countBoom += 1;
      if (!rigthSide && arr[i + 1] === 'boom') countBoom += 1;
      if (!topSide && arr[i - width] === 'boom') countBoom += 1;
      if (!bottomSide && arr[i + width] === 'boom') countBoom += 1;
      if (!topSide && !leftSide && arr[i - width - 1] === 'boom') countBoom += 1;
      if (!topSide && !rigthSide && arr[i - width + 1] === 'boom') countBoom += 1;
      if (!bottomSide && !leftSide && arr[i + width - 1] === 'boom') countBoom += 1;
      if (!bottomSide && !rigthSide && arr[i + width + 1] === 'boom') countBoom += 1;
      cell.setAttribute('number', countBoom);
    } else {
      cell.setAttribute('numbers', 0);
    }
  });
}

export default generateNumbers;

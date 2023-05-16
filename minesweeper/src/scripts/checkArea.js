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

export default checkArea();

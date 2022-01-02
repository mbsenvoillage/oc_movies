let images = ["a", "b", "c", "d", "e", "f", "g"];
let indexesToDisplay = [0, 1, 2];

let display = (arrayOfIndexes) => {
  for (idx of arrayOfIndexes) {
    console.log(images[idx]);
  }
};

let calcNextIndexesToDisplay = (arrayOfIndexes, direction) => {
  let indexesToDisplay = [];
  let lastIndex = images.length - 1;
  if (direction === "next") {
    for (idx of arrayOfIndexes) {
      if (idx + 1 > lastIndex) indexesToDisplay.push(0);
      else indexesToDisplay.push(idx + 1);
    }
  } else if (direction === "prev") {
    for (idx of arrayOfIndexes) {
      if (idx - 1 < 0) indexesToDisplay.push(lastIndex);
      else indexesToDisplay.push(idx - 1);
    }
  } else {
    console.error("Direction argument should be either 'prev' or 'next'");
  }
  return indexesToDisplay;
};

indexesToDisplay = calcNextIndexesToDisplay(indexesToDisplay, "next");
indexesToDisplay = calcNextIndexesToDisplay(indexesToDisplay, "next");
indexesToDisplay = calcNextIndexesToDisplay(indexesToDisplay, "next");

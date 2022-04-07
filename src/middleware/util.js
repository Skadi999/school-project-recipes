//Converts a 1-dimensional array to a 2-dimensional one
function convertTo2DArray(arr) {
  let rows = Math.ceil(arr.length / 3)
  let index = 0;
  let twoDArr = [];
  let rowArr = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < 3; col++) {
      if (arr[index] === undefined) break;
      rowArr.push(arr[index++]);
    }
    twoDArr.push(rowArr);
    rowArr = [];
  }
  return twoDArr;
}

function setShortDescriptionForAllElements(arr) {
  arr.forEach(item => {
    item.description = getShortDescription(item.description)
  })
}

//Converts text of more than 50 characters long to a 50 char long text with '...' at the end.
function getShortDescription(description) {
  if (description.length > 50) {
    return description.slice(0, 50) + '...';
  }
  return description;
}


module.exports = {
  convertTo2DArray,
  setShortDescriptionForAllElements
};
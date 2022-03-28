//todo: Need to add remove functionality
addEventListeners();

function addEventListeners() {
  document.querySelector('#addNewIngredient').addEventListener('click', () => {
    addNewIngredient()
  })
  document.querySelector('#addNewStep').addEventListener('click', () => {
    addNewStep()
  })
}


function addNewIngredient() {
  let ingId = getIdOfLastItem('.ingText');

  let lbl = createNewIngLabel(parseInt(ingId) + 1);
  let txt = createNewIngTextField(parseInt(ingId) + 1);

  let addIngButton = document.querySelector('#addNewIngredient');

  let br = document.createElement('br');
  addIngButton.parentElement.insertBefore(br, addIngButton);
  addIngButton.parentElement.insertBefore(lbl, addIngButton);
  br = document.createElement('br');
  addIngButton.parentElement.insertBefore(br, addIngButton);
  addIngButton.parentElement.insertBefore(txt, addIngButton);
}

function addNewStep() {
  let stepId = getIdOfLastItem('.stepText');

  let lbl = createNewStepLabel(parseInt(stepId) + 1);
  let txt = createNewStepTextField(parseInt(stepId) + 1);

  let addStepButton = document.querySelector('#addNewStep');

  let br = document.createElement('br');
  addStepButton.parentElement.insertBefore(br, addStepButton);
  addStepButton.parentElement.insertBefore(lbl, addStepButton);
  br = document.createElement('br');
  addStepButton.parentElement.insertBefore(br, addStepButton);
  addStepButton.parentElement.insertBefore(txt, addStepButton);
}

//Only for ingredients or steps!
function getIdOfLastItem(classname) {
  let items = document.querySelectorAll(classname);
  let lastItem = items[items.length - 1];
  return lastItem.id.slice(-1)
}

function getLastItem(item) {
  return document.getElementById(item)
}

function createNewIngLabel(idNum) {
  let label = document.createElement('label');
  label.htmlFor = `ing${idNum}`;
  label.innerHTML = `Ingredient ${idNum}`;
  return label;
}

function createNewIngTextField(idNum) {
  let text = document.createElement('input');
  text.type = 'text'
  text.className = 'ingText'
  text.name = 'ingredients[]'
  text.id = `ing${idNum}`
  return text;
}

function createNewStepLabel(idNum) {
  let label = document.createElement('label');
  label.htmlFor = `step${idNum}`;
  label.innerHTML = `Step ${idNum}`;
  return label;
}

function createNewStepTextField(idNum) {
  let text = document.createElement('input');
  text.type = 'text'
  text.className = 'stepText'
  text.name = 'steps[]'
  text.id = `step${idNum}`
  return text;
}
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

//Need to assign ID to the div itself, remove button from last div, add the new div after it.
function addNewIngredient() {
  //get id of last ingredient
  let ingId = getIdOfLastItem('.ingText');

  //create ing div
  let div = document.createElement('div')
  div.className = 'mb-3'
  div.id = `ingDiv${parseInt(ingId) + 1}`

  //create elements to insert inside div
  let lbl = createNewIngLabel(parseInt(ingId) + 1);
  let txt = createNewIngTextField(parseInt(ingId) + 1);

  //add to div
  div.appendChild(lbl);
  div.appendChild(txt);

  //move button from last div to new div
  div.appendChild(document.querySelector('#addNewIngredient'));

  //insert div inside form before the first step div
  let stepDiv = document.querySelector('.stepDiv')
  stepDiv.parentElement.insertBefore(div, stepDiv);
}

function addNewStep() {
  //get id of last step
  let stepId = getIdOfLastItem('.stepText');

  //create step div
  let div = document.createElement('div')
  div.className = 'mb-3'
  div.classList.add('stepDiv')
  div.id = `stepDiv${parseInt(stepId) + 1}`

  //create elements to insert inside div
  let lbl = createNewStepLabel(parseInt(stepId) + 1);
  let txt = createNewStepTextField(parseInt(stepId) + 1);

  //add to div
  div.appendChild(lbl);
  div.appendChild(txt);

  let btn = document.querySelector('#addNewStep')
  btn.parentElement.insertBefore(div, btn)

  //move button from last div to new div
  div.appendChild(document.querySelector('#addNewStep'));

  //insert div inside form before the first step div
  let checkDiv = document.querySelector('.checkDiv')
  checkDiv.parentElement.insertBefore(div, checkDiv);
}

function getIdOfLastItem(selector) {
  let items = document.querySelectorAll(selector);
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
  label.className = 'form-label';
  return label;
}

function createNewIngTextField(idNum) {
  let text = document.createElement('input');
  text.type = 'text'
  text.className = 'ingText'
  text.classList.add('form-control')
  text.name = 'ingredients[]'
  text.id = `ing${idNum}`
  return text;
}

function createNewIngAddButton() {
 let btn = document.createElement('button');
 btn.type = 'button';
 btn.id = 'addNewIngredient';
 btn.className = 'btn';
 btn.classList.add('btn-primary');
 btn.classList.add('mt-1');
 btn.innerHTML = 'Add';
}

function createNewStepAddButton() {
 let btn = document.createElement('button');
 btn.type = 'button';
 btn.id = 'addNewStep';
 btn.className = 'btn';
 btn.classList.add('btn-primary');
 btn.classList.add('mt-1');
 btn.innerHTML = 'Add';
}

function createNewStepLabel(idNum) {
  let label = document.createElement('label');
  label.htmlFor = `step${idNum}`;
  label.innerHTML = `Step ${idNum}`;
  label.className = 'form-label';
  return label;
}

function createNewStepTextField(idNum) {
  let text = document.createElement('input');
  text.type = 'text'
  text.className = 'stepText'
  text.classList.add('form-control')
  text.name = 'steps[]'
  text.id = `step${idNum}`
  return text;
}
// localStorage.removeItem('exercises');

// grab our dom elements
let displayBox = document.querySelector('.current-exercise'),
  catalogBox = document.querySelector('.catalog-box'),
  resetButton = document.querySelector('.reset');
  addButton = document.querySelector('.add-btn');

// define a default set of exercises
let catalog = {
  ex01: { name: 'Push Ups', reps: 10 },
  ex02: { name: 'Sit Ups', reps: 30 },
  ex03: { name: 'Lunges', reps: 30 },
  ex04: { name: 'Squats', reps: 15 },
  ex05: { name: 'Jumping Jacks', reps: 20 }
};

// set a variable for the localStorage 'exercises' item
let localCatalog = JSON.parse(localStorage.getItem('exercises')) || catalog;

// set default exercises if none exist in localStorage
if (!window.localStorage.getItem('exercises')) {
  setDefaultCatalog();
}

// click the 💪 to reset to defaults
resetButton.addEventListener('click', resetRefresh);

function resetRefresh() {
  // remove localStorage item
  localStorage.removeItem('exercises');

  // update localStorage with defaults...
  setDefaultCatalog();

  // display the results
  displayExercise();
  displayCatalog();
}

function selectText (element) {
  selection = window.getSelection();
  range = document.createRange();
  range.selectNodeContents(element);
  selection.removeAllRanges();
  selection.addRange(range);
}

addButton.addEventListener('click', createExercise);

function createExercise() {
  const exerciseId = 'ex' + Math.round(Math.random() * 10000);
  localCatalog[exerciseId] = { name: 'Burpees', reps: 10 }
  updateLocalStorage(localCatalog);
  displayCatalog();
  // set focus after creating
  const exerciseElement  = document.getElementById(exerciseId)
    .getElementsByTagName('dt')[0]

  exerciseElement.focus();
}

function removeExercise(key) {
  delete localCatalog[key]
  updateLocalStorage(localCatalog);
  displayCatalog();
}

function updateLocalStorage (newCatalog) {
  // push changes to localStorage
  localStorage.setItem('exercises', JSON.stringify(newCatalog));
}

// define default set of exercises
function setDefaultCatalog() {
  // write exercises to localStorage
  localStorage.setItem('exercises', JSON.stringify(catalog));

  // update to latest data
  localCatalog = JSON.parse(localStorage.getItem('exercises'));
}

// save changes to localStorage upon each 'input' event
catalogBox.addEventListener('keyup', function (event) {
  // don't allow 'return' key to create new-lines
  if (event.keyCode === 13) {
    event.preventDefault();
    event.stopPropagation();
  }
  // make a copy of the existing localStorage data
  let newCatalog = localCatalog;

  // grab the data-item names for elements being currently edited
  let focusedParentName = event.target.parentElement.getAttribute('data-item');
  let focusedChildName = event.target.getAttribute('data-item');

  // update relevant datum within the newCatalog with user input/changes
  newCatalog[focusedParentName][focusedChildName] = event.target.textContent;

  updateLocalStorage(newCatalog)

}, false)

// this is what will be read for the final output to display
let output = {
  exercise: 0,
  reps: 0
};

// create html elements for each exercises + reps based on data from localStorage
function displayCatalog() {
  // get current list of <dl> exercises
  let catalogChildren = document.querySelectorAll('dl');
  // remove existing children to start fresh
  if (catalogChildren) {
    catalogChildren.forEach(function (child) {
      catalogBox.removeChild(child);
    });
  }

  for (const item in localCatalog) {

    if (typeof localCatalog[item] !== 'function') {

      let exerciseSet = document.createElement('dl'),
        nameBox = document.createElement('dt'),
        repsBox = document.createElement('dd'),
        ctrlBox = document.createElement('dd'),
        removeBtn = document.createElement('button');

      exerciseSet.setAttribute('data-item', item);
      exerciseSet.setAttribute('id', item);

      nameBox.contentEditable = true;
      repsBox.contentEditable = true;

      //select text by default on focus
      nameBox.onfocus = ev => selectText(ev.target)
      repsBox.onfocus = ev => selectText(ev.target)

      nameBox.setAttribute('data-item', 'name');
      repsBox.setAttribute('data-item', 'reps');
      repsBox.setAttribute('class', 'reps-box');
      ctrlBox.setAttribute('class', 'ctrl-box');

      nameBox.textContent = localCatalog[item].name;
      repsBox.textContent = localCatalog[item].reps;
      
      removeBtn.textContent = '➖';
      removeBtn.onclick = () => removeExercise(item);
      ctrlBox.appendChild(removeBtn)

      exerciseSet.appendChild(nameBox);
      exerciseSet.appendChild(repsBox);
      exerciseSet.appendChild(ctrlBox);

      catalogBox.appendChild(exerciseSet);
    }
  };
};

// chooses a random exercise and sets value to global 'output' var
function pickRandomExercise() {
  // make an array out of the localStorage object
  var keys = Object.keys(localCatalog);

  // generate a random number within the range of elements localCatalog
  var rand = Math.floor(Math.random() * keys.length);

  // set the object property based on above random number
  var prop = keys[rand];

  // output the property's name and reps
  output.exercise = localCatalog[prop].name;
  output.reps = localCatalog[prop].reps;
}

// displays the 'output' values in the large, center HTML .displayBox
function displayExercise() {
  pickRandomExercise();
  displayBox.innerHTML = `${output.reps} <span class="multiplier">×</span> ${output.exercise}`;
};

// initialize the app
displayExercise();
displayCatalog();

// add the 'loaded' class upon successful document load
window.onload = function (e) {
  document.querySelector('body').className = 'loaded';
}

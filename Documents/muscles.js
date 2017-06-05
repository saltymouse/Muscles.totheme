// localStorage.removeItem('exercises');

// grab our dom elements
let displayBox = document.querySelector('.current-exercise'),
    catalogBox = document.querySelector('.catalog-box'),
    resetButton = document.querySelector('.reset');

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

  // push changes to localStorage
  localStorage.setItem('exercises', JSON.stringify(newCatalog));

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
    catalogChildren.forEach(function(child) {
      catalogBox.removeChild(child);
    });
  }

  for (var item in localCatalog) {

    if (typeof localCatalog[item] !== 'function') {

      let exerciseSet = document.createElement('dl'),
        nameBox = document.createElement('dt'),
        repsBox = document.createElement('dd');

      exerciseSet.setAttribute('data-item', item);

      nameBox.contentEditable = true;
      repsBox.contentEditable = true;

      nameBox.setAttribute('data-item', 'name');
      repsBox.setAttribute('data-item', 'reps');

      nameBox.textContent = localCatalog[item].name;
      repsBox.textContent = localCatalog[item].reps;

      exerciseSet.appendChild(nameBox);
      exerciseSet.appendChild(repsBox);

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
window.onload = function(e) {
  document.querySelector('body').className = 'loaded';
}

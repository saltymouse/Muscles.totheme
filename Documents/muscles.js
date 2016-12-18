// grab our dom elements
let displayBox = document.querySelector('.current-exercise'),
  catalogBox = document.querySelector('.catalog-box');

// set default exercises if none exist in localStorage
if (!window.localStorage.getItem('exercises')) {
  let catalog = {
    ex01: { name: "Push Ups", reps: 10 },
    ex02: { name: "Sit Ups", reps: 30 },
    ex03: { name: "Lunges", reps: 30 },
    ex04: { name: "Squats", reps: 15 }
  }

  localStorage.setItem('exercises', JSON.stringify(catalog));
}

// set a variable for the localStorage 'exercises' item
let localCatalog = JSON.parse(localStorage.getItem('exercises'));

catalogBox.addEventListener('input', function (event) {
  // make a copy of the existing localStorage data
  var newCatalog = localCatalog;

  // grab the data-item names for elements being currently edited
  var focusedParentName = event.target.parentElement.getAttribute('data-item');
  var focusedChildName = event.target.getAttribute('data-item');

  // update relevant datum within the newCatalog with user input/changes
  newCatalog[focusedParentName][focusedChildName] = event.target.innerHTML;

  // push changes to localStorage
  localStorage.setItem('exercises', JSON.stringify(newCatalog));

}, false)

let output = {
  exercise: 0,
  reps: 0
};

function displayCatalog() {
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


function pickExercise() {
  var result;
  var count = 0;
  for (var exercise in localCatalog) {
    if (Math.random() < 1 / ++count) {
      if (typeof localCatalog[exercise] !== 'function') {
        output.exercise = localCatalog[exercise].name;
        output.reps = localCatalog[exercise].reps;
      }
    }
  }
}

function chooseExercise() {
  var randomExercise = Math.floor(Math.random() * catalog.length);
  output.exercise = catalog[randomExercise].name;
  output.reps = catalog[randomExercise].reps;
};

function displayExercise() {
  pickExercise();
  displayBox.textContent = `${output.reps} × ${output.exercise}`;
};

// initialize the app
displayExercise();
displayCatalog();

let displayBox = document.querySelector('.display-box'),
    catalogBox = document.querySelector('.catalog-box');

NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

let catalog = {
  "Push Ups": 10,
  "Sit Ups": 30,
  "Lunges": 30,
  "Squats": 15
}

catalogBox.addEventListener('input', function(event) {
  console.log(event.target.innerHTML);
  // localStorage code
  localStorage.setItem('userList', JSON.stringify(catalogBox));
  console.log(localStorage.getItem('userList'));
}, false)

let output = {
  exercise: 0,
  reps: 0
};

function displayCatalog() {
  for (var exercise in catalog) {
    let nameElement = document.createElement('dt'),
        repsElement = document.createElement('dd');

    nameElement.contentEditable = true;
    repsElement.contentEditable = true;

    if (typeof catalog[exercise] !== 'function') {
      nameElement.textContent = exercise;
      catalogBox.appendChild(nameElement);

      repsElement.textContent = catalog[exercise];
      catalogBox.appendChild(repsElement);
    }
  };
};
function pickExercise() {
  var result;
  var count = 0;

  for (var exercise in catalog) {
    if (Math.random() < 1/++count) {
      if (typeof catalog[exercise] !== 'function') {
        output.exercise = exercise;
        output.reps = catalog[exercise];
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

displayExercise();
displayCatalog();

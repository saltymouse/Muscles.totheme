let displayBox = document.querySelector('.display-box'),
    catalogBox = document.querySelector('.catalog-box');

let catalog = [
  {
    name: "Push Ups",
    reps: 10
  },
  {
    name: "Sit Ups",
    reps: 30
  },
  {
    name: "Lunges",
    reps: 30
  },
  {
    name: "Squats",
    reps: 25
  }
]
let output = {
  exercise: 0,
  reps: 0
};

function displayCatalog() {
  catalog.forEach(function(exercise) {
    let nameElement = document.createElement('dt'),
        repsElement = document.createElement('dd');

    nameElement.contentEditable = true;
    repsElement.contentEditable = true;

    nameElement.textContent = exercise.name;
    catalogBox.appendChild(nameElement);

    repsElement.textContent = exercise.reps;
    catalogBox.appendChild(repsElement);
  });
};

function chooseExercise() {
  var randomExercise = Math.floor(Math.random() * catalog.length);
  output.exercise = catalog[randomExercise].name;
  output.reps = catalog[randomExercise].reps;
};

function displayExercise() {
  chooseExercise();
  displayBox.textContent = `${output.reps} × ${output.exercise}`;
};

displayExercise();
displayCatalog();

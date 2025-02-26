//  TODO dont show more than 10 last saved progress

document.addEventListener("DOMContentLoaded", function () {
 // Get references to all elements
  const form = document.getElementById("workout-form");
  const workoutList = document.getElementById("workout-list");
  const progressList = document.getElementById("progress-list");
  const saveProgressBtn = document.getElementById("save-progress");
  const toggleProgressBtn = document.getElementById("toggle-progress");

  // Resets when page reloads
  let workouts = [];

  // Load saved progress from localStorage
  const progress = JSON.parse(localStorage.getItem("progress")) || [];

   // Function to display workout history
  function displayWorkouts() {
      workoutList.innerHTML = "";
      workouts.forEach((workout) => {
          const li = document.createElement("li");
          li.textContent = `${workout.exercise} - ${workout.sets} sets x ${workout.reps} reps (${workout.weight}kg)`;
          workoutList.appendChild(li);
      });
  }

  // Function to display saved progress 
  function displayProgress() {
      progressList.innerHTML = "";
      progress.forEach((entry, index) => {
          const li = document.createElement("li");
          li.textContent = `📅 ${entry.date} - ${entry.details}`;

          // Create a delete button for each saved progress entry
          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "❌";
          deleteBtn.onclick = function () {
              progress.splice(index, 1);
              localStorage.setItem("progress", JSON.stringify(progress));
              displayProgress();
          };

          li.appendChild(deleteBtn);
          progressList.appendChild(li);
      });
  }

  // Event listener for submitting a new workout
  form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Get input values
      const exercise = document.getElementById("exercise").value;
      const sets = document.getElementById("sets").value;
      const reps = document.getElementById("reps").value;
      const weight = document.getElementById("weight").value;

      // Create an object for the new workout entry
      const newWorkout = { exercise, sets, reps, weight };
      workouts.push(newWorkout);

      displayWorkouts();
      form.reset();
  });

   // Event listener for saving progress
  saveProgressBtn.addEventListener("click", function () {
      if (workouts.length === 0) {
          alert("No workouts to save!");
          return;
      }

      // Corrent date
      const today = new Date().toLocaleDateString();

       // Format the workout summary
       const workoutSummary = workouts.map(w => `${w.exercise}: ${w.sets}x${w.reps} (${w.weight}kg)`).join(", ");
      // Save the progress
      progress.push({ date: today, details: workoutSummary });

      // Store updated progress in localStorage
      localStorage.setItem("progress", JSON.stringify(progress));
      alert("Progress saved!");
      displayProgress();

      workouts = [];
      displayWorkouts();
  });

  // Event listener for toggling the visibility of saved progress results
  toggleProgressBtn.addEventListener("click", function () {
      if (progressList.style.display === "none") {
          progressList.style.display = "block";
          toggleProgressBtn.textContent = "⬆";
      } else {
          progressList.style.display = "none";
          toggleProgressBtn.textContent = "⬇";
      }
  });

  displayProgress();
});
const defaultPlan = {
  Monday: "🛑 Rest Day",

  Tuesday: `💪 Workout
Jump Squat → Push-up – 12
Triceps overhead – 10 each side
Hip Thrust – 15
Plank Shoulder Taps – 25
Lateral Raises – 12

🧘 Stretch (Full Body)
Hamstrings – 30 sec
Chest stretch – 30 sec
Shoulder stretch – 30 sec
Cobra stretch – 30 sec
Child’s pose – 45 sec`,

  Wednesday: `💪 Workout
Bulgarian Split Squat – 12 each leg
Jump Lunges – 12
Sumo Squat – 15
Wall Sit – 45 sec

🧘 Stretch (Legs Focus)
Hamstrings – 30 sec
Quad stretch – 30 sec
Hip flexor stretch – 30 sec
Calf stretch – 30 sec
Deep squat hold – 45 sec`,

  Thursday: "🛑 Rest Day",

  Friday: `💪 Workout
Decline Push-ups – 12
Shoulder Press – 12
Chair Dips – 12
Lateral Raises – 15

🧘 Stretch (Push Muscles)
Chest stretch – 30 sec
Shoulder stretch – 30 sec
Triceps stretch – 30 sec
Cobra stretch – 30 sec`,

  Saturday: `💪 Workout
Bent-over Rows – 12
Towel Rows – 12
Hammer Curls – 12
Reverse Fly – 12

🧘 Stretch (Pull Muscles)
Lat stretch – 30 sec
Biceps stretch – 30 sec
Upper back stretch – 30 sec
Child’s pose – 45 sec`,

  Sunday: `💪 Workout
Step-ups – 12
Single-leg Hip Thrust – 12
Glute Bridge March – 15
Reverse Crunch – 15

🧘 Stretch (Glutes + Core)
Glute stretch – 30 sec
Hamstrings – 30 sec
Hip flexor stretch – 30 sec
Cobra stretch – 30 sec`
};

// Load saved or default
let plan = JSON.parse(localStorage.getItem("workoutPlan")) || defaultPlan;

const container = document.getElementById("workouts");

// Get today
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const todayName = days[new Date().getDay()];

// Sort today first
const sortedDays = [
  todayName,
  ...Object.keys(plan).filter(d => d !== todayName)
];

sortedDays.forEach(day => {

  const card = document.createElement("div");
  card.className = "card";

  // Highlight today
  if (day === todayName) {
    card.classList.add("today-card");

    const label = document.createElement("div");
    label.className = "today-label";
    label.innerText = "⭐ Today’s Plan";
    card.appendChild(label);
  }

  const title = document.createElement("h3");
  title.innerText = day;

  const textarea = document.createElement("textarea");
  textarea.value = plan[day];

  const saveBtn = document.createElement("button");
  saveBtn.innerText = "Save";

  saveBtn.onclick = () => {
    plan[day] = textarea.value;
    localStorage.setItem("workoutPlan", JSON.stringify(plan));
    alert(day + " updated!");
  };

  card.appendChild(title);
  card.appendChild(textarea);
  card.appendChild(saveBtn);

  container.appendChild(card);
});
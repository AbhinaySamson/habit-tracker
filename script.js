// ===== HABITS LIST =====
const habits = [
  "📖 Bible Reading",
  "💧 Water Intake",
  "🏋️ Workout",
  "🚫🍬 No Sugar Drinks",
  "🚶 Steps",
  "🏃 Post Meal Walk",
  "🧘 Stretching",
  "🌞 Sunlight",
  "😴 Sleep",
  "📵 No Phone Before Sleep",
  "🚫 No Junk Food"
];

// ===== DATE =====
const today = new Date().toISOString().split('T')[0];
document.getElementById("date").innerText = today;

// ===== GREETING =====
const hour = new Date().getHours();
let greeting = "Welcome";

if (hour < 12) greeting = "Good Morning ☀️";
else if (hour < 18) greeting = "Good Afternoon 🌤️";
else greeting = "Good Evening 🌙";

document.querySelector(".header h2").innerText = `${greeting}, Abhinay 👋`;

// ===== LOAD DATA =====
let data = JSON.parse(localStorage.getItem(today)) || {};
const taskContainer = document.getElementById("tasks");

// ===== CREATE TASK UI =====
habits.forEach((habit, index) => {
  const div = document.createElement("div");
  div.className = "task";

  // Animation
  div.style.opacity = "0";
  div.style.transform = "translateY(10px)";
  div.style.transition = "all 0.3s ease";

  setTimeout(() => {
    div.style.opacity = "1";
    div.style.transform = "translateY(0)";
  }, index * 100);

  const label = document.createElement("label");
  label.innerText = habit;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = data[habit] || false;

  // Apply strike if already done
  if (checkbox.checked) {
    label.style.textDecoration = "line-through";
    label.style.opacity = "0.6";
  }

  checkbox.onchange = () => {
    data[habit] = checkbox.checked;

    if (checkbox.checked) {
      label.style.textDecoration = "line-through";
      label.style.opacity = "0.6";
    } else {
      label.style.textDecoration = "none";
      label.style.opacity = "1";
    }

    localStorage.setItem(today, JSON.stringify(data));
    updateScore();
    loadHistory();
    loadChart();
  };

  div.appendChild(label);
  div.appendChild(checkbox);
  taskContainer.appendChild(div);
});

// ===== SCORE FUNCTION =====
function updateScore() {
  let completed = Object.values(data).filter(v => v).length;
  let total = habits.length;

  let text = `${completed}/${total} Tasks Completed 🔥`;

  if (completed === total && total !== 0) {
    text += " 🎉 Perfect Day!";
  }

  document.getElementById("score").innerText = text;
}

// ===== HISTORY FUNCTION =====
function loadHistory() {
  const historyDiv = document.getElementById("history");
  historyDiv.innerHTML = "";

  Object.keys(localStorage)
    .filter(key => key.includes("-"))
    .sort()
    .reverse()
    .forEach(key => {
      const dayData = JSON.parse(localStorage.getItem(key));

      if (!dayData) return;

      const count = Object.values(dayData).filter(v => v).length;
      const total = Object.keys(dayData).length;

      const div = document.createElement("div");
      div.className = "history-item";
      div.innerText = `${key} → ${count}/${total}`;

      historyDiv.appendChild(div);
    });
}

// ===== CHART FUNCTION =====
function loadChart() {
  const labels = [];
  const scores = [];

  Object.keys(localStorage)
    .filter(key => key.includes("-"))
    .sort()
    .forEach(key => {
      const dayData = JSON.parse(localStorage.getItem(key));
      if (!dayData) return;

      const count = Object.values(dayData).filter(v => v).length;

      labels.push(key);
      scores.push(count);
    });

  const ctx = document.getElementById('myChart').getContext('2d');

  if (window.chart) {
    window.chart.destroy();
  }

  window.chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Daily Score',
        data: scores,
        borderWidth: 2,
        tension: 0.3
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: "white"
          }
        }
      },
      scales: {
        x: {
          ticks: { color: "white" }
        },
        y: {
          ticks: { color: "white" }
        }
      }
    }
  });
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log("Service Worker Registered"));
}

// ===== INITIAL LOAD =====
updateScore();
loadHistory();
loadChart();
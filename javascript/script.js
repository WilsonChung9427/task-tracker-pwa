const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";

  const today = new Date().toISOString().split("T")[0];

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    // Task text
    const text = document.createElement("span");
    text.innerHTML = `<strong>${task.text}</strong><br><small>${task.date || ""}</small>`;

    // Complete button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.className = "complete-btn";

    completeBtn.onclick = () => {
      task.completed = !task.completed;
      saveTasks();
    };

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.className = "delete-btn";

    deleteBtn.onclick = () => {
      li.classList.add("removing");

      setTimeout(() => {
        tasks.splice(index, 1);
        saveTasks();
      }, 300);
    };

    // Completed style
    if (task.completed) {
      li.classList.add("completed");
    }

    // Overdue highlight
    if (task.date && task.date < today && !task.completed) {
      li.classList.add("overdue");
    }

    // Button group
    const btnGroup = document.createElement("div");
    btnGroup.className = "btn-group";
    btnGroup.appendChild(completeBtn);
    btnGroup.appendChild(deleteBtn);

    li.appendChild(text);
    li.appendChild(btnGroup);

    taskList.appendChild(li);
  });
}

// Add task
function addTask() {
  const text = taskInput.value;
  const date = dateInput.value;

  if (!text) return;

  tasks.push({
    text,
    date,
    completed: false
  });

  taskInput.value = "";
  dateInput.value = "";

  saveTasks();
}

// Save
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

renderTasks();

// Service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("javascript/sw.js");
}
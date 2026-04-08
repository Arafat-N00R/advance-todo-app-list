const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const listContainer = document.getElementById("listContainer");
const taskCount = document.getElementById("taskCount");
const clearAll = document.getElementById("clearAll");
const filterButtons = document.querySelectorAll(".filters button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Render tasks
function renderTasks() {
  listContainer.innerHTML = "";

  let filteredTasks = tasks.filter(task => {
    if (currentFilter === "completed") return task.completed;
    if (currentFilter === "pending") return !task.completed;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    let li = document.createElement("li");

    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;

    listContainer.appendChild(li);
  });

  updateCount();
  saveTasks();
}

// Add task
addBtn.addEventListener("click", () => {
  if (inputBox.value.trim() === "") return;

  tasks.push({
    text: inputBox.value,
    completed: false
  });

  inputBox.value = "";
  renderTasks();
});

// Enter key
inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});

// Toggle complete
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Edit task
function editTask(index) {
  let newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText;
    renderTasks();
  }
}

// Clear all
clearAll.addEventListener("click", () => {
  tasks = [];
  renderTasks();
});

// Filter
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

// Task count
function updateCount() {
  let remaining = tasks.filter(t => !t.completed).length;
  taskCount.textContent = `${remaining} tasks left`;
}

// Save
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Initial render
renderTasks();
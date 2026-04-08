const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const listContainer = document.getElementById("listContainer");
const clearAll = document.getElementById("clearAll")
const filterButtons = document.querySelectorAll(".filters button")
const taskCount = document.getElementById("taskCount")


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all"
function renderTasks() {
  listContainer.innerHTML = "";

  let filteredTasks = tasks.filter(task =>{
    if ( currentFilter === "completed") return task.completed
    if ( currentFilter === "pending") return !task.completed
    return true;
  })

  filteredTasks.forEach((task, index) => {
    let li = document.createElement("li");
if (task.completed) li.classList.add("completed")
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
  SaveTask();
  updateCount()
}
// addtask
addBtn.addEventListener("click", () => {
  if (inputBox.value.trim() === "") return;
  tasks.push({
    text: inputBox.value,
    completed: false,
  });
  inputBox.value = "";
  renderTasks();
});

// filter
filterButtons.forEach(btn => {
btn.addEventListener("click", () =>{
  currentFilter = btn.dataset.filter ;
  renderTasks();
})
})


// toggleTask
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed
  renderTasks();
}

// editTask
function editTask(index) {
  let newTask = prompt("edit your task", tasks[index].text)
  tasks[index].text = newTask
   renderTasks();
}

// deleteTask
function deleteTask(index) {
 tasks.splice(index, 1)
 renderTasks();
}
// count 
function updateCount() {
  let remaining = tasks.filter(t => !t.completed).length;
  taskCount.textContent = `${remaining} left task`;
}


// clearAll
clearAll.addEventListener("click", () => {
  tasks = []
  renderTasks();
} )

// save task
function SaveTask() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

renderTasks();

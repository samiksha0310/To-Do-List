// Load tasks from localStorage when page loads
window.onload = function () {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  storedTasks.forEach(task => renderTask(task.text, task.completed));
};

// Add a new task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  renderTask(taskText, false);
  saveTasks();

  taskInput.value = "";
}

// Render task in UI
function renderTask(text, completed) {
  const li = document.createElement("li");
  li.textContent = text;

  if (completed) li.classList.add("completed");

  // Toggle completed on click
  li.addEventListener("click", function () {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "btn-delete";
  deleteBtn.onclick = function () {
    li.remove();
    saveTasks();
  };

  li.appendChild(deleteBtn);
  document.getElementById("taskList").appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all tasks
function clearAll() {
  if (confirm("Are you sure you want to clear all tasks?")) {
    document.getElementById("taskList").innerHTML = "";
    localStorage.removeItem("tasks");
  }
}
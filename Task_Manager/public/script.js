const client = new HttpClient(window.location.origin);

// Fetch all tasks from server
async function fetchTasks() {
  return await client.get("/api/tasks");
}

// Add a new task
async function addTask(name) {
  return await client.post("/api/tasks", { name });
}

// Delete a task
async function deleteTask(id) {
  return await client.delete(`/api/tasks/${id}`);
}

// Toggle task completion
async function toggleTask(id) {
  return await client.put(`/api/tasks/${id}`);
}

// Render tasks in the UI
function renderTasks(tasks) {
  const ul = document.getElementById("taskList");
  ul.innerHTML = "";

  tasks.forEach(({ _id, name, completed }) => {
    const li = document.createElement("li");
    if (completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = name;
    span.className = "task-text";

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = completed ? "Undo" : "Complete";
    toggleBtn.onclick = async () => {
      await toggleTask(_id);
      const updated = await fetchTasks();
      renderTasks(updated);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = async () => {
      await deleteTask(_id);
      const updated = await fetchTasks();
      renderTasks(updated);
    };

    li.appendChild(span);
    li.appendChild(toggleBtn);
    li.appendChild(deleteBtn);
    ul.appendChild(li);
  });
}

// Handle task form submission
document.getElementById("addForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = document.getElementById("newTask");
  const name = input.value.trim();
  if (!name) return;
  await addTask(name);
  input.value = "";
  const tasks = await fetchTasks();
  renderTasks(tasks);
});

// Initial page load
window.onload = async () => {
  const tasks = await fetchTasks();
  renderTasks(tasks);
};

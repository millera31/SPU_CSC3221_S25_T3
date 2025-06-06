const client = new HttpClient(window.location.origin);

async function fetchTasks() {
  return await client.get("/api/tasks");
}

async function addTask(name) {
  return await client.post("/api/tasks", { name });
}

async function deleteTask(id) {
  return await client.delete(`/api/tasks/${id}`);
}

async function updateTask(id, data) {
  return await client.put(`/api/tasks/${id}`, { data });
}

function renderTasks(tasks) {
  const ul = document.getElementById("taskList");
  ul.innerHTML = "";

  tasks.forEach(({ _id, name, completed }) => {
    const li = document.createElement("li");
    li.className = completed ? "completed" : "";

    const span = document.createElement("span");
    span.textContent = name;
    span.className = "task-text";
    span.title = "Click to edit";

    span.onclick = async () => {
      const newName = prompt("Edit task name:", name);
      if (newName && newName.trim() !== "" && newName !== name) {
        await updateTask(_id, { name: newName.trim() });
        const updated = await fetchTasks();
        renderTasks(updated);
      }
    };

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = completed ? "Undo" : "Complete";
    toggleBtn.onclick = async () => {
      await updateTask(_id, { completed: !completed });
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

window.onload = async () => {
  const tasks = await fetchTasks();
  renderTasks(tasks);
};

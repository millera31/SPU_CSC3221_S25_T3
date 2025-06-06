// Client side JavaScript for a simple to-do list application
// This script handles fetching, adding, and deleting items from a list
// and updating the UI accordingly.

// Initialize httpclient
const client = new HttpClient(window.location.origin);

async function fetchList() {
  return await client.get("/api");
}

async function addItem(text) {
  return await client.post("/api", { text });
}

async function deleteItem(index) {
  return await client.delete(`/api/${index}`);
}


// render the list items in the UI
  function renderList(items) {
    const ul = document.getElementById("itemList");
    ul.innerHTML = "";
    items.forEach((item, index) => {
        // Create a list item element
      const li = document.createElement("li");
      li.textContent = item;
  
        // create a delete button for each item
      const deleteBtn = document.createElement("button");

      // on click, delete item and refresh list
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = async () => {
        await deleteItem(index);
        const updated = await fetchList();
        renderList(updated);
      };
  
      li.appendChild(deleteBtn);
      ul.appendChild(li);
    });
  }
  
// handle form submission to add a new item
  document.getElementById("addForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent form from refreshing the page
    const input = document.getElementById("newItem");
    const text = input.value.trim();
    if (!text) return; // do not add empty items
    // add the new item and clear the input field
    await addItem(text);
    input.value = "";
    const items = await fetchList();
    renderList(items);
  });
  
// on page load, fetch the list and show it
  window.onload = async () => {
    const items = await fetchList();
    renderList(items);
  };
  
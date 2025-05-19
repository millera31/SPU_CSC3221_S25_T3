// Author: Allie, Quinton, Lina
// Date: 05/19/2025
// Description: UI logic for testing HTTP client using jsonplaceholder API

const client = new HttpClient("https://jsonplaceholder.typicode.com");
const output = document.getElementById("output");

// show output
function showOutput(title, data) {
  output.innerHTML = `<h3>${title}</h3><pre>${JSON.stringify(data, null, 2)}</pre>`;
}

// show error message
function showError(err) {
  output.innerHTML = `<h3 style="color:red;">Error:</h3><pre>${err.message}</pre>`;
}

// GET METHOD - DONE
document.getElementById("getBtn").addEventListener("click", async () => {
  try {
    const data = await client.get("/users");
    showOutput("GET /users", data);
  } catch (err) {
    showError(err);
  }
});

//POST - placeholder
document.getElementById("postBtn").addEventListener("click", () => {
  output.innerHTML = `<h3>POST</h3><pre>// TODO: Implement POST method</pre>`;
});

// PUT - placeholder 
document.getElementById("putBtn").addEventListener("click", () => {
  output.innerHTML = `<h3>PUT</h3><pre>// TODO: Implement PUT method</pre>`;
});

// DELETE - placeholder 
document.getElementById("deleteBtn").addEventListener("click", () => {
  output.innerHTML = `<h3>DELETE</h3><pre>// TODO: Implement DELETE method</pre>`;
});

// PATCH - placeholder
document.getElementById("patchBtn").addEventListener("click", () => {
  output.innerHTML = `<h3>PATCH</h3><pre>// TODO: Implement PATCH method</pre>`;
});

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

// button effect
document.getElementById("sendBtn").addEventListener("click", async () => {
  const method = document.getElementById("method").value;
  const endpoint = document.getElementById("endpoint").value;

  //default values
  const pathParams = safeJsonParse(document.getElementById("pathParams").value, {});
  const queryParams = safeJsonParse(document.getElementById("queryParams").value, {});
  const body = safeJsonParse(document.getElementById("body").value, null); 

  try {
    let result;

    switch (method) {
      case "GET":
        result = await client.get(endpoint, { pathParams, queryParams });
        break;
      case "POST":
        result = await client.post(endpoint, body, { pathParams, queryParams });
        break;
      case "PUT":
        result = await client.put(endpoint, body, { pathParams, queryParams });
        break;
      case "PATCH":
        result = await client.request("PATCH", endpoint, { data: body, pathParams, queryParams });
        break;
      case "DELETE":
        result = await client.delete(endpoint, { pathParams, queryParams });
        break;
      default:
        throw new Error("Unsupported HTTP method");
    }

    // show response
    showOutput(`${method} ${endpoint}`, result);
  } catch (err) {
    // error
    showError(err);
  }
});

// safely parse JSON
function safeJsonParse(input, fallback = {}) {
  if (!input.trim()) return fallback;
  try {
    return JSON.parse(input);
  } catch {
    return fallback;
  }
}


/*
// GET METHOD - DONE
document.getElementById("getBtn").addEventListener("click", async () => {
  try {
    const data = await client.get("/users");
    showOutput("GET /users", data);
  } catch (err) {
    showError(err);
  }
});

// POST
document.getElementById("postBtn").addEventListener("click", async () => {
    const newUser = { name: "New User", email: "newuser@example.com" };
    try {
      const data = await client.post("/users", newUser);
      showOutput("POST /users", data);
    } catch (err) {
      showError(err);
    }
  });
  
  // PUT
  document.getElementById("putBtn").addEventListener("click", async () => {
    const updatedUser = { name: "Updated Name", email: "updated@example.com" };
    try {
      const data = await client.put("/users/1", updatedUser);
      showOutput("PUT /users/1", data);
    } catch (err) {
      showError(err);
    }
  });

// DELETE
document.getElementById("deleteBtn").addEventListener("click", async () => {
  try {
    const data = await client.delete("/users/1");
    showOutput("DELETE /users/1", data);
  } catch (err) {
    showError(err);
  }
});


// PATCH
document.getElementById("patchBtn").addEventListener("click", async() => {
  const patchUpdate = {name: "Patcher"};
  try {
    const data = await client.patch("/users/1", patchUpdate);
    showOutput("PATCH /users/1", data);
  } catch(err) {
    showError(err);
  }
});

document.getElementById("patchBtn").addEventListener("click", async() => {
  try {
    const response = await client.request("PATCH", "/users/:id", {
      pathParams: { id: 1 },
      data: { email: "patched@example.com" }
    });
    showOutput("PATCH /users/1", response);
  } catch (err) {
    showError(err);
  }
});

*/
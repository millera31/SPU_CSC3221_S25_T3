// Server side Node.js application using Express.
// Serves static files from the Client folder and provides API endpoints to read, add, and delete list items.
// list data is stored in a JSON file on the server.

// setup
const express = require("express");
const path = require("path"); //for path handling
const fm = require("./filemgr"); // file manager module to handle reading and writing list data

const app = express();

// serve static files from the Client folder
app.use(express.static(path.join(__dirname, "Client")));
app.use(express.json()); // parse JSON request bodies

// GET method - reads the list data from the file
app.get("/api", async (req, res) => {
  try {
    const data = await fm.ReadData();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to read data" });
  }
});

//POST method - adds a new item to the list
app.post("/api", async (req, res) => {
  try {
    const data = await fm.ReadData();
    const newItem = req.body.text;
    if (!newItem || typeof newItem !== "string") {
      return res.status(400).json({ error: "Invalid item" });
    }
    data.push(newItem); // add new item to the list
    // write updated list back to the file
    await fm.WriteData(data);
    res.status(201).json({ message: "Item added", list: data });
  } catch {
    res.status(500).json({ error: "Failed to save item" });
  }
});

//DELETE method - deletes an item from the list by index
app.delete("/api/:index", async (req, res) => {
  try {
    const index = parseInt(req.params.index);
    const data = await fm.ReadData();

    if (isNaN(index) || index < 0 || index >= data.length) {
      return res.status(400).json({ error: "Invalid index" });
    }

    data.splice(index, 1); // remove item at the specified index
    // write updated list back to the file
    await fm.WriteData(data);
    res.json({ message: "Item deleted", list: data });
  } catch {
    res.status(500).json({ error: "Failed to delete item" });
  }
});

// fallback for any other routes
app.all("*", (req, res) => {
  res.status(404).send("<h1>Page Not Found...</h1>");
});

// start the server on port 5050
const PORT = 5050;
app.listen(PORT, () => {
  console.log(`Simple List is running at http://localhost:${PORT}`);
});

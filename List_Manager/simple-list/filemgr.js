// File manager module to handle reading from and writing to listdata.json.
// Used by the server to persist list data between requests.

const fs = require("fs/promises"); //import file system module with promises support
const path = require("path"); //node module for handling file paths

// Define the path to the JSON file where list data is stored
const filePath = path.join(__dirname, "listdata.json");

// Function to read data from the JSON file
async function ReadData() {
  try {
    const data = await fs.readFile(filePath, "utf-8"); // Read file content as text
    return JSON.parse(data); // Parse the text content as JSON
  } catch {
    return []; // If reading fails, return an empty list
  }
}

// Function to write data to the JSON file
async function WriteData(dataOut) {
  try {
    // convert data to JSON string with indentation for readability
    await fs.writeFile(filePath, JSON.stringify(dataOut, null, 2));
  } catch (error) {
    console.error("Write Error:", error); // log any errors that happen during writing
  }
}

// export the functions for use in app.js
exports.ReadData = ReadData;
exports.WriteData = WriteData;

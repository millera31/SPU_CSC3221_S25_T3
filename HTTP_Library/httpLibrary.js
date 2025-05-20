// Author: Allie, Quinton, Lina
// Date: 05/19/2025
// Description: HTTP client class using fetch API with async/await


class HttpClient {
    constructor(baseURL) {
      this.baseURL = baseURL;
    }
  
    // GET request
    async get(endpoint) {
      try {
        const response = await fetch(`${this.baseURL}${endpoint}`);
        if (!response.ok) throw new Error(`GET failed: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error("GET Error:", error);
        throw error;
      }
    }
  
    // POST request
    async post(endpoint, data) {
      try{
        const response = await fetch(`${this.baseURL}${endpoint}`,{
          menthod: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`POST failed: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error("POST Error:", error);
        throw error;
      }
    }
  
    // PUT request
    async put(endpoint, data) {
      try{
        const response = await fetch(`${this.baseURL}${endpoint}`,{
          menthod: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`PUT failed: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error("PUT Error:", error);
        throw error;
      }
    }
  
    // TODO: implement DELETE request
    async delete(endpoint) {
      // placeholder for DELETE
    }
  
    // TODO: implement PATCH request
    async patch(endpoint, data) {
      // placeholder for PATCH
    }
  }
  
// Author: Allie, Quinton, Lina
// Date: 05/19/2025
// Description: HTTP client class using fetch API with async/await


class HttpClient {
    constructor(baseURL = "") {
      this.baseURL = baseURL;
    }

    urlConcat(endpoint, path = {}, query = {}) {
      let url = endpoint.replace(/:([a-zA-z0-9_]+)/g, (_, key) => {
        return encodeURIComponent(path[key] || "");
      });

      const fullURL = new URL(this.baseURL + url);

      Object.entries(query).forEach(([key, value]) =>{
        if (value !== undefined && value !== null) {
          fullURL.searchParams.append(key, value);
        }
      });

      return fullURL;
    }

    // Base Request Method
    async request(method, endpoint, {data = null, path = {}, query = {}} = {}) {
      const url = this.urlConcat(endpoint, path, query);

      const options= {
        method,
        headers: {"Content-Type" : "application/json"},
      };

      if(data && method !== "GET") {
        options.body= JSON.stringify(data);
      }

      try {
        const response = await fetch(url, options);
        if(!response.ok) throw new Error(`${method} request failed: ${response.status}`);
        const contentType = response.headers.get("Content-Type");
        return contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text();
      }
      catch(error) {
        console.error(`{method} Error: `, error);
        throw error;
      }
    }

    // Methods
    async get(endpoint, options = {}) {
      return this.request("GET", endpoint, options);
    }
  
    async post(endpoint, data, options = {}) {
      return this.request("POST", endpoint, { ...options, data });
    }
  
    async put(endpoint, data, options = {}) {
      return this.request("PUT", endpoint, { ...options, data });
    }
  
    async delete(endpoint, options = {}) {
      return this.request("DELETE", endpoint, options);
    }

    


  /*
    // GET request
async get(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`); // No body here
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
          method: "POST",
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
          method: "PUT",
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
    async delete(endpoint, data) {
      try{
        const response = await fetch(`${this.baseURL}${endpoint}`, {
          method: "DELETE", 
        });
        if(!response.ok) throw new Error(`DELETE failed: ${response.status}`);
        return await response.json();
      } catch(error) {
        console.error("DELETE Error:", error);
        throw error;
      }
    }
  
    // TODO: implement PATCH request
    async patch(endpoint, data) {
      try{
        const response = await fetch(`${this.baseURL}${endpoint}`, {
          method: "PATCH",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(data), 
        });
        if(!response.ok) throw new Error(`PATCH failed: ${response.status}`);
        return await response.json();
      } catch(error) {
        console.error("PATCH Error:", error);
        throw error;
      }
    }
    */
  }
  

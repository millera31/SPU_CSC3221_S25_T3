// Author: Allie, Quinton, Lina
// Date: 05/19/2025
// Description: HTTP client class using fetch API with async/await


class HttpClient {
    constructor(baseURL = "") {
      this.baseURL = baseURL;
    }

    urlConcat(endpoint, path = {}, query = {}) {
      let url = endpoint.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
        return encodeURIComponent(path[key] || "");
      });

    const fullURL = new URL(url, this.baseURL || window.location.origin);

    Object.entries(query).forEach(([key, value]) => {
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
        console.error(`${method} Error: `, error);
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
  }
  

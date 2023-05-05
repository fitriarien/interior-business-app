const apiUrl = 'http://localhost:8081/';

const serverRoot = {
  baseURL: apiUrl,
  responseType: 'json',
  withCredentials: false,
  post: async function(url, body) {
    const response = await fetch(this.baseURL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    if (response.ok) {
      console.log(response.status);
      return data;
    } else {
      // throw new Error(response.status);
      return response.status;
    }
  }
}

const serverBase = {
  baseURL: apiUrl+'api/',
  responseType: 'json',
  withCredentials: true,
  get: async function(url, token) {
    const response = await fetch(this.baseURL + url, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (response.ok) {
      console.log(response.status);
      return data;
    } else {
      console.log(response.status);
      return response.status;
    }
  },
  post: async function(url, body, token) {
    const response = await fetch(this.baseURL + url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    if (response.ok) {
      console.log(response.status);
      return data;
    } else {
      console.log(response.status);
      return response.status;
    }
  },
  put: async function(url, body, token) {
    const response = await fetch(this.baseURL + url, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    if (response.ok) {
      console.log(response.status);
      return data;
    } else {
      console.log(response.status);
      return response.status;
    }
  },
};

export {serverBase, serverRoot};
const token = localStorage.getItem('token');

const serverRoot = {
  baseURL: 'http://localhost:8081/',
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
    return data;
  }
}

const serverBase = {
  baseURL: 'http://localhost:8081/api/',
  responseType: 'json',
  withCredentials: true,
  get: async function(url) {
    const response = await fetch(this.baseURL + url, {
      method: 'GET',
      credentials: 'include',
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
      throw new Error(response.status);
    }
    // return data;
  },
  post: async function(url, body) {
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
    return data;
  },
  put: async function(url, body) {
    const response = await fetch(this.baseURL + url, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;
  },
};

export {serverBase, serverRoot};
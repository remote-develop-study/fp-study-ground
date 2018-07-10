import axios from 'axios';


const OPTS = {
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  }
};

class HttpClient {
  constructor() {
    this.instance = axios.create(OPTS);
    this.endpoint = '/api/todo';
  }

  message(method, data = {}) {
    return Promise.resolve(this.instance[method](this.endpoint, { data }));
  }
}

export default HttpClient;
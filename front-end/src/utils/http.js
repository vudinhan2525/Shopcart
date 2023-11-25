import axios from 'axios';
class Http {
  instance;
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      timeout: 10000,
    });
  }
}
const http = new Http().instance;
export default http;

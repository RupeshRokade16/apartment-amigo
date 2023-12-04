import axios from 'axios';

const apiCaller = axios.create({
  baseURL: 'http://localhost:5000',
});

export default apiCaller;
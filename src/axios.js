import axios from 'axios';

var axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  /* other custom settings */
});

export default axiosInstance;

// module.exports = axiosInstance;
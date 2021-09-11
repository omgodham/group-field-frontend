import axios from 'axios';

var axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  /* other custom settings */
});

export default axiosInstance;

// module.exports = axiosInstance;
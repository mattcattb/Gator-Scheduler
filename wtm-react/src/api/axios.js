import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND, // Ensure this environment variable is set
  headers: {
    'Content-Type': 'application/json'
  }
});


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
})

export default axiosInstance;
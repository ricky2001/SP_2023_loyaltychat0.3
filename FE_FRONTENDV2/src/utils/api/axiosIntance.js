import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const baseURL = 'http://localhost:3000';
// const baseURL = 'https://us-central1-loyalty-e5fdd.cloudfunctions.net/api';


const axiosInstance = axios.create({
  baseURL,


});

axiosInstance.interceptors.request.use((config) => {
  // const token = useSelector((state) => state.authStore.token);
  if (localStorage.getItem('token')) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return config;
});


axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      const navigate = useNavigate();
      navigate('/login');
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;
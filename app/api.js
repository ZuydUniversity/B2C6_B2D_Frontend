import axios from  'axios';

const api = axios.create({
    baseURL: 'http://98.71.218.67:8000/',
});

export default api;

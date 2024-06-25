import axios from  'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/patients',
});

export default api;
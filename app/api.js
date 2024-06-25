import axios from  'axios';

const api = axios.create({
    baseURL: 'http://52.232.64.59:8000',
});

export default api;


//http://localhost:8000/patients
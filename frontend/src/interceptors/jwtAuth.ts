import axios from 'axios';

const jwtAuth = axios.create({
    baseURL: 'http://localhost:3001',
});

jwtAuth.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default jwtAuth;
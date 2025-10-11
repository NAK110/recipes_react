import axios from "axios"

const axiosApi = axios.create(
    {
        baseURL: 'http://localhost:3000/api',
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        }
    }
)

axiosApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Get token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)


axiosApi.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log('API Error: ', error)
        return Promise.reject(error);
    }
)

export default axiosApi

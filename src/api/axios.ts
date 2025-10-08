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


axiosApi.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log('API Error: ', error)
        return Promise.reject(error);
    }
)

export default axiosApi

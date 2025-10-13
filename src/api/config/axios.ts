import axios from "axios"

const axiosApi = axios.create(
    {
        baseURL: import.meta.env.VITE_API_URL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        }
    }
)

axiosApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axiosApi.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log('API Error: ', error);

        if (!error.response) {
            if (error.request) {
                console.error('Network error - no response received');
            } else {
                console.error('Error setting up request:', error.message);
            }
            return Promise.reject(error);
        }

        const { status, data } = error.response;

        if (status !== 401) {
            return Promise.reject(error);
        }

        const errorCode = data?.code;
        const tokenErrorCodes = ['TOKEN_EXPIRED', 'TOKEN_INVALID', 'TOKEN_VERIFICATION_FAILED', 'NO_TOKEN'];

        if (tokenErrorCodes.includes(errorCode)) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);
export default axiosApi

import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

api.interceptors.request.use((config) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.token) {
        config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config;
});

export const getRoot = () => api.get('/');
export const login = (email, password) => api.post('/auth/login', { email, password });
export const register = (name, email, password, phone) => api.post('/auth/register', { name, email, password, phone });
export const getUserProfile = () => api.get('/users/profile');
export const updateUserProfile = (userData) => api.put('/users/profile', userData);
export const createBooking = (bookingData) => api.post('/bookings', bookingData);


export default api;

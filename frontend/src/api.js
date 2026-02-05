import axios from "axios";
import { getUserInfo } from "./utils/auth";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

api.interceptors.request.use((config) => {
  const userInfo = getUserInfo();
  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

export const getRoot = () => api.get("/");
export const login = (email, password) =>
  api.post("/auth/login", { email, password });
export const register = (name, email, password, phone) =>
  api.post("/auth/register", { name, email, password, phone });
export const loginWithGoogle = (accessToken) =>
  api.post("/auth/google", { accessToken });
export const loginWithFacebook = (accessToken) =>
  api.post("/auth/facebook", { accessToken });
export const getUserProfile = () => api.get("/users/profile");
export const updateUserProfile = (userData) =>
  api.put("/users/profile", userData);
export const createBooking = (bookingData) =>
  api.post("/bookings", bookingData);


export default api;

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
// baseURL: `${import.meta.env.VITE_API_URL}/auth` ,  // in authService.js
});

export const registerUser = (data) => API.post("/register", data);

export const loginUser = (data) => API.post("/login", data);

export default API;
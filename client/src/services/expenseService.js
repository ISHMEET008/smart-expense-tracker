import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/expenses",
});

export const getExpenses = () => {
  const token = localStorage.getItem("token");

  return API.get("/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
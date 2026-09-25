import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/financial",
});


// Get financial summary
export const getFinancialSummary = () => {
  const token = localStorage.getItem("token");

  return API.get("/summary", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// Update financial details
export const updateFinancialDetails = (financialData) => {
  const token = localStorage.getItem("token");

  return API.put("/update", financialData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
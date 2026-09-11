import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/budgets",
  // baseURL: `${import.meta.env.VITE_API_URL}/expenses`,   // in expenseService.js
// baseURL: `${import.meta.env.VITE_API_URL}/budgets`,    // in budgetService.js
// baseURL: `${import.meta.env.VITE_API_URL}/auth`,       // in authService.js
});

// ================= GET ALL BUDGETS =================

export const getBudgets = () => {
  const token = localStorage.getItem("token");

  return API.get("/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ================= GET BUDGET SUMMARY =================

export const getBudgetSummary = (month, year) => {
  const token = localStorage.getItem("token");

  let url = "/summary";

  if (month && year) {
    url += `?month=${month}&year=${year}`;
  }

  return API.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ================= ADD BUDGET =================

export const addBudget = (budgetData) => {
  const token = localStorage.getItem("token");

  return API.post("/", budgetData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ================= UPDATE BUDGET =================

export const updateBudget = (id, budgetData) => {
  const token = localStorage.getItem("token");

  return API.put(`/${id}`, budgetData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ================= DELETE BUDGET =================

export const deleteBudget = (id) => {
  const token = localStorage.getItem("token");

  return API.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
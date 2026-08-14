import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/budgets",
});

// ================= GET BUDGETS =================

export const getBudgets = () => {
  const token = localStorage.getItem("token");

  return API.get("/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ================= GET SUMMARY =================

export const getBudgetSummary = () => {
  const token = localStorage.getItem("token");

  return API.get("/summary", {
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

// ================= UPDATE =================

export const updateBudget = (id, budgetData) => {
  const token = localStorage.getItem("token");

  return API.put(`/${id}`, budgetData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ================= DELETE =================

export const deleteBudget = (id) => {
  const token = localStorage.getItem("token");

  return API.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
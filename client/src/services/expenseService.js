import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/expenses",
});


// ================= GET EXPENSES =================

export const getExpenses = () => {

  const token = localStorage.getItem("token");

  return API.get("/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

};


// ================= GET FINANCIAL SUMMARY =================

export const getFinancialSummary = () => {

  const token = localStorage.getItem("token");

  return API.get("/summary", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

};


// ================= ADD EXPENSE =================

export const addExpense = (expenseData) => {

  const token = localStorage.getItem("token");

  return API.post("/", expenseData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

};


// ================= UPDATE EXPENSE =================

export const updateExpense = (id, expenseData) => {

  const token = localStorage.getItem("token");

  return API.put(`/${id}`, expenseData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

};


// ================= DELETE EXPENSE =================

export const deleteExpense = (id) => {

  const token = localStorage.getItem("token");

  return API.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

};
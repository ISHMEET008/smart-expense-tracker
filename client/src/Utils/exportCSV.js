import Papa from "papaparse";

const exportCSV = (expenses) => {
  const csvData = expenses.map((expense) => ({
    Date: new Date(expense.date).toLocaleDateString("en-IN"),
    Title: expense.title,
    Category: expense.category,
    PaymentMethod: expense.paymentMethod,
    Amount: expense.amount,
    Note: expense.note,
  }));

  const csv = Papa.unparse(csvData);

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "Finova-Expenses.csv";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default exportCSV;
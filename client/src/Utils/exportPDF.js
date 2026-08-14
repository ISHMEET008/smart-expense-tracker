import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportAnalyticsPDF = (analytics) => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("Finova Analytics Report", 14, 20);

  doc.setFontSize(11);
  doc.text(
    `Generated on: ${new Date().toLocaleDateString()}`,
    14,
    30
  );

  // KPI Table
  autoTable(doc, {
    startY: 40,
    head: [["Metric", "Value"]],
    body: [
      [
        "Total Expenses",
        `₹${analytics.totalExpenses.toLocaleString("en-IN")}`,
      ],
      [
        "Highest Expense",
        `₹${analytics.highestExpense.toLocaleString("en-IN")}`,
      ],
      [
        "Average Expense",
        `₹${analytics.averageExpense.toFixed(2)}`,
      ],
      [
        "Average Daily Spend",
        `₹${analytics.averageDailySpend.toFixed(2)}`,
      ],
    ],
  });

  // Category Table
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 15,
    head: [["Category", "Amount"]],
    body: analytics.topCategories.map((item) => [
      item.category,
      `₹${item.amount.toLocaleString("en-IN")}`,
    ]),
  });

  // Payment Table
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 15,
    head: [["Payment Method", "Amount"]],
    body: analytics.paymentMethods.map((item) => [
      item.method,
      `₹${item.amount.toLocaleString("en-IN")}`,
    ]),
  });

  doc.save("Finova-Analytics.pdf");
};

export default exportAnalyticsPDF;
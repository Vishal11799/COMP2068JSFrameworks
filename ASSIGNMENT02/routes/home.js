const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense"); // Import the Expense model
const Budget = require("../models/Budget"); // Import the Budget model
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

// GET home page
router.get("/", async function (req, res, next) {
  try {
    const expenses = await Expense.find({});
    const budget = await Budget.findOne({});
    const remainingBudget = budget ? budget.monthly_budget - budget.spent : 0;

    // Calculate total spending and spending by category
    let totalSpent = 0;
    const categorySpending = {};

    expenses.forEach((expense) => {
      totalSpent += expense.amount;
      if (categorySpending[expense.category]) {
        categorySpending[expense.category] += expense.amount;
      } else {
        categorySpending[expense.category] = expense.amount;
      }
    });

    res.render("home", {
      title: "Home",
      expenses,
      budget: budget ? budget.monthly_budget : 0,
      remainingBudget,
      spent: totalSpent,
      categorySpending: JSON.stringify(categorySpending), // Pass this data to the frontend
      totalSpent,
    });
  } catch (error) {
    next(error);
  }
});

// POST to set monthly budget
router.post("/set-budget", async function (req, res, next) {
  const { monthly_budget } = req.body;

  try {
    let budget = await Budget.findOne({});
    if (!budget) {
      budget = new Budget({ monthly_budget });
    } else {
      budget.monthly_budget = monthly_budget;
    }
    await budget.save();

    res.redirect("/home");
  } catch (error) {
    next(error);
  }
});

// POST expense data
router.post("/add-expense", async function (req, res, next) {
  const {
    category,
    amount,
    date,
    payment_method,
    location,
    description,
    tags,
  } = req.body;

  try {
    const expense = new Expense({
      category,
      amount,
      date,
      payment_method,
      location,
      description,
      tags,
    });

    await expense.save();

    const budget = await Budget.findOne({});
    if (budget) {
      budget.spent += parseFloat(amount);
      await budget.save();
    }

    res.redirect("/home");
  } catch (error) {
    next(error);
  }
});

// GET to edit expense
router.get("/edit-expense/:id", async function (req, res, next) {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).send("Expense not found");
    }
    res.render("edit-expense", { expense });
  } catch (error) {
    next(error);
  }
});

// POST to update expense
router.post("/edit-expense/:id", async function (req, res, next) {
  const {
    category,
    amount,
    date,
    payment_method,
    location,
    description,
    tags,
  } = req.body;

  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).send("Expense not found");
    }

    // Update the expense with new data
    const originalAmount = expense.amount;
    expense.category = category;
    expense.amount = amount;
    expense.date = date;
    expense.payment_method = payment_method;
    expense.location = location;
    expense.description = description;
    expense.tags = tags;

    await expense.save();

    const budget = await Budget.findOne({});
    if (budget) {
      budget.spent += amount - originalAmount;
      await budget.save();
    }

    res.redirect("/home");
  } catch (error) {
    next(error);
  }
});

// POST to delete expense
router.post("/delete-expense/:id", async function (req, res, next) {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res.status(404).send("Expense not found");
    }

    const budget = await Budget.findOne({});
    if (budget) {
      budget.spent -= parseFloat(expense.amount);
      await budget.save();
    }

    res.redirect("/home");
  } catch (error) {
    next(error);
  }
});

// GET to view the charts page
router.get("/charts", async function (req, res, next) {
  try {
    const expenses = await Expense.find({});

    // Calculate total spending by category
    const categorySpending = {};
    expenses.forEach((expense) => {
      if (categorySpending[expense.category]) {
        categorySpending[expense.category] += expense.amount;
      } else {
        categorySpending[expense.category] = expense.amount;
      }
    });

    // Pass the data as a JSON string
    res.render("charts", {
      title: "Spending by Category",
      categorySpending: JSON.stringify(categorySpending), // Correctly serialize the data
    });
  } catch (error) {
    next(error);
  }
});

// GET route to generate and download the PDF for recorded expenses
router.get("/download-expenses", async (req, res, next) => {
  try {
    const expenses = await Expense.find({});

    // Create invoices directory if it doesn't exist
    const invoicesDir = path.join(__dirname, "..", "invoices");
    if (!fs.existsSync(invoicesDir)) {
      fs.mkdirSync(invoicesDir);
    }

    // Define the PDF path
    const invoicePath = path.join(invoicesDir, "recorded-expenses.pdf");

    // Initialize PDF document
    const doc = new PDFDocument({ margin: 30 });
    doc.pipe(fs.createWriteStream(invoicePath));

    // Title
    doc.fontSize(20).text("Recorded Expenses", { align: "center" }).moveDown(2);

    // Table headers
    const headers = [
      "Date",
      "Category",
      "Amount",
      "Payment Method",
      "Location",
      "Description",
      "Tags/Labels",
    ];
    const columnWidths = [100, 100, 70, 100, 100, 120, 100]; // Adjust column widths as needed

    // Print headers
    headers.forEach((header, i) => {
      doc
        .fontSize(12)
        .text(header, doc.x, doc.y, { width: columnWidths[i], align: "left" });
    });
    doc.moveDown(1);

    // Draw a line after headers
    doc
      .moveTo(doc.x, doc.y)
      .lineTo(doc.page.width - doc.page.margins.right, doc.y)
      .stroke();

    // Table rows
    expenses.forEach((expense) => {
      const row = [
        expense.date.toDateString(),
        expense.category,
        `$${expense.amount.toFixed(2)}`,
        expense.payment_method,
        expense.location || "N/A",
        expense.description || "N/A",
        expense.tags || "N/A",
      ];

      row.forEach((text, i) => {
        doc
          .fontSize(10)
          .text(text, doc.x, doc.y, { width: columnWidths[i], align: "left" });
      });

      doc.moveDown(0.5); // Add a small space between rows
    });

    // Finalize the PDF
    doc.end();

    // Download the PDF
    res.download(invoicePath, "recorded-expenses.pdf");
  } catch (error) {
    console.error("Error generating recorded expenses PDF:", error);
    res.status(500).send("Error generating recorded expenses PDF");
  }
});

module.exports = router;

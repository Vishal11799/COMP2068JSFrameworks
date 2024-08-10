// models/Expense.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for an Expense
const expenseSchema = new Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  payment_method: { type: String, required: true },
  location: { type: String },
  description: { type: String },
  tags: { type: String },
});

// Create the model from the schema
const Expense = mongoose.model("Expense", expenseSchema);

// Export the model
module.exports = Expense;

// models/Budget.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for a Budget
const budgetSchema = new Schema({
    monthly_budget: { type: Number, required: true },
    spent: { type: Number, default: 0 }  // Tracks how much of the budget has been spent
});

// Create the model from the schema
const Budget = mongoose.model('Budget', budgetSchema);

// Export the model
module.exports = Budget;
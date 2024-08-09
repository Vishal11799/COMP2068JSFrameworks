var express = require('express');
var router = express.Router();
var Expense = require('../models/Expense'); // Import the Expense model
var Budget = require('../models/Budget');   // Import the Budget model

// GET home page
router.get('/', async function(req, res, next) {
    try {
        const expenses = await Expense.find({});
        const budget = await Budget.findOne({});
        const remainingBudget = budget ? budget.monthly_budget - budget.spent : 0;

        res.render('home', {
            title: 'Home',
            expenses,
            budget: budget ? budget.monthly_budget : 0,
            remainingBudget,
            spent: budget ? budget.spent : 0
        });
    } catch (error) {
        next(error);
    }
});

// POST to set monthly budget
router.post('/set-budget', async function(req, res, next) {
    const { monthly_budget } = req.body;

    try {
        let budget = await Budget.findOne({});
        if (!budget) {
            budget = new Budget({ monthly_budget });
        } else {
            budget.monthly_budget = monthly_budget;
        }
        await budget.save();

        res.redirect('/home');
    } catch (error) {
        next(error);
    }
});

// POST expense data
router.post('/add-expense', async function(req, res, next) {
    const { category, amount, date, payment_method, location, description, tags } = req.body;

    try {
        const expense = new Expense({
            category,
            amount,
            date,
            payment_method,
            location,
            description,
            tags
        });

        await expense.save();

        const budget = await Budget.findOne({});
        if (budget) {
            budget.spent += parseFloat(amount);
            await budget.save();
        }

        res.redirect('/home');
    } catch (error) {
        next(error);
    }
});

// GET to edit expense
router.get('/edit-expense/:id', async function(req, res, next) {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).send('Expense not found');
        }
        res.render('edit-expense', { expense });
    } catch (error) {
        next(error);
    }
});

// POST to update expense
router.post('/edit-expense/:id', async function(req, res, next) {
    const { category, amount, date, payment_method, location, description, tags } = req.body;

    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).send('Expense not found');
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
            budget.spent += (amount - originalAmount);
            await budget.save();
        }

        res.redirect('/home');
    } catch (error) {
        next(error);
    }
});

// POST to delete expense
router.post('/delete-expense/:id', async function(req, res, next) {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if (!expense) {
            return res.status(404).send('Expense not found');
        }

        const budget = await Budget.findOne({});
        if (budget) {
            budget.spent -= parseFloat(expense.amount);
            await budget.save();
        }

        res.redirect('/home');
    } catch (error) {
        next(error);
    }
});

module.exports = router;

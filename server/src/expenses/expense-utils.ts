import { Expense } from "../types";
import { Request, Response } from "express";
import { expenses } from "../constants";

export function createExpenseServer(req: Request, res: Response, expenses: Expense[]) {
    const { id, cost, description } = req.body;

    if (!description || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    const newExpense: Expense = {
        id: id,
        description,
        cost,
    };

    expenses.push(newExpense);
    res.status(201).send(newExpense);
    
}

export function deleteExpense(id: string, res: Response, expenses: Expense[]) {
    console.log("Delete function called with ID:", id);
    
    if (!id) {
        console.log("No ID provided");
        return res.status(400).json({ error: "Missing ID" });
    }

    const expenseIndex = expenses.findIndex(expense => expense.id === id);
    console.log("Found expense at index:", expenseIndex);

    if (expenseIndex === -1) {
        console.log("No expense found with ID:", id);
        return res.status(404).json({ error: "Expense not found" });
    }

    expenses.splice(expenseIndex, 1);
    console.log("Successfully removed expense");
    
    return res.status(200).json({
        message: "Expense deleted successfully",
        newExpenses: expenses
    });
}

export function getExpenses(req: Request, res: Response, expenses: Expense[]) {
    res.status(200).send({ "data": expenses });
}


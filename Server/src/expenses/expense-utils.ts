import { Expense } from "../types";
import { Request, Response } from "express";

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

export function deleteExpense(req: Request, res: Response, expenses: Expense[]) {
    // TO DO: Implement deleteExpense function
    const id: string = req.params.id

    // Check if the id is provided
    if (!id) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    // Find the index of the expense to delete
    const expenseIndex = expenses.findIndex(expense => expense.id === id);

    // Check if the expense exists
    // if (expenseIndex !== -1) {
    //     // Remove the expense from the array
    //     const deletedExpense = expenses.splice(expenseIndex, 1)[0];
    //     // Send success response
    //     return res.status(200).send({ message: "Expense deleted successfully", deletedExpense });
    // } else {
    //     // If the expense does not exist, send a 404 response
    //     return res.status(404).send({ error: "Expense not found" });
    // }

    expenses.splice(expenseIndex, 1)
    res.status(201);
}

export function getExpenses(req: Request, res: Response, expenses: Expense[]) {
    res.status(200).send({ "data": expenses });
}
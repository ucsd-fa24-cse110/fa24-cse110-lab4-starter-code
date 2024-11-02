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
    const { id } = req.params; // Get the ID from request parameters
    const index = expenses.findIndex(expense => expense.id === id); 

    if (index !== -1) {
        expenses.splice(index, 1); // Remove the expense if found
        res.status(200).send({ message: `Expense with ID ${id} has been deleted.` });
    } else {
        res.status(404).send({ message: `Expense with ID ${id} not found.` });
    }
}

export function getExpenses(req: Request, res: Response, expenses: Expense[]) {
    res.status(200).send({ "data": expenses });
}
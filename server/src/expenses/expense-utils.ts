import { Expense } from "../types";
import { Request, Response } from "express";

export function createExpenseServer(req: Request, res: Response, expenses: Expense[]) {
    const { id, cost, description } = req.body;

    if (!description || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    const newExpense: Expense = {
        id,
        description,
        cost,
    };

    expenses.push(newExpense);
    res.status(201).send(newExpense);
}

export function deleteExpense(req: Request, res: Response, expenses: Expense[], id: string) {
    // TO DO: Implement deleteExpense function
    //const id = req.body.id;

    if (!id) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    const updatedExpenses = expenses.filter((currEx) => currEx.id !== id);

    expenses.length = 0;
    expenses.push(...updatedExpenses);

    res.status(204).send(); 
}

export function getExpenses(req: Request, res: Response, expenses: Expense[]) {
    res.status(200).send({ "data": expenses });
}
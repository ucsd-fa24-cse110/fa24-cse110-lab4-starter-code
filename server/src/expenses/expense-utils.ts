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

export function deleteExpense(req: Request, res: Response, expenses: Expense[]) {
    const { id } = req.body;
    console.log(req.body);

    if (!id ) {
        console.log("no Id");
        return res.status(400).send({ error: "Missing required fields" });
    }

    const removedExpense = expenses.filter((expense) => expense.id !== id);
    expenses = removedExpense;
    console.log("removed expense");
    res.status(201).send(expenses);
}

export function getExpenses(req: Request, res: Response, expenses: Expense[]) {
    res.status(200).send({ "data": expenses });
}


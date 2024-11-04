import { Request, Response } from "express";
import { budget } from "../constants";
import { Budget } from "../types";

// Function to get the budget
export function getBudget(req: Request, res: Response) {
    res.status(200).send({ "data": budget });
}

// Function to update the budget
export function updateBudget(req: Request, res: Response) {
    const { amount } = req.body;

    if (amount === undefined || amount === null) {
        return res.status(400).send({ error: "Missing required field: amount" });
    }


    budget.amount = amount;
    res.status(200).send({ message: "Budget updated successfully", newBudget: budget });
    
}
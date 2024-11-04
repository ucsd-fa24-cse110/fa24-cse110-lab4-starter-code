import { getBudget, updateBudget } from "./budget-utils";
import { Request, Response } from 'express';

export function createBudgetEndpoints(app: any, budget: { amount: number }) {
    // Get the budget
    app.get("/budget", (req: Request, res: Response) => {
        getBudget(req, res);
    });

    // Update the budget
    app.put("/budget", (req: Request, res: Response) => { // Expecting PUT method
        const newAmount = req.body.amount;
        console.log("New amount:", newAmount);
        if (typeof newAmount === 'number' && newAmount >= 0) {
            budget.amount = newAmount; // Update the in-memory budget
            res.status(200).json({ amount: budget.amount });
        } else {
            res.status(400).json({ error: "Invalid budget amount" });
        }
    });
}

import { getBudget, updateBudget } from "./budget-utils";
import { Request, Response } from 'express';

export function createBudgetEndpoints(app: any, budget: { amount: number }) {
    // Update the budget
    app.put("/budget", (req: Request, res: Response) => {

        updateBudget(res, req.body, budget);

    });
    
    // Get the budget
    app.get("/budget", (req: Request, res: Response) => {

        getBudget(res, budget.amount);

    });
}
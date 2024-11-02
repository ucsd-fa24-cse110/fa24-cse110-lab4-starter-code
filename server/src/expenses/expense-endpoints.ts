import { createExpenseServer, deleteExpense, getExpenses } from "./expense-utils";
import { Request, Response } from 'express';

export function createExpenseEndpoints(app: any, expenses: any) {
    // Create a new expense
    app.post("/expenses", (req: Request, res: Response) => {
        console.log("hit backend create expense");
        console.log(req)
        createExpenseServer(req, res, expenses);

    });

    // Delete an expense
    app.delete("/expenses/:id", (req: Request, res: Response) => {
        console.log ("hit backend delete expenses");
        deleteExpense(req.params.id.toString(), res, expenses);

    });

    // Get all expenses
    app.get("/expenses", (req: Request, res: Response) => {

        getExpenses(req, res, expenses);

    });

}
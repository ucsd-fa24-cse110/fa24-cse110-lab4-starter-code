import { Response } from 'express';

// Function to get the budget
export function getBudget(res: Response, budget: number) {
    res.status(200).send({ "data": budget });
}

// Function to update the budget
export function updateBudget(res: Response, body: any, budget: { amount: number }) {
    // TO DO: Implement updateBudget function

    const { amount } = body;

    if (amount == null) {
        return res.status(400).send({ error: "Missing required field: amount" });
    }

    // Update the budget value
    budget.amount = amount;

    // Send the updated budget as the response
    res.status(200).send({ message: "Budget updated successfully", budget: budget.amount });

}

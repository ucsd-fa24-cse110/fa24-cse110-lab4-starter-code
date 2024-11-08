// import { Response } from 'express';

// // Function to get the budget
// export function getBudget(res: Response, budget: number) {
//     res.status(200).send({ "data": budget });
// }

// // Function to update the budget
// export function updateBudget(res: Response, body: any, budget: { amount: number }) {
//     // TO DO: Implement updateBudget function
//     const { amount } = body; // Get the updated budget amount from the request body

//     // Validate the incoming budget amount
//     if (amount === undefined || typeof amount !== 'number') {
//         return res.status(400).send({ error: "Invalid budget amount" });
//     }

//     // Update the budget amount
//     budget.amount = amount;

//     // Send a success response with the updated budget amount
//     res.status(200).send({ message: "Budget updated successfully", budget: budget.amount });

// }

import { Response } from 'express';

// Function to get the budget
export function getBudget(res: Response, budget: number) {
    res.status(200).send({ "data": budget });
}

// Function to update the budget
export function updateBudget(res: Response, body: any, budget: { amount: number }) {
    const { amount } = body; // Get the updated budget amount from the request body

    // Validate the incoming budget amount
    if (amount === undefined || typeof amount !== 'number') {
        return res.status(400).send({ error: "Invalid budget amount" });
    }

    // Update the budget amount
    budget.amount = amount;

    // Send a success response with the updated budget amount
    res.status(200).send({ message: "Budget updated successfully", budget: budget.amount });
}

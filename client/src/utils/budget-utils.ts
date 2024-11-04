import { API_BASE_URL } from "../constants/constants";
import { Budget } from "../types/types";

export async function updateBudget(newBudget: Budget): Promise<Budget> {
    const response = await fetch(`${API_BASE_URL}/budget`, {
        method: 'PUT', // Changed to PUT to match the backend endpoint
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: newBudget.amount }), // Ensuring only amount is sent
    });

    if (!response.ok) {
        console.log(response);
        throw new Error('Failed to update budget');
    }

    const updatedBudget: Budget = await response.json();
    return updatedBudget;
}

export async function fetchBudget(): Promise<Budget> {
    const response = await fetch(`${API_BASE_URL}/budget`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch budget');
    }
  
    const budget: Budget = await response.json();
    return budget;
}

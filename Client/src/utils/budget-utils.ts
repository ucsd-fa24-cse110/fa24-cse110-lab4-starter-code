import { API_BASE_URL } from "../constants/constants";

// Function to get budget from the backend. Method: GET
export const fetchBudget = async (): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`,{
        method: "GET"
    });
	if (!response.ok) {
    	throw new Error('Failed to fetch expenses');
	}
    const data = await response.json();
	return data.data;
};

// Function to update the budget
export const updateBudget = async (budget: number): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ budget }),
    });

    if (!response.ok) {
        throw new Error(`Failed to update budget`);
    }

    const fetchedBudget = await response.json();
    return fetchedBudget;
};
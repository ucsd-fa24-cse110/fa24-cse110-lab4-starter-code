// Function to get budget from the backend. Method: GET
export const fetchBudget = async (): Promise<number> => {
    //TODO: Implement

   const response = await fetch('${API_BASE_URL}/budget',{
        method: "GET"
   });
   if (!response.ok){
    throw new Error('Failed to fetch expenses');
   }
   const data = await response.json();
   return data.data;
};

// Function to update the budget in the backend. Method: PUT
export const updateBudget = async (budget: number): Promise<number> => {
    try {
        const response = await fetch('http://localhost:8080/budget', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: budget }),
        });

        if (!response.ok) {
            throw new Error('Failed to update budget');
        }

        const data = await response.json();
        return data.budget; // Assuming the backend returns { budget: number }
    } catch (error) {
        console.error('Error updating budget:', error);
        return 0; // Default value in case of error
    }
};

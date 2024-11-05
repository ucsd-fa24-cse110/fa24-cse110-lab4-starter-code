import { API_BASE_URL } from "../constants/constants";

// export const fetchBudget = async (): Promise<number> => {
//     const response = await fetch(`${API_BASE_URL}/budget`); // Adjust the endpoint as necessary
//     if (!response.ok) {
//         throw new Error("Failed to fetch budget");
//     }
//     const data = await response.json();
//     return data.data; // Return the budget value from the response
// };


// export const updateBudget = async (budget: number): Promise<number> => {
//     const response = await fetch(`${API_BASE_URL}/budget`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ amount: budget }), // Send the updated budget in the request body
//     });

//     // Check if the response is successful
//     if (!response.ok) {
//         throw new Error("Failed to update budget");
//     }

//     const data = await response.json();
//     return data.budget; // Return the updated budget amount
// };




// Function to fetch the budget from the backend. Method: GET
export const fetchBudget = async (): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`); // Adjust the endpoint as necessary
    if (!response.ok) {
        throw new Error("Failed to fetch budget");
    }
    const data = await response.json();
    return data.data; // Return the budget value from the response
};

// Function to update the budget in the backend. Method: PUT
export const updateBudget = async (budget: number): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: budget }), // Send the updated budget in the request body
    });

    // Check if the response is successful
    if (!response.ok) {
        throw new Error("Failed to update budget");
    }

    const data = await response.json();
    return data.budget; // Return the updated budget amount
}; 

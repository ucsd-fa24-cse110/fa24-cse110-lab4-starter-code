// const Budget = () => {
//   return (
//     <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
//       <div>Budget: $1000</div>
//     </div>
//   );
// };

// export default Budget;


// import React, { useEffect, useContext, useState } from "react";
// import { AppContext } from "../../context/AppContext"; // Import AppContext
// import { fetchBudget } from "../../utils/budget-utils"; // Import the fetchBudget function

// const Budget = () => {
//     const { setBudget } = useContext(AppContext); // Assume setBudget is defined in your context
//     const [budget, setBudgetState] = useState<number | null>(null); // State to hold the budget
//     const [loading, setLoading] = useState(true); // Loading state
//     const [error, setError] = useState<string | null>(null); // Error state

//     useEffect(() => {
//         const loadBudget = async () => {
//             try {
//                 const budgetValue = await fetchBudget(); // Call the fetchBudget function
//                 setBudgetState(budgetValue); // Update local budget state
//                 setBudget(budgetValue); // Update budget in context
//             } catch (err: any) {
//                 setError(err.message); // Set error message if fetching fails
//             } finally {
//                 setLoading(false); // End loading state
//             }
//         };

//         loadBudget(); // Invoke the loadBudget function on component mount
//     }, [setBudget]); // Dependency array to call only once on mount

//     if (loading) {
//         return <div>Loading budget...</div>; // Display loading message
//     }

//     if (error) {
//         return <div>Error: {error}</div>; // Display error message if any
//     }

//     return (
//         <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
//             <div>Budget: ${budget !== null ? budget : 0}</div> {/* Display the budget or default to 0 */}
//         </div>
//     );
// };

// export default Budget;


//RICOOO
// import React, { useEffect, useContext, useState } from "react";
// import { AppContext } from "../../context/AppContext"; // Import AppContext
// import { fetchBudget, updateBudget } from "../../utils/budget-utils"; // Import functions

// const Budget = () => {
//     const { budget, setBudget } = useContext(AppContext); // Get budget from context
//     const [newBudget, setNewBudget] = useState<number | null>(null); // State for new budget
//     const [loading, setLoading] = useState(true); // Loading state
//     const [error, setError] = useState<string | null>(null); // Error state

//     useEffect(() => {
//         const loadBudget = async () => {
//             try {
//                 const budgetValue = await fetchBudget();
//                 setNewBudget(budgetValue); // Set initial value to the fetched budget
//                 setBudget(budgetValue); // Set budget in context
//             } catch (err: any) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadBudget();
//     }, [setBudget]);

//     const handleUpdateBudget = async () => {
//         if (newBudget !== null) {
//             try {
//                 const updatedBudget = await updateBudget(newBudget); // Update budget
//                 setBudget(updatedBudget); // Update context
//                 setNewBudget(updatedBudget); // Update local state
//             } catch (err: any) {
//                 setError(err.message); // Handle error
//             }
//         }
//     };

//     if (loading) {
//         return <div>Loading budget...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div className="budget-edit">
//             <h3>Edit Budget</h3>
//             <input
//                 type="number"
//                 value={newBudget || ""}
//                 onChange={(e) => setNewBudget(Number(e.target.value))}
//             />
//             <button onClick={handleUpdateBudget}>Update Budget</button>
//         </div>
//     );
// };

//  export default Budget;


// shit kinda works, budget = 0;

// import React, { useEffect, useState } from "react";
// import { fetchBudget, updateBudget as updateBudgetAPI } from "../../utils/budget-utils";

// const Budget = () => {
//     const [budget, setBudget] = useState(0);
//     const [newBudget, setNewBudget] = useState(0);

//     // Fetch the budget on component mount
//     useEffect(() => {
//         const loadBudget = async () => {
//             try {
//                 const budgetAmount = await fetchBudget();
//                 setBudget(budgetAmount);
//                 setNewBudget(budgetAmount); // Set initial new budget
//             } catch (error) {
//                 console.error("Error fetching budget:", error);
//             }
//         };

//         loadBudget();
//     }, []);

//     // Handle budget update
//     const handleUpdateBudget = async () => {
//         try {
//             const updatedBudget = await updateBudgetAPI(newBudget);
//             setBudget(updatedBudget); // Update local state with new budget
//         } catch (error) {
//             console.error("Error updating budget:", error);
//         }
//     };

//     return (
//         <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
//             <div>Budget: ${budget}</div>
//             <input
//                 type="number"
//                 value={newBudget}
//                 onChange={(e) => setNewBudget(Number(e.target.value))}
//                 className="form-control mx-2"
//             />
//             <button onClick={handleUpdateBudget} className="btn btn-primary">
//                 Update Budget
//             </button>
//         </div>
//     );
// };

// export default Budget;


import React, { useEffect, useState } from "react";
import { fetchBudget, updateBudget as updateBudgetAPI } from "../../utils/budget-utils";

const Budget = () => {
    const [budget, setBudget] = useState(0);
    const [newBudget, setNewBudget] = useState(0);

    // Fetch the budget on component mount
    useEffect(() => {
        const loadBudget = async () => {
            try {
                const budgetAmount = await fetchBudget();
                console.log("Fetched Budget:", budgetAmount); // Debugging line
                setBudget(budgetAmount);
                setNewBudget(budgetAmount); // Set initial new budget
            } catch (error) {
                console.error("Error fetching budget:", error);
            }
        };

        loadBudget();
    }, []);

    // Handle budget update
    const handleUpdateBudget = async () => {
        console.log("Updating Budget to:", newBudget); // Debugging line
        try {
            const updatedBudget = await updateBudgetAPI(newBudget);
            console.log("Updated Budget from API:", updatedBudget); // Debugging line
            setBudget(updatedBudget); // Update local state with new budget
        } catch (error) {
            console.error("Error updating budget:", error);
        }
    };

    return (
        <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
            <div>Budget: ${budget}</div>
            <input
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(Number(e.target.value))}
                className="form-control mx-2"
            />
            <button onClick={handleUpdateBudget} className="btn btn-primary">
                Update Budget
            </button>
        </div>
    );
};

export default Budget;

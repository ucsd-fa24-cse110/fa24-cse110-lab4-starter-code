// import React, { useContext } from "react";
// import { AppContext } from "../../context/AppContext"; // Import AppContext
// import { Expense } from "../../types/types"; // Import Expense type
// import { deleteExpense } from "../../utils/expense-utils";
// import { deleteExpense as deleteExpenseAPI } from "../../utils/expense-utils"; // Import the deleteExpense API function

// const ExpenseItem = (currentExpense: Expense) => {
//   // Consume the AppContext
//   const { expenses, setExpenses } = useContext(AppContext);

//   // Function to delete an expense
//   const handleDeleteExpense = (currentExpense: Expense) => {
//     const updatedExpenses = expenses.filter(
//       (expense) => expense.id !== currentExpense.id
//     );
//     setExpenses(updatedExpenses); // Update the expenses state
    
//   };

//   return (
//     <li className="list-group-item d-flex justify-content-between align-items-center">
//       <div>{currentExpense.description}</div>
//       <div>${currentExpense.cost}</div>
//       <div>
//         <button
//           className="btn btn-danger btn-sm"
//           onClick={() => handleDeleteExpense(currentExpense)}
//         >
//           x
//         </button>
//       </div>
//     </li>
//   );
// };

// export default ExpenseItem;

import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext"; // Import AppContext
import { Expense } from "../../types/types"; // Import Expense type
import { deleteExpense as deleteExpenseAPI } from "../../utils/expense-utils"; // Import the deleteExpense API function

const ExpenseItem = (currentExpense: Expense) => {
  // Consume the AppContext
  const { expenses, setExpenses } = useContext(AppContext);

  // Function to delete an expense
  const handleDeleteExpense = async (currentExpense: Expense) => {
    try {
      // Call the API to delete the expense from the backend
      await deleteExpenseAPI(currentExpense.id); // Make the API call to delete the expense

      // Update the expenses state to remove the expense from the frontend
      const updatedExpenses = expenses.filter(
        (expense) => expense.id !== currentExpense.id
      );
      setExpenses(updatedExpenses); // Update the expenses state
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.description}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDeleteExpense(currentExpense)} // Call the delete function on button click
        >
          x
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;





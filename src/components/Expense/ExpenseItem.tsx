import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext"; // Import AppContext
import { Expense } from "../../types/types"; // Import Expense type

const ExpenseItem = (currentExpense: Expense) => {
  // Consume the AppContext
  const { expenses, setExpenses } = useContext(AppContext);

  // Function to delete an expense
  const handleDeleteExpense = (currentExpense: Expense) => {
    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== currentExpense.id
    );
    setExpenses(updatedExpenses); // Update the expenses state
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.name}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDeleteExpense(currentExpense)}
        >
          x
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;


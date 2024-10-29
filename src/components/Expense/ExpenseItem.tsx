import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";

interface ExpenseItemProps {
  expense: Expense; // Define the props type
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => {
  const { expenses, setExpenses } = useContext(AppContext); // Access context

  const handleDeleteExpense = (expenseId: string) => {
    const updatedExpenses = expenses.filter((item) => item.id !== expenseId);
    setExpenses(updatedExpenses); // Update context with remaining expenses
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{expense.name}</div>
      <div>${expense.cost.toFixed(2)}</div>
      <div>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDeleteExpense(expense.id)}
        >
          x
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;

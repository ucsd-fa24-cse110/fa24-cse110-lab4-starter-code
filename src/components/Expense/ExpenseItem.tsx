import { useContext } from "react";
import { Expense } from "../../types/types";
import { AppContext } from "../../context/AppContext";

const ExpenseItem = (currentExpense: Expense) => {
  // Exercise: Consume the AppContext here
  const {expenses, setExpenses} = useContext(AppContext);

  const handleDeleteExpense = (currentExpense: Expense) => {
    // Exercise: Remove expense from expenses context array
    setExpenses(expenses.filter(expense => expense.id !== currentExpense.id))
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div data-testid={`testName${currentExpense.id}`}>{currentExpense.name}</div>
      <div data-testid={`testCost${currentExpense.id}`}>${currentExpense.cost}</div>
      <div>
        <button onClick={() => handleDeleteExpense(currentExpense)} data-testid = {currentExpense.id}>x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;

import { useContext } from "react";
import { Expense } from "../../types/types";
import { AppContext } from "../../context/AppContext";

const ExpenseItem = (currentExpense: Expense) => {
  // Exercise: Consume the AppContext here
  const {expenses, setExpenses} = useContext(AppContext);
  const handleDeleteExpense = (currentExpense: Expense) => {
    // Exercise: Remove expense from expenses context array
    const updatedExpenses = expenses.filter(
        (e) => e.id !== currentExpense.id
    );
    setExpenses(updatedExpenses);
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.name}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button aria-label={currentExpense.name} onClick={() => handleDeleteExpense(currentExpense)}>x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;

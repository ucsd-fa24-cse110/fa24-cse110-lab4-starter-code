import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
import {useContext} from "react"
import { deleteExpense } from "../../utils/expense-utils";


const ExpenseItem = (currentExpense: Expense) => {
  // Exercise: Consume the AppContext here
  const { expenses, setExpenses } = useContext(AppContext);

  const handleDeleteExpense = (currentExpense: Expense) => {
    // Exercise: Remove expense from expenses context array
    const id: string = currentExpense.id
    deleteExpense(id)
    setExpenses(expenses.filter(a => a.id != id));
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.description}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button data-testid="delete" onClick={() => handleDeleteExpense(currentExpense)}>x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;
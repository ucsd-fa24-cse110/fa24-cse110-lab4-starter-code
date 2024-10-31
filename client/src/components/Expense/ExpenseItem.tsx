import { Expense } from "../../types/types";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import exp from "constants";

const ExpenseItem = (currentExpense: Expense) => {
  // Exercise: Consume the AppContext here
  const app = useContext(AppContext);

  // const handleDeleteExpense = (currentExpense: Expense) => {
  //   // Exercise: Remove expense from expenses context array
  //   app.setExpenses(app.expenses.filter((exp) => exp !== currentExpense));
  // };

  const handleDeleteExpense = (id: string) => {
    // Exercise: Remove expense from expenses context array
    app.setExpenses(app.expenses.filter((Expense) => Expense.id !== id));
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.name}</div>
      <div>${currentExpense.cost}</div>
      <div data-testid="expenses">
        {/* <button onClick={() => handleDeleteExpense(currentExpense)}>x</button> */}
        <button onClick={() => handleDeleteExpense(currentExpense.id)}>x</button>
        
      </div>
    </li>
  );
};

export default ExpenseItem;

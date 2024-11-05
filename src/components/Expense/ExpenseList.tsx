import ExpenseItem from "./ExpenseItem";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { Expense } from "../../types/types";

const ExpenseList = () => {
  const { expenses } = useContext(AppContext); // Access expenses from context

  return (
    <ul className="list-group">
      {expenses.map((expense: Expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </ul>
  );
};

export default ExpenseList;

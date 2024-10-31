import ExpenseItem from "./ExpenseItem";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { Expense } from "../../types/types";
import { useEffect } from "react";
import { createExpense } from "../../utils/expense-utils";
import { fetchExpenses } from "../../utils/expense-utils";


const ExpenseList = () => {
    const { expenses, setExpenses } = useContext(AppContext);

    // Fetch expenses on component mount
    useEffect(() => {
    loadExpenses();
    }, []);
  
    // Function to load expenses and handle errors
    const loadExpenses = async () => {
    try {
      const expenseList = await fetchExpenses();
      setExpenses(expenseList);
    } catch (err: any) {
      console.log(err.message);
    }
    };

  return (
    <ul className="list-group">
      {expenses.map((expense: Expense) => (
        <ExpenseItem
          key={expense.id}  // Add key here
          id={expense.id}
          description={expense.description}
          cost={expense.cost}
        />
      ))}
    </ul>
  );
};

export default ExpenseList;

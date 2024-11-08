// import ExpenseItem from "./ExpenseItem";
// import { AppContext } from "../../context/AppContext";
// import { useContext } from "react";
// import { Expense } from "../../types/types";

// const ExpenseList = () => {
//   const { expenses } = useContext(AppContext);

//   return (
//     <ul className="list-group">
//       {expenses.map((expense: Expense) => (
//         <ExpenseItem id={expense.id} description={expense.description} cost={expense.cost} />
//       ))}
//     </ul>
//   );
// };

// export default ExpenseList;


import React, { useContext, useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
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
      console.log("Failed to load expenses:", err.message);
    }
  };

  return (
    <ul className="list-group">
      {expenses.map((expense: Expense) => (
        <ExpenseItem
          key={expense.id} // Always add a unique key for mapped elements
          id={expense.id}
          description={expense.description}
          cost={expense.cost}
        />
      ))}
    </ul>
  );
};

export default ExpenseList;

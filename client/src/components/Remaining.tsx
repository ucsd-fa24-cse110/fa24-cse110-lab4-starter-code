import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses, budget } = useContext(AppContext); // Access budget from context

  // Calculate the total expenses using reduce
  const totalExpenses = expenses.reduce((total, item) => {
    return total + item.cost;
  }, 0);

  // Calculate the remaining budget
  const remaining = budget - totalExpenses;

  // Determine the alert type based on the remaining balance
  const alertType = remaining < 0 ? "alert-danger" : "alert-success";

  // Trigger an alert when remaining is less than 0
  useEffect(() => {
    if (remaining < 0) {
      alert("Warning: You have exceeded your budget!");
    }
  }, [remaining]);

  return (
    <div className={`alert ${alertType}`}>
      <span>Remaining: ${remaining}</span>
    </div>
  );
};

export default Remaining;


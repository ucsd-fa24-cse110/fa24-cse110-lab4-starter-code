import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses } = useContext(AppContext);
  let budget = 1000;

  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);

  const remaning = budget - totalExpenses;

  const alertType = totalExpenses > budget ? "alert-danger" : "alert-success";

  // Exercise: Create an alert when Remaining is less than 0.
  useEffect (() => {
    if (remaning < 0) {
      alert("You have exceeded your budget!");
    }
  }, [remaning]);

  return (
    <div className={`alert ${alertType}`}>
      {remaning < 0 ? (<span>You have exceeded your budget!</span>) : (<span>Now Remaining: ${remaning}</span>)}
      
      
    </div>
  );
};

export default Remaining;

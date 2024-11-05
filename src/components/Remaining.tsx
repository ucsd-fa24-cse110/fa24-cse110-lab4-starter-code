import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses,budget } = useContext(AppContext);

  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);

  
  const remainingBalance = budget - totalExpenses;
  const alertType = remainingBalance < 0 ? "alert-danger" : "alert-success";
  // Exercise: Create an alert when Remaining is less than 0.
  useEffect(() => {
    if (remainingBalance < 0) {
      window.alert("You have exceeded your budget!");
    }
  }, [remainingBalance]);


  return (
    <div className={`alert ${alertType}`}>
      <span>Remaining: ${remainingBalance}</span>
    </div>
  );
};

export default Remaining;

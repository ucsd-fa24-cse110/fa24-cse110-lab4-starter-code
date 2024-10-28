import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses } = useContext(AppContext);
  let budget = 1000;

  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);

  const remaining = budget - totalExpenses;

  const alertType = budget - totalExpenses < 0 ? "alert-danger" : "alert-success"; 
  // Exercise: Create an alert when Remaining is less than 0.

  // js alert
  useEffect(() => {
    if (remaining < 0) {
      alert("youve exceeded your budget");
    }
  }, [remaining]); 

  return (
    <div className={`alert ${alertType}`}>
      <span>Remaining: ${budget - totalExpenses}</span>
    </div>
  );
};

export default Remaining;

import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses } = useContext(AppContext);
  const { budget } = useContext(AppContext);

  //let budget = 1000;

  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);

  const alertType = Number(totalExpenses) > Number(budget) ? "alert-danger" : "alert-success";

  // Exercise: Create an alert when Remaining is less than 0. done
   const remaining = Number(budget) - Number(totalExpenses);

  // Use useEffect to show an alert when remaining is less than 0 done
  useEffect(() => {
    if (remaining < 0) {
      window.alert("Warning: Budget is less than 0!");
    }
  }, [remaining]);


  return (
    <div className={`alert ${alertType}`}>
      <span>Remaining: ${Number(budget) - totalExpenses}</span>
    </div>
  );
};

export default Remaining;

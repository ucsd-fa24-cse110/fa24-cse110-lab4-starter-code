import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses } = useContext(AppContext);
  let budget = 1000;

  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);

  const alertType = totalExpenses > budget ? "alert-danger" : "alert-success";

  // Exercise: Create an alert when Remaining is less than 0.
  //calculate the Remaining expenses based on the budget and all the expenses. 
  //create an alert if the remaining balance < 0 
  const balance = budget - totalExpenses;
  useEffect(() => {
  if(balance < 0){
    alert("Remaining balance is less than 0!");
  }

}, [balance]);

  return (
    <div className={`alert ${alertType}`}>
      <span>Remaining: ${balance }</span>
    </div>
  );
};

export default Remaining;

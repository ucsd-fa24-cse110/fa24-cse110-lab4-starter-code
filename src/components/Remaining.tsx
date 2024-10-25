import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses, budget } = useContext(AppContext);

  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);

  const remainingBudget = budget - totalExpenses;
  const alertType = remainingBudget < 0 ? "alert-danger" : "alert-success";

  // Exercise: Create an alert when Remaining is less than 0.
  // const costInput = document.getElementById("cost").addEventListner();
  if(remainingBudget < 0){
    alert("You have exceeded your budget!");
  }


  return (
    <div className={`alert ${alertType}`}>
      <span>Remaining: ${budget - totalExpenses}</span>
    </div>
  );
};

export default Remaining;

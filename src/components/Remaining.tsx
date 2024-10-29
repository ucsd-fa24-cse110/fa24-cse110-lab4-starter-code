import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses, budget } = useContext(AppContext); // Access budget from context
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0);
  const remainingBalance = budget - totalExpenses;
  const alertType = remainingBalance < 0 ? "alert-danger" : "alert-success";

  useEffect(() => {
    if (remainingBalance < 0) {
      setAlertMessage("Warning: You have exceeded your budget!");
    } else {
      setAlertMessage(null);
    }
  }, [remainingBalance]);

  return (
    <>
      <div className={`alert ${alertType}`}>
        <span>Remaining: ${remainingBalance}</span>
      </div>
      {alertMessage && (
        <div className="alert alert-warning mt-2">
          <span>{alertMessage}</span>
        </div>
      )}
    </>
  );
};

export default Remaining;

import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";


const Budget = () => {
  const { expenses, budget } = useContext(AppContext);

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <div>Budget: ${budget}</div>
    </div>
  );
};

export default Budget;

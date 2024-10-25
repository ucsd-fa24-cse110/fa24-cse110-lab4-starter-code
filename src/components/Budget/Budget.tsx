import { useContext, useEffect } from "react";
import { AppContext } from "/Users/Sara/Desktop/fa24-cse110-lab4-starter-code/src/context/AppContext";

const Budget = () => {
  const { budget } = useContext(AppContext);

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <div>Budget: {budget}</div>
    </div>
  );
};

export default Budget;

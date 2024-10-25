import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [editingBudget, setEditingBudget] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);

  const handleSaveBudget = () => {
    setBudget(newBudget);
    setEditingBudget(false);
  };

  return (
    <div className="alert alert-secondary p-2 d-flex align-items-center justify-content-between">
      {editingBudget ? (
        <div className="d-flex align-items-center">
          <input type="number" value={newBudget} onChange={(e) => setNewBudget(Number(e.target.value))} />
          <button onClick={handleSaveBudget} className="btn btn-primary ms-3">
            Save
          </button>
        </div>
      ) : (
        <div className="d-flex align-items-center">
          <span>Budget: ${budget}</span>
          <button onClick={() => setEditingBudget(true)} className="btn btn-secondary ms-3">
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Budget;

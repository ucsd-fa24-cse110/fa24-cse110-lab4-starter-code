import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext); // Assume setBudget is provided by AppContext
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);

  const handleSave = () => {
    setBudget(newBudget); // Update the budget in context
    setIsEditing(false);   // Exit editing mode
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      {isEditing ? (
        <div className="d-flex align-items-center">
          <input
            type="number"
            value={newBudget}
            onChange={(e) => setNewBudget(Number(e.target.value))}
            className="form-control me-2"
          />
          <button className="btn btn-primary" onClick={handleSave}>Save</button>
          <button className="btn btn-secondary ms-2" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          Budget: ${budget}{" "}
          <button className="btn btn-link" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Budget;
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setBudget(newBudget);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setNewBudget(budget); // Revert to the original budget
    setIsEditing(false);
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      {isEditing ? (
        <>
          <input
            type="number"
            className="form-control"
            value={newBudget}
            onChange={(e) => setNewBudget(Number(e.target.value))}
            style={{ maxWidth: "50px" }}
          />
          <button className="btn btn-primary ml-2" onClick={handleSaveClick}>
            Save
          </button>
          <button className="btn btn-secondary ml-2" onClick={handleCancelClick}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <div>Budget: ${budget}</div>
          <button className="btn btn-primary" onClick={handleEditClick}>
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default Budget;

import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (e: React.FormEvent) => {
    e.preventDefault();
    setBudget(newBudget); 
    setIsEditing(false);
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      {isEditing ? (
        <form onSubmit={handleSaveClick}>
          <input
            type="number"
            value={newBudget}
            onChange={(e) => setNewBudget(Number(e.target.value))}
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <div>
          <span>Budget: ${budget}</span>
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default Budget;

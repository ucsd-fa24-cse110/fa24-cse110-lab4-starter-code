import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { updateBudget } from "../../utils/budget-utils"; // Adjust the import path if needed

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [budgetAmount, setBudgetAmount] = useState(budget.amount);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      // Use the imported updateBudget function to update the backend
      const updatedBudget = await updateBudget({ amount: budgetAmount });
      setBudget(updatedBudget); // Update context with the response
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update budget:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudgetAmount(Number(e.target.value));
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      {isEditing ? (
        <div className="d-flex align-items-center">
          <input
            type="number"
            value={budgetAmount}
            onChange={handleInputChange}
            className="form-control"
          />
          <button onClick={handleSaveClick} className="btn btn-primary ml-2">
            Save
          </button>
        </div>
      ) : (
        <div>Budget: ${budget.amount}</div>
      )}
      {!isEditing && (
        <button onClick={handleEditClick} className="btn btn-primary ml-2">
          Edit
        </button>
      )}
    </div>
  );
};

export default Budget;

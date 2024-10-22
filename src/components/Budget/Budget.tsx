import { AppContext } from "../../context/AppContext";
import { useContext, useState } from "react"

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext)
  const [newBudget, setNewBudget] = useState<number>(budget);
  
  // Update the budget in context
  const handleUpdateBudget = (e: React.FormEvent) => {
    e.preventDefault();
    setBudget(newBudget);
  };
  
  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <form>
      <label htmlFor="budget">Budget:</label>
        <input
          type="number"
          id="budget"
          value={newBudget}
          onChange={(e) => setNewBudget(Number(e.target.value))}
          className="form-control"
        />
      </form>
      <button onClick={handleUpdateBudget}>Update Budget</button>
      <div>
          
      </div>
    </div>
  );
};

export default Budget;

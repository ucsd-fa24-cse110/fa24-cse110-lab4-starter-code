import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempBudget, setTempBudget] = useState<number>(budget);
  // Fetch expenses on component mount
  useEffect(() => {
    getBudget();
  }, []);
  
  // Function to load expenses and handle errors
  const getBudget = async () => {
  try {
    const newBudget = await fetchBudget();
    setBudget(newBudget);
  } catch (err: any) {
    console.log(err.message);
  }
  };

  const handleEdit = () => { 
    setIsEditing(true);
  }
  
  const handleSave = (newBudget:number) => {
    setIsEditing(false);
    updateBudget(newBudget);
    setBudget(newBudget);
  }

  const handleChange = (tempBudget: number) =>{ 
    setTempBudget(tempBudget)
  }

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      {
        isEditing ? (
          <>
            <input 
              type="input" value = {tempBudget} onChange={(e) => handleChange(Number(e.target.value))}
            ></input> 
            <button onClick={() => handleSave(tempBudget)}> Save </button>
          </>
        ) : (
          <div>Budget: {budget} <button onClick={handleEdit}>Edit</button></div>
        )
      }
    </div>
  );
};

export default Budget;

import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext"; 

const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  const { setExpenses } = useContext(AppContext); 

  // Exercise: Create name and cost to state variables
  const [name, setName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || cost <= 0) {
      alert("Please enter a valid name and cost.");
      return;
    }

    // Exercise: Add add new expense to expenses context array
    const newExpense = {
      id: Date.now().toString(), 
      name,
      cost,
    };

    setExpenses((prevExpenses) => [...prevExpenses, newExpense]); 

    setName("");
    setCost(0);

  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            // HINT: onChange={}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="number"
            className="form-control"
            id="cost"
            value={cost} 
            onChange={(e) => setCost(parseFloat(e.target.value))} // check
            // HINT: onChange={}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;

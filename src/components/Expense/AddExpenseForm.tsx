import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";


const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  const app = useContext(AppContext);

  // Exercise: Create name and cost to state variables
  const [name,setName] = useState<string>("");
  const [cost,setCost] = useState<number>(0);
  
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Exercise: Add add new expense to expenses context array
    let new_expense:Expense = {id:"-1", name:name, cost:cost}; 
    app.setExpenses([...app.expenses,new_expense]);

    // to reset the form for every new submit
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
            value={name}          // bound the value to the name State 
            // HINT: onChange={}
            // onChange={()=> setName({...createName, name:event.target.value})}
            onChange={(event)=> setName(event.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            value={cost}        // bound the value to the cost State 
            // HINT: onChange={}
            onChange={(event)=> setCost(Number(event.target.value))}
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

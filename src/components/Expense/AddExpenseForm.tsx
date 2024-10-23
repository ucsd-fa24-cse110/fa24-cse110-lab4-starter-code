import React, { useState, useContext } from "react";
//Import useContext from React and AppContext from your context file
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";

const AddExpenseForm = () => {
  //consume the AppContext here

  //Use the useContext hook to access the expenses and setExpenses from AppContext
  const { expenses, setExpenses } = useContext(AppContext);

  // create name and cost to state variables
  const [name, setName] = useState("");
  //made this a string so user can manually enter a number 
  const [cost, setCost] = useState<string>("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // add new expense to expenses context array
    const newExpense: Expense = {

      id: (expenses.length + 1).toString(),
      name: name,
      //typecast to number
      cost: Number(cost),
    };

    setExpenses([...expenses, newExpense]);

    //reset after submission
    setName("");
    setCost("");

    
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
            onChange={(e) => setCost((e.target.value))}
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

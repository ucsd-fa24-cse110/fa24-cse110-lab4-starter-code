import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  const { expenses, setExpenses } = useContext(AppContext)!;

  // Exercise: Create name and cost to state variables
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Exercise: Add add new expense to expenses context array
    const newExpense = {
      id: (expenses.length + 1).toString(),  // Generate an ID based on the length of expenses
      name: name,
      cost: parseFloat(cost), // Convert cost to a number
    };
    setExpenses([...expenses, newExpense]);
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
            placeholder="Expense Name"
            onChange={(event) => setName(event.target.value)}
            // HINT: onChange={}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            value={cost}
            placeholder="Expense Cost"
            onChange={(event) => setCost(event.target.value)}
            
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

import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";

const AddExpenseForm = () => {
  const { expenses, setExpenses } = useContext(AppContext); // Access context
  const [name, setName] = useState<string>(""); // Manage name input state
  const [cost, setCost] = useState<string>(""); // Manage cost input state

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newExpense: Expense = {
      id: Date.now().toString(), // Convert id to string
      name,
      cost: parseFloat(cost),
    };

    setExpenses([...expenses, newExpense]); // Add new expense to context
    setName(""); // Reset input fields
    setCost("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name state
          />
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="number"
            className="form-control"
            id="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)} // Update cost state
          />
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

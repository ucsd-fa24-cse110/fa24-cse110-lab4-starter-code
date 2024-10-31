import React, { useContext, useState } from "react";
import { createExpense } from "../../utils/expense-utils";
import { AppContext } from "../../context/AppContext";

const AddExpenseForm = () => {
  // Consume the AppContext here
  const { expenses, setExpenses } = useContext(AppContext);

  // Create name and cost state variables
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create new expense object
    const newExpense = {
      id: (expenses.length + 1).toString(),  
      description: name,
      cost: parseFloat(cost.toString()), 
    };
    createExpense(newExpense);
    setExpenses([...expenses, newExpense]);

    setName('');
    setCost('');
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
            onChange={(event) => setName(event.target.value)}  
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
            onChange={(event) => setCost(event.target.value)}  
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

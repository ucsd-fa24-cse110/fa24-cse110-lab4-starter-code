import React, { useContext, useState } from "react";
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
      id: (expenses.length + 1).toString(),  // or you can use a unique id generator
      name,
      cost: parseFloat(cost.toString()), // Make sure cost is a number
    };

    // Add new expense to the existing expenses array
    setExpenses([...expenses, newExpense]);

    // Reset form fields
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
            onChange={(event) => setName(event.target.value)}  // Handle name input change
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
            onChange={(event) => setCost(event.target.value)}  // Handle cost input change
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

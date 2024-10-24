  import React, { useContext, useState } from "react";
  import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";

  const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  const { expenses, setExpenses } = useContext(AppContext)

  // Exercise: Create name and cost to state variables
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Exercise: Add add new expense to expenses context array
    const currExpense: Expense = {
      id: expenses.length,
      name: name,
      cost: parseFloat(cost)
    }

    setExpenses((prevExpenses) => [...prevExpenses, currExpense]);

    setName('');
    setCost('');
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
            value = {name}
            onChange={(e) => setName(e.target.value)}
            data-testid = "nameInput"
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            value = {cost}
            onChange={(e) => setCost(e.target.value)}
            data-testid = "costInput"
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

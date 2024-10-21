import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
import { parse } from "path";

const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here DONE
  const { expenses, setExpenses } = useContext(AppContext);

  // Exercise: Create name and cost to state variables
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);



  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Exercise: Add add new expense to expenses context array Done


      const newExpense: Expense = { id: (expenses.length + 1).toString(), name: name, cost: cost }; //DOUBLECHEKC

    // Update the expenses array    DONE 
    setExpenses([...expenses, newExpense]);

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
            // HINT: onChange={} DONE
            onChange={(e) => setName(e.target.value)}
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
            // HINT: onChange={} DONE
            onChange={(e) => setCost(parseInt(e.target.value))}

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

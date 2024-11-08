import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
import { createExpense } from "../../utils/expense-utils";


const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  const app = useContext(AppContext);

  // Exercise: Create name and cost to state variables
  const [name,setName] = useState<string>("");
  const [cost,setCost] = useState<number>(0);
  
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Exercise: Add add new expense to expenses context array
    // console.log(Number((app.expenses[(app.expenses.length)-1]).id));
    //String(Number(app.expenses[app.expenses.length-1].id)+1)
    if (app.expenses.length > 0){      
      var new_expense:Expense = {id:String(Number((app.expenses[(app.expenses.length)-1]).id)+1), name:name, cost:cost}; 
    }else {
      var new_expense:Expense = {id:String(0), name:name, cost:cost}; 
    };
    createExpense(new_expense); //maybe like this?
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
            data-testid="NAME"
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
            data-testid="COST"
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

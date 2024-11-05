// import React, { useState } from "react";
// const AddExpenseForm = () => {
//   // Exercise: Consume the AppContext here

//   // Exercise: Create name and cost to state variables

//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     // Exercise: Add add new expense to expenses context array
//   };

//   return (
//     <form onSubmit={(event) => onSubmit(event)}>
//       <div className="row">
//         <div className="col-sm">
//           <label htmlFor="name">Name</label>
//           <input
//             required
//             type="text"
//             className="form-control"
//             id="name"
//             value={""}
//             // HINT: onChange={}
//           ></input>
//         </div>
//         <div className="col-sm">
//           <label htmlFor="cost">Cost</label>
//           <input
//             required
//             type="text"
//             className="form-control"
//             id="cost"
//             value={0}
//             // HINT: onChange={}
//           ></input>
//         </div>
//         <div className="col-sm">
//           <button type="submit" className="btn btn-primary mt-3">
//             Save
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default AddExpenseForm;


import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext"; // Import the AppContext
import { createExpense } from "../../utils/expense-utils";

const AddExpenseForm = () => {
  // Consume the AppContext
  const { expenses, setExpenses } = useContext(AppContext);

  // Create state variables for form inputs
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");

  // Handle form submission
  // const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   // Create new expense object
  //   const newExpense = {
  //     id: Math.random().toString(36).substr(2, 9), // Generate a random ID
  //     description: name,
  //     cost: parseFloat(cost), // Ensure cost is a number
  //   };

  //   // Add new expense to the expenses array
  //   setExpenses([...expenses, newExpense]);

  //   // Clear the form after submission
  //   setName("");
  //   setCost("");
  // };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Create new expense object
    const maxId = expenses.length > 0 ? Math.max(...expenses.map((expense) => parseInt(expense.id))) : 0;

    const newExpense = {
      // id: Math.random().toString(36).substr(2, 9),
      // id: (expenses.length + 1).toString(),
      id: (maxId + 1).toString(),
      description: name,
      cost: parseFloat(cost),
    };
  
    try {
      // Send new expense to the backend
      const savedExpense = await createExpense(newExpense);
  
      // Add new expense to the expenses array in context
      setExpenses([...expenses, savedExpense]);
  
      // Clear the form after submission
      setName("");
      setCost("");
    } catch (error) {
      console.error("Failed to create expense:", error);
    }
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
            value={name} // Controlled input
            onChange={(e) => setName(e.target.value)} // Update state on input change
          />
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="number"
            className="form-control"
            id="cost"
            value={cost} // Controlled input
            onChange={(e) => setCost(e.target.value)} // Update state on input change
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

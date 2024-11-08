import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import ExpenseList from './components/Expense/ExpenseList';
import AddExpenseForm from './components/Expense/AddExpenseForm';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });



test("Testing the New Expense", () => {
    render(<App/>);
    const expenseList = screen.queryAllByTestId("expenses");
    console.log(expenseList);

    //adding the new expense item through the form
    const createName = screen.getByTestId("NAME");
    const createCost = screen.getByTestId("COST");
    const saveButton = screen.getByText("Save");
    fireEvent.change(createName, {target:{value:"Sardines!"}});
    fireEvent.change(createCost, {target:{value:10}});
    fireEvent.click(saveButton);
    
    //checking its existence on the website
    const newName = screen.getByText("Sardines!");
    const newCost = screen.getByText("$10");
    const spendings = screen.getByTestId("SPENT").textContent;
    const remaining = screen.getByTestId("REMAINING").textContent;
    
    expect(newName).toBeInTheDocument();
    expect(newCost).toBeInTheDocument();
    expect(spendings).toBe("Spent so far: $10");
    expect(remaining).toBe("Remaining: $1990");
    
    const newexpenseList = screen.getAllByTestId("expenses");
    expect(newexpenseList.length).toEqual(1);
  });

describe("delete an expense", () => {
  test("delete an expense sucessfully" , ()=> {
  render(<App/>);

  //adding the new expense item through the form for deletion
  const createName = screen.getByTestId("NAME");
  const createCost = screen.getByTestId("COST");
  const saveButton = screen.getByText("Save");
  fireEvent.change(createName, {target:{value:"Sardines!"}});
  fireEvent.change(createCost, {target:{value:10}});
  fireEvent.click(saveButton);

  // get the length of the expense list
  const expenseList = screen.queryAllByTestId("expenses");
  
  // get the delete button from screen 
  const deleteXButton = screen.getAllByText("x")[0];

  // // grab expense with the testID
  // const expenseToRemove = screen.getAllByTestId("expenses");

  // checking if the expense in the expenseArr exists 
  expect(expenseList.length).toBeGreaterThan(0);

  fireEvent.click(deleteXButton);
  
  // check if the length of expense arr updated to confirm 
  const updatedExpenseList = screen.queryAllByTestId("expenses");
  expect(updatedExpenseList.length).toBe(expenseList.length-1);

  //checking its absence on the website
  const newName = screen.queryByText("Sardines!");
  const newCost = screen.queryByText("$10");
  expect(newName).toBeNull;
  expect(newCost).toBeNull;


  // need to add multiple expenses 
  const names = ["Sardines","Coat","Van", "Spray on Shoes"];
  const costs = [10,20,300,350];

  for (let i =0; i<costs.length; i++){
    fireEvent.change(createName, {target:{value:names[i]}});
    fireEvent.change(createCost, {target:{value:costs[i]}});
    fireEvent.click(saveButton);
  }
  
  //______deleting ALL expenses______//

  const allDeleteXButtons = screen.getAllByText("x");
  allDeleteXButtons.forEach((deleteButton) => {
    fireEvent.click(deleteButton);
  })
 
  //create checker to validate all expenses deleted
  expect(updatedExpenseList.length).toBe(0);
  
  for (let i=0; i<costs.length; i++){
    const newName = screen.queryByText(names[i]);
    const newCost = screen.queryByText("$"+costs[i].toString());
    expect(newName).toBeNull;
    expect(newCost).toBeNull;
  }
  });
});


describe("budget balance verification", () => {
  test("verify if budget balance eq holds true", () => {
  render(<App/>);
  
  // _____________ Check if equation remains true NO OPERATIONS _____________  // 
  
  // Do initial verification that budget == remaining AND spending is $0
  const initialBudget = screen.getByText(/Budget: \$/).textContent;
  const initialRemaining = screen.getByText(/Remaining: \$/).textContent;
  const initialSpent = screen.getByText(/Spent so far: \$/).textContent; 

  // splicing out the phrases to get ONLY the number
  const initialBudgetValue = Number(initialBudget?.replace("Budget: $", "") || 0);
  const initialRemainingValue = Number(initialRemaining?.replace("Remaining: $", "") || 0);
  const initialSpentValue = Number(initialSpent?.replace("Spent so far: $", "") || 0);

  // Initial Base Verification Equation Check
  const sum = Number(initialRemainingValue) + Number(initialSpentValue); 
  expect(initialBudgetValue).toEqual(sum);


  // _____________ Check if equation remains true after ADDING  _____________  // 
  
  // Add an expense 
  const createName = screen.getByTestId("NAME");
  const createCost = screen.getByTestId("COST");
  const saveButton = screen.getByText("Save");
  fireEvent.change(createName, {target:{value:"Meatballs"}});
  fireEvent.change(createCost, {target:{value:200}});
  fireEvent.click(saveButton);
  const expenseList = screen.queryAllByTestId("expenses"); // for length -> to be used in deletion 
  
  // getting the newly updated values 
  const updatedRemaining = screen.getByText(/Remaining: \$/).textContent;
  const updatedSpent = screen.getByText(/Spent so far: \$/).textContent;

  const updatedRemainingValue = Number(updatedRemaining?.replace("Remaining: $", "") || 0);
  const updatedSpentValue = Number(updatedSpent?.replace("Spent so far: $", "") || 0);
 
 // Checker: verify that 'Remaining' and 'Spent' have updated correctly
 expect(updatedRemainingValue).toBe(initialRemainingValue - 200);
 expect(updatedSpentValue).toBe(initialSpentValue + 200);

  // Equation Check: is Remaining Value + Spent Value == Budget 
  expect(initialBudgetValue).toEqual(updatedRemainingValue + updatedSpentValue);


  // _____________ Check if equation remains true after DELETION  _____________  // 
  
  // deletion process
  const deleteXButton = screen.getAllByText("x")[0];
  fireEvent.click(deleteXButton);
  const updatedExpenseList = screen.queryAllByTestId("expenses");
  expect(updatedExpenseList.length).toBe(expenseList.length-1);
  
  // get updated values after deletion 
  const remainingAfterDeletion = screen.getByText(/Remaining: \$/).textContent;
  const spentAfterDeletion = screen.getByText(/Spent so far: \$/).textContent;

  const remainingAfterDeletionValue = Number(remainingAfterDeletion?.replace("Remaining: $", "") || 0);
  const spentAfterDeletionValue = Number(spentAfterDeletion?.replace("Spent so far: $", "") || 0);

  // Equation Check: is Remaining Value + Spent Value == Budget 
  expect(initialBudgetValue).toEqual(remainingAfterDeletionValue + spentAfterDeletionValue);
  });
});
  

import React from 'react';
import { render, screen, fireEvent, waitFor, act} from '@testing-library/react';
import App from '../App';
import { AppProvider } from '../context/AppContext';

describe('Budget Tracking Application',()=>{
  test('creates a new expense', async () =>{
    render(<AppProvider><App/></AppProvider>);
    //checking to see if the screen properly displays the Remaining: $1000 initally
    const ogRemaining = screen.getByText("Remaining: $1000");
    expect(ogRemaining).toBeInTheDocument();
    //checking to see if the budget is correctly initalized
    const ogBudget = screen.getByText("Budget: $1000");
    expect(ogBudget).toBeInTheDocument();
    //checking to see if the number of spent is initalized to $0
    const ogTotalSpent = screen.getByText("Spent so far: $0");
    expect(ogTotalSpent).toBeInTheDocument();
    //capturing proper input fields necessary to simulate the user inputting an expense
    const nameInput = screen.getByLabelText("Name");
    const costInput = screen.getByLabelText("Cost");
    const saveButton = screen.getByText("Save");
    //using fireEvent to simulate the user loggin an expense 
    //the fireEvent inputs 50 as the cost and "car" as the name 
    //then it clicks the save button to log in the inputs 
    fireEvent.change(costInput, {target: {value:50}});
    fireEvent.change(nameInput, {target: {value:"car"}})
    fireEvent.click(saveButton);
    //check to see if car is correcly logged
    //check to see $50 is properly logged
    const newExpenseTitle = screen.getByText("car");
    const newBudgetNum = screen.getByText("$50");
    expect(newExpenseTitle).toBeInTheDocument;
    expect(newBudgetNum).toBeInTheDocument;
    //check to see if the remaining value (1000-50-950) is properly logged
    const newBudget = screen.getByText("Remaining: $950");
    expect(newBudget).toBeInTheDocument();
    //check to see if it properly logs that the user spent $50
    const newTotalSpent = screen.getByText("Spent so far: $50");
    expect(newTotalSpent).toBeInTheDocument();
  });

  test('create a new expense multiple times', async ()=> {
    render(<AppProvider><App/></AppProvider>);
    //same code as above 
    const ogRemaining = screen.getByText("Remaining: $1000");
    expect(ogRemaining).toBeInTheDocument();
    const ogBudget = screen.getByText("Budget: $1000");
    expect(ogBudget).toBeInTheDocument();
    const ogTotalSpent = screen.getByText("Spent so far: $0");
    expect(ogTotalSpent).toBeInTheDocument();
    const nameInput = screen.getByLabelText("Name");
    const costInput = screen.getByLabelText("Cost");
    const saveButton = screen.getByText("Save");
    fireEvent.change(costInput, {target: {value:50}});
    fireEvent.change(nameInput, {target: {value:"car"}})
    fireEvent.click(saveButton);
    const newExpenseTitle = screen.getByText("car");
    const newBudgetNum = screen.getByText("$50");
    expect(newExpenseTitle).toBeInTheDocument;
    expect(newBudgetNum).toBeInTheDocument;
    const newBudget = screen.getByText("Remaining: $950");
    expect(newBudget).toBeInTheDocument();
    const newTotalSpent = screen.getByText("Spent so far: $50");
    expect(newTotalSpent).toBeInTheDocument();
    //at this point it should be spent so far: $50, remaining: $950
    //lets now add another value to our expenses 
    fireEvent.change(costInput, {target: {value:100}});
    fireEvent.change(nameInput, {target: {value:"tires"}})
    fireEvent.click(saveButton);
    //now we should have 950-100 remaining 
    const newBudget2 = screen.getByText("Remaining: $850");
    expect(newBudget2).toBeInTheDocument();
    //now we should have spent so far 50+100=150
    const newTotalSpent2 = screen.getByText("Spent so far: 150");
    expect(newTotalSpent2).toBeInTheDocument();
  });

  


});
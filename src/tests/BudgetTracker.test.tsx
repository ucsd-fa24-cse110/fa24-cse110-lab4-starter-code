import React from 'react';
import { render, screen, fireEvent, waitFor, act} from '@testing-library/react';
import App from '../App';
import { AppProvider } from '../context/AppContext';

describe('Budget Tracking Application',()=>{
  test('creates a new expense', async () =>{
    render(<AppProvider><App/></AppProvider>);
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

  });




});
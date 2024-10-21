import React, { Component } from 'react';
import { render, screen, fireEvent, waitFor, act} from '@testing-library/react';
import App from '../App';
import { AppProvider } from '../context/AppContext';

describe('Budget Tracking Application',()=>{
  test('creates a new expense', async () =>{
    render(<AppProvider><App/></AppProvider>);
    const nameInput = screen.getByLabelText(/name/i);
    const costInput = screen.getByLabelText(/cost/i);
    const saveButton = screen.getByText(/save/i);

    fireEvent.change(nameInput, {target: {value: 'Test Expense'}});
    fireEvent.change(costInput, {target: {value:'50'}});
    fireEvent.click(saveButton);

    const newExpenseTitle = screen.getByText("Test Expense");
    const newBudgetNum = screen.getByText("$50");
    expect(newExpenseTitle).toBeInTheDocument;
    expect(newBudgetNum).toBeInTheDocument;

    //checking to see if the total and remaining budget are correctly updated
    //budget should now be $950
    await waitFor(()=> {
        const remainingBudget = screen.getByText("$950");
        expect(remainingBudget).toBeInTheDocument();
    });
  });




});
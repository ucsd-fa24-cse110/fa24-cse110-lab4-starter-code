import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '../context/AppContext';
import {MyBudgetTracker} from '../views/MyBudgetTracker';

// Helper function to add an expense via the form
const addExpense = (name: string, cost: number) => {
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: name } });
  fireEvent.change(screen.getByLabelText(/cost/i), { target: { value: cost } });
  fireEvent.click(screen.getByText(/save/i));
};

describe('Budget Tracker Application', () => {
  beforeEach(() => {
    render(
      <AppProvider>
        <MyBudgetTracker />
      </AppProvider>
    );
  });

  test('1. Create an Expense: adds a new expense and updates totals', () => {
    // Add a new expense
    addExpense('Groceries', 50);

    // Verify that the new expense is added to the list
    expect(screen.getByText('Groceries')).toBeInTheDocument();

    // Check if the remaining balance is updated
    expect(screen.getByText('Remaining: $950')).toBeInTheDocument();
  });

  test('2. Delete an Expense: removes an expense and updates totals', () => {
    // Add a new expense and delete it
    addExpense('Groceries', 50);
    fireEvent.click(screen.getByText('x')); // Simulate clicking the delete button

    // Verify the expense is removed
    expect(screen.queryByText('Groceries')).not.toBeInTheDocument();

    // Check if the remaining balance is restored
    expect(screen.getByText('Remaining: $1000')).toBeInTheDocument();
  });

  test('3. Budget Balance Verification: ensures budget equation holds true', () => {
    // Add multiple expenses
    addExpense('Groceries', 50);
    addExpense('Transport', 30);

    const remaining = 1000 - 50 - 30; // Calculate expected remaining balance
    const spent = 50 + 30; // Calculate total spent

    // Verify that the budget equation holds
    expect(screen.getByText(`Remaining: $${remaining}`)).toBeInTheDocument();
    expect(screen.getByText(`Spent so far: $${spent}`)).toBeInTheDocument();
  });

});

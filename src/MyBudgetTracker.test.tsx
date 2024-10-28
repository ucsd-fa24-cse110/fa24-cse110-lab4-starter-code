import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from './context/AppContext';
import MyBudgetTracker from './views/MyBudgetTracker';

describe('Budget Tracker Functionality', () => {

  // 1. Create an Expense:
  test('creates a new expense and updates totals', () => {
    render(
      <AppProvider>
        <MyBudgetTracker />
      </AppProvider>
    );

    // Simulate adding a new expense
    fireEvent.change(screen.getByLabelText(/name/i), {target: {value: 'Skincare' } });
    fireEvent.change(screen.getByLabelText(/cost/i), {target: {value: '1200' } });
    fireEvent.click(screen.getByText(/save/i));

    // Verify the new expense appears on the page
    expect(screen.getByText(/Skincare/)).toBeInTheDocument();
    expect(screen.getByText('$1200')).toBeInTheDocument(); // Specific expense entry

    // Ensure the total Spent so far and Remaining update accordingly.
    expect(screen.getByText('Spent so far: $1200')).toBeInTheDocument();
    expect(screen.getByText('Remaining: $-200')).toBeInTheDocument();
  });

  // negative expense 
  test('creates a new expense that leaves you in the negatives', () => {
    render(
      <AppProvider>
        <MyBudgetTracker />
      </AppProvider>
    );

    // Simulate adding a new expense
    fireEvent.change(screen.getByLabelText(/name/i), {target: {value: 'Skincare' } });
    fireEvent.change(screen.getByLabelText(/cost/i), {target: {value: '120' } });
    fireEvent.click(screen.getByText(/save/i));

    // Verify the new expense appears on the page
    expect(screen.getByText(/Skincare/)).toBeInTheDocument();
    expect(screen.getByText('$120')).toBeInTheDocument(); // Specific expense entry

    // Ensure the total Spent so far and Remaining update accordingly.
    expect(screen.getByText('Spent so far: $120')).toBeInTheDocument();
    expect(screen.getByText('Remaining: $880')).toBeInTheDocument();
  });

  // 2. Delete an Expense:
  test('deletes an expense and updates totals', () => {
    render(
      <AppProvider>
        <MyBudgetTracker />
      </AppProvider>
    );

    // Add and then delete an expense
    fireEvent.change(screen.getByLabelText(/name/i), {target: {value:'Makeup' } });
    fireEvent.change(screen.getByLabelText(/cost/i), { arget: {value:'75' } });
    fireEvent.click(screen.getByText(/save/i));
    fireEvent.click(screen.getByText('x')); 
    
    // Ensure the expense is removed from the list
    expect(screen.queryByText(/Makeup/)).toBeNull();

    // Totals should reset ]
    expect(screen.getByText('Spent so far: $0')).toBeInTheDocument();
    expect(screen.getByText('Remaining: $1000')).toBeInTheDocument();
  });

  // 3. Budget Balance Verification:
  test('validates the budget balance equation', () => {
    render(
      <AppProvider>
        <MyBudgetTracker />
      </AppProvider>
    );

    // Add multiple expenses 
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Clothes' } });
    fireEvent.change(screen.getByLabelText(/cost/i), {target: { value: '200' } });
    fireEvent.click(screen.getByText(/save/i));

    fireEvent.change(screen.getByLabelText(/name/i), {target: { value:'Accessories' } });
    fireEvent.change(screen.getByLabelText(/cost/i), { arget: { value:'150' } });
    fireEvent.click(screen.getByText(/save/i));

    // Check that the budget balance equation works 
    const remaining = parseInt(screen.getByText(/Remaining:/i).textContent!.replace(/[^\d]/g, ''));
    const spent = parseInt(screen.getByText(/Spent so far:/i).textContent!.replace(/[^\d]/g, ''));
    expect(remaining + spent).toBe(1000);
  });

});

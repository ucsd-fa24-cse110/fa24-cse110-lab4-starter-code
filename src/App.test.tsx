import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('creates expenses', () => {
  render(<App />);

  const expenseName = screen.getByLabelText(/name/i);
  const expenseCost = screen.getByLabelText(/cost/i);
  const submitButton = screen.getByText(/save/i);

  fireEvent.change(expenseName, {target: {value: "Test Expense 1"}});
  fireEvent.change(expenseCost, {target: {value: "100"}});
  fireEvent.click(submitButton);

  expect(screen.getByText("Test Expense 1")).toBeInTheDocument();

  const spentSoFar = screen.getByText(/Spent so far/i, {selector: "span"});
  expect(spentSoFar).toHaveTextContent('100');
  const remaining = screen.getByText(/Remaining/i);
  expect(remaining).toHaveTextContent('900');

  /* Testing Edge Case now */
  fireEvent.change(expenseName, {target: {value: "Test Expense 2"}});
  fireEvent.change(expenseCost, {target: {value: "900"}});
  fireEvent.click(submitButton);

  expect(screen.getByText("Test Expense 2")).toBeInTheDocument();

  expect(spentSoFar).toHaveTextContent('1000');
  expect(remaining).toHaveTextContent('0');
});

test('deletes expenses', () => {
    render(<App />);
  
    /* Creating expense to test delete on */
    const expenseName = screen.getByLabelText(/name/i);
    const expenseCost = screen.getByLabelText(/cost/i);
    const submitButton = screen.getByText(/save/i);
  
    fireEvent.change(expenseName, {target: {value: "Test Expense 1"}});
    fireEvent.change(expenseCost, {target: {value: "100"}});
    fireEvent.click(submitButton);
    fireEvent.change(expenseName, {target: {value: "Test Expense 2"}});
    fireEvent.change(expenseCost, {target: {value: "200"}});
    fireEvent.click(submitButton);
    fireEvent.change(expenseName, {target: {value: "Test Expense 3"}});
    fireEvent.change(expenseCost, {target: {value: "300"}});
    fireEvent.click(submitButton);
    const expense1 = screen.getByText("Test Expense 1")
    const expense2 = screen.getByText("Test Expense 2")
    const expense3 = screen.getByText("Test Expense 3")
    expect(expense1).toBeInTheDocument();
    expect(expense2).toBeInTheDocument();
    expect(expense3).toBeInTheDocument();
  
    const spentSoFar = screen.getByText(/Spent so far/i, {selector: "span"});
    const remaining = screen.getByText(/Remaining/i);
  
    expect(spentSoFar).toHaveTextContent('600');
    expect(remaining).toHaveTextContent('400');

    /* Testing Deletion */

    const deleteButton1 = screen.getByLabelText("Test Expense 1");
    const deleteButton2 = screen.getByLabelText("Test Expense 2");
    const deleteButton3 = screen.getByLabelText("Test Expense 3");

    fireEvent.click(deleteButton1);
    expect(expense1).not.toBeInTheDocument();
    expect(spentSoFar).toHaveTextContent('500');
    expect(remaining).toHaveTextContent('500');
    fireEvent.click(deleteButton2);
    expect(expense2).not.toBeInTheDocument();
    expect(spentSoFar).toHaveTextContent('300');
    expect(remaining).toHaveTextContent('700');
    fireEvent.click(deleteButton3);
    expect(expense3).not.toBeInTheDocument();
    expect(spentSoFar).toHaveTextContent('0');
    expect(remaining).toHaveTextContent('1000');
  });

  test('budget balance verification', () => {
    render(<App />);
  
    
    const expenseName = screen.getByLabelText(/name/i);
    const expenseCost = screen.getByLabelText(/cost/i);
    const submitButton = screen.getByText(/save/i);
    const defaultBudget = 1000;
    let spentSoFar = parseFloat(screen.getByText(/Spent so far/i).textContent?.replace(/[^0-9.-]/g, '') || '0');
    let remaining = parseFloat(screen.getByText(/Remaining/i).textContent?.replace(/[^0-9.-]/g, '') || '0');
    /* Testing Budget Balance initially */
    expect(spentSoFar + remaining).toBe(defaultBudget);

    /* Testing Budget Balance after creations */
    fireEvent.change(expenseName, {target: {value: "Test Expense 1"}});
    fireEvent.change(expenseCost, {target: {value: "412"}});
    fireEvent.click(submitButton);    

    spentSoFar = parseFloat(screen.getByText(/Spent so far/i).textContent?.replace(/[^0-9.-]/g, '') || '0');
    remaining = parseFloat(screen.getByText(/Remaining/i).textContent?.replace(/[^0-9.-]/g, '') || '0');
    expect(spentSoFar + remaining).toBe(defaultBudget);

    fireEvent.change(expenseName, {target: {value: "Test Expense 2"}});
    fireEvent.change(expenseCost, {target: {value: "46"}});
    fireEvent.click(submitButton);
    spentSoFar = parseFloat(screen.getByText(/Spent so far/i).textContent?.replace(/[^0-9.-]/g, '') || '0');
    remaining = parseFloat(screen.getByText(/Remaining/i).textContent?.replace(/[^0-9.-]/g, '') || '0');
    expect(spentSoFar + remaining).toBe(defaultBudget);
    
  

    /* Testing budget Balance after deletions */

    const deleteButton1 = screen.getByLabelText("Test Expense 1");
    const deleteButton2 = screen.getByLabelText("Test Expense 2");

    fireEvent.click(deleteButton1);
    spentSoFar = parseFloat(screen.getByText(/Spent so far/i).textContent?.replace(/[^0-9.-]/g, '') || '0');
    remaining = parseFloat(screen.getByText(/Remaining/i).textContent?.replace(/[^0-9.-]/g, '') || '0');
    expect(spentSoFar + remaining).toBe(defaultBudget);

    fireEvent.click(deleteButton2);
    spentSoFar = parseFloat(screen.getByText(/Spent so far/i).textContent?.replace(/[^0-9.-]/g, '') || '0');
    remaining = parseFloat(screen.getByText(/Remaining/i).textContent?.replace(/[^0-9.-]/g, '') || '0');
    expect(spentSoFar + remaining).toBe(defaultBudget);
  });

  test('Alert for negative remaining budget, edge case', () => {
    window.alert = jest.fn();
    render(<App />);
  
    
    const expenseName = screen.getByLabelText(/name/i);
    const expenseCost = screen.getByLabelText(/cost/i);
    const submitButton = screen.getByText(/save/i);
    const defaultBudget = 1000;

    /* Going to the exact value of our budget, 1000, no window alert should trigger */
    fireEvent.change(expenseName, {target: {value: "Test Expense 1"}});
    fireEvent.change(expenseCost, {target: {value: "1000"}});
    fireEvent.click(submitButton);    
    expect(window.alert).not.toHaveBeenCalledWith("You have exceeded your budget!");

    /* Adding 1 more expense worth 1, going exactly 1 over budget, window alert should trigger */
    fireEvent.change(expenseName, {target: {value: "Test Expense 2"}});
    fireEvent.change(expenseCost, {target: {value: "1"}});
    fireEvent.click(submitButton);    
    expect(window.alert).toHaveBeenCalledWith("You have exceeded your budget!");
  });
  test('budget balance verification with negative remaining budget', () => {
    window.alert = jest.fn();
    render(<App />);
  
    
    const expenseName = screen.getByLabelText(/name/i);
    const expenseCost = screen.getByLabelText(/cost/i);
    const submitButton = screen.getByText(/save/i);
    const defaultBudget = 1000;
    let spentSoFar = parseFloat(screen.getByText(/Spent so far/i).textContent?.replace(/[^0-9.-]/g, '') || '0');
    let remaining = parseFloat(screen.getByText(/Remaining/i).textContent?.replace(/[^0-9.-]/g, '') || '0');

    /* Testing Budget Balance after creation of the expense that's too large */
    fireEvent.change(expenseName, {target: {value: "Test Expense 1"}});
    fireEvent.change(expenseCost, {target: {value: "1001"}});
    fireEvent.click(submitButton);    
    expect(window.alert).toHaveBeenCalledWith("You have exceeded your budget!");
    spentSoFar = parseFloat(screen.getByText(/Spent so far/i).textContent?.replace(/[^0-9.-]/g, '') || '0');
    remaining = parseFloat(screen.getByText(/Remaining/i).textContent?.replace(/[^0-9.-]/g, '') || '0');
    expect(spentSoFar + remaining).toBe(defaultBudget);
    
  

    /* Testing budget Balance after deleting this too large budget */
    const deleteButton1 = screen.getByLabelText("Test Expense 1");
    fireEvent.click(deleteButton1);
    spentSoFar = parseFloat(screen.getByText(/Spent so far/i).textContent?.replace(/[^0-9.-]/g, '') || '0');
    remaining = parseFloat(screen.getByText(/Remaining/i).textContent?.replace(/[^0-9.-]/g, '') || '0');
    expect(spentSoFar + remaining).toBe(defaultBudget);
  });
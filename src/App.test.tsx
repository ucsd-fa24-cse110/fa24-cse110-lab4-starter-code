import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { AppProvider } from './context/AppContext';

test('renders the My Budget Planner heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/My Budget Planner/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders the Remaining balance section', () => {
  render(<App />);
  
  // remaining rendered
  expect(screen.getByText(/Remaining:/i)).toBeInTheDocument();
});

test('renders the Add Expense form', () => {
  render(<App />);

  // add expense redered
  expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();  
  expect(screen.getByLabelText(/Cost/i)).toBeInTheDocument(); 
  expect(screen.getByText(/Save/i)).toBeInTheDocument();      
});

test('initial budget is correctly displayed', () => {
  render(<App />);
  
  // checks budget
  expect(screen.getByText(/Remaining: \$1000/i)).toBeInTheDocument();
});

test('creates a new expense and updates the expense list and remaining budget', () => {
  render(<App />);

  // checks balance = 1000
  expect(screen.getByText(/Remaining: \$1000/i)).toBeInTheDocument();
  expect(screen.getByText(/Spent so far: \$0/i)).toBeInTheDocument();

  
  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Groceries' } });
  fireEvent.change(screen.getByLabelText(/Cost/i), { target: { value: '200' } });

  // adds expense
  fireEvent.click(screen.getByText(/Save/i));

  // checks for new expense and new balance
  expect(screen.getByText(/Remaining: \$800/i)).toBeInTheDocument();
  expect(screen.getByText(/Spent so far: \$200/i)).toBeInTheDocument();

  // checks for expense in list
  const expenseItems = screen.getAllByText(/\$200/i);
  expect(expenseItems.length).toBeGreaterThan(0);
});

// deleting an expense
test('deletes an expense and updates the expense list and remaining budget', () => {
  render(<AppProvider><App /></AppProvider>);

  // adds expense
  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Rent' } });
  fireEvent.change(screen.getByLabelText(/Cost/i), { target: { value: '500' } });
  fireEvent.click(screen.getByText(/Save/i));

  // checks expense
  expect(screen.getByText(/Remaining: \$500/i)).toBeInTheDocument();
  expect(screen.getByText(/Spent so far: \$500/i)).toBeInTheDocument();
  
  const deleteButtons = screen.getAllByText(/x/i);
  fireEvent.click(deleteButtons[0]);

  
  
});

// checks for balance
test('validates that Budget = Remaining Balance + Total Expenditure', () => {
  render(<AppProvider><App /></AppProvider>);

  // checks intial budget
  const initialBudget = 1000;

  // adds expense
  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Shopping' } });
  fireEvent.change(screen.getByLabelText(/Cost/i), { target: { value: '300' } });
  fireEvent.click(screen.getByText(/Save/i));

  // checks remaining and balance
  const remainingElement = screen.getByText(/Remaining: \$700/i);
  const spentElement = screen.getByText(/Spent so far: \$300/i);

  const remaining = parseInt(remainingElement.textContent!.replace(/[^0-9]/g, ''), 10);
  const spent = parseInt(spentElement.textContent!.replace(/[^0-9]/g, ''), 10);

  // checks budget
  expect(initialBudget).toEqual(remaining + spent);
});
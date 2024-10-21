import React, { Component } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { AppProvider } from './context/AppContext';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe('Budget Tracking Application',()=>{
  test('creates a new expense', () =>{
    render(<AppProvider><App/></AppProvider>)
    const nameInput = screen.getByLabelText(/name/i);
    const costInput = screen.getByLabelText(/cost/i);
    const saveButton = screen.getByText(/save/i);
    fireEvent.change(nameInput, {target: {value: 'Test Expense'}});
    fireEvent.change(costInput, {target: {value:'50'}});
    fireEvent.click(saveButton);
    expect(screen.getByText(/Test Expense/i)).toBeInTheDocument();
    expect(screen.getByText(/\$50/)).toBeInTheDocument();
  });
});

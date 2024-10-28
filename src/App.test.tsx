import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders My Budget Planner title', () => {
  render(<App />);
  const titleElement = screen.getByText(/My Budget Planner/i);
  const expenseID = screen.getByText(/App Provider/);
  expect(expenseID).toBeInTheDocument();
});

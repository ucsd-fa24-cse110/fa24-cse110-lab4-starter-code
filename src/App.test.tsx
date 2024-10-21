import React from 'react';
import { render, screen, fireEvent  } from '@testing-library/react';
import App from './App';
import { AppProvider } from './context/AppContext';
import AddExpenseForm from './components/Expense/AddExpenseForm';
import ExpenseItem from './components/Expense/ExpenseItem';
import Remaining from './components/Remaining';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// test for new edxpsne
test('adds mew expense', () => {
  render(
    <AppProvider>
      <AddExpenseForm />
    </AppProvider>
  );

  // find intput fields
  const nameInput = screen.getByLabelText(/name/i);
  const costInput = screen.getByLabelText(/cost/i);
  const saveButton = screen.getByText(/save/i);

  //typing
  fireEvent.change(nameInput, { target: { value: 'Coffee' } });
  fireEvent.change(costInput, { target: { value: '5' } });

  //clikcing
  fireEvent.click(saveButton);

  // assert new expense
  expect(screen.getByText(/Coffee/)).toBeInTheDocument();
  expect(screen.getByText(/\$5/)).toBeInTheDocument();
});

// detelting expsnese
test('deletes expense', () => {
  const expense = { id: '1', name: 'Coffee', cost: 5 };

  render(
    <AppProvider>
      <ExpenseItem id={expense.id} name={expense.name} cost={expense.cost} />
    </AppProvider>
  );

  // assert expense is in doc
  expect(screen.getByText(/coffee/i)).toBeInTheDocument();

  // find delte button
  const deleteButton = screen.getByText(/x/i);
  fireEvent.click(deleteButton);

  // assert expense isnt in documen
  expect(screen.queryByText(/coffee/i)).not.toBeInTheDocument();
});

// test for budget
test('verifies the remaining budget', () => {
  const expenses = [
    { id: '1', name: 'Coffee', cost: 5 },
    { id: '2', name: 'Lunch', cost: 10 },
  ];

  render(
    <AppProvider value={{ expenses, budget: 100 }}>
      <Remaining />
    </AppProvider>
  );

  // asser that budget is correctly calc.
  expect(screen.getByText(/Remaining: \$85/)).toBeInTheDocument();
});

import { render, screen, fireEvent } from '@testing-library/react';
import { AppContext } from '../../context/AppContext';
import ExpenseItem from './ExpenseItem';

test('renders an expense item and deletes it', () => {
  const mockSetExpenses = jest.fn();

  render(
    <AppContext.Provider value={{ expenses: [{ id: '1', name: 'Groceries', cost: 100 }], setExpenses: mockSetExpenses, budget: 2000, setBudget: jest.fn() }}>
      <ExpenseItem id="1" name="Groceries" cost={100} />
    </AppContext.Provider>
  );

  expect(screen.getByText('Groceries')).toBeInTheDocument();
  expect(screen.getByText('$100')).toBeInTheDocument();
  fireEvent.click(screen.getByText('x'));

  expect(mockSetExpenses).toHaveBeenCalledWith([]);
});

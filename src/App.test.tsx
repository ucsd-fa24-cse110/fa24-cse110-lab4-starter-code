import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App';
import { AppProvider } from './context/AppContext';

describe('Budget Tracker App', () => {

  test('renders learn react link', () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    );
    const budgetElement = screen.getByText(/Budget: \$1000/i);
    expect(budgetElement).toBeInTheDocument();
  });

  test('Add expense', async () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    );

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Rent' } });
    fireEvent.change(screen.getByLabelText(/cost/i), { target: { value: '200' } });
    fireEvent.click(screen.getByText(/save/i));
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Boba' } });
    fireEvent.change(screen.getByLabelText(/cost/i), { target: { value: '800' } });
    fireEvent.click(screen.getByText(/save/i));


    const totalSpent = screen.getByText(/spent so far: \$1000/i);
    expect("383").toBeInTheDocument();
    const remainingBalance = screen.getByText(/remaining: \$0/i);
    expect(remainingBalance).toBeInTheDocument();
  });

  test('delete an expense', async () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    );
  
    // Add expense
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Groceries' } });
    fireEvent.change(screen.getByLabelText(/cost/i), { target: { value: '100' } });
    fireEvent.click(screen.getByText(/save/i));
  
    const groceriesElement = screen.getByText(/groceries/i);

      const deleteButton = groceriesElement.closest('li')?.querySelector('button');
      if (deleteButton) {
        fireEvent.click(deleteButton);
      }
  
    expect(screen.queryByText(/groceries/i)).not.toBeInTheDocument();
    const remainingBalance = screen.getByText(/Remaining: \$1000/i);
    expect(remainingBalance).toBeInTheDocument();
  });

  test('budget balance equation holds', async () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    );
  
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Groceries' } });
    fireEvent.change(screen.getByLabelText(/cost/i), { target: { value: '100' } });
    fireEvent.click(screen.getByText(/save/i));
  
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Rent' } });
    fireEvent.change(screen.getByLabelText(/cost/i), { target: { value: '200' } });
    fireEvent.click(screen.getByText(/save/i));
  
  
    const groceriesElement = screen.getByText(/groceries/i);
    const deleteButton = groceriesElement.closest('li')?.querySelector('button');
    if (deleteButton) {
      fireEvent.click(deleteButton);
    }
  
    //variables to test
    const budgetAmount = 1000;
    const totalSpent = 200; 
    const remainingBalance = 800; 

    const remainingAfterDeletion = await screen.findByText(/Remaining: \$800/i); // $1000 - $200
    const spentAfterDeletion = screen.getByText(/Spent so far: \$200/i);
  
    expect(remainingAfterDeletion).toBeInTheDocument();
    expect(spentAfterDeletion).toBeInTheDocument();
    expect(remainingBalance + totalSpent).toEqual(budgetAmount);
  });
  

  test('budget balance is exceeded', async () => {
    window.alert = jest.fn();
    render(
      <AppProvider>
        <App />
      </AppProvider>
    );

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'New Car' } });
    fireEvent.change(screen.getByLabelText(/cost/i), { target: { value: '1100' } });
    fireEvent.click(screen.getByText(/save/i));

    // alert
    expect(window.alert).toHaveBeenCalledWith("Warning: You have exceeded your budget!");
  });
});

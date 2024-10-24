import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('MyBudgetTracker', () => {
  test('creates multiple expenses and checks each are present', () => {
    render(<App/>);
    
    const budget = screen.getByText('Budget: 1000');
    expect(budget).toBeInTheDocument();

    const remaining = screen.getByText('Remaining: $1000');
    expect(remaining).toBeInTheDocument();

    const spent = screen.getByText('Spent so far: $0');
    expect(spent).toBeInTheDocument();

    const createExpenseNameInput = screen.getByTestId("nameInput");
    const createExpenseCostInput = screen.getByTestId("costInput");
    const createExpenseButton = screen.getByText("Save");

    fireEvent.change(createExpenseNameInput, {target: {value: "testName1"}});
    fireEvent.change(createExpenseCostInput, {target: {value: 19}});
    fireEvent.click(createExpenseButton);
    fireEvent.change(createExpenseNameInput, {target: {value: "testName2"}});
    fireEvent.change(createExpenseCostInput, {target: {value: 20}});
    fireEvent.click(createExpenseButton);
    fireEvent.change(createExpenseNameInput, {target: {value: "testName3"}});
    fireEvent.change(createExpenseCostInput,{target: {value: 1}});
    fireEvent.click(createExpenseButton);


    const newExpenseName1 = screen.getByTestId("testName0");
    const newExpenseCost1 = screen.getByTestId("testCost0");
    const newExpenseName2 = screen.getByTestId("testName1");
    const newExpenseCost2 = screen.getByTestId("testCost1");
    const newExpenseName3 = screen.getByTestId("testName2");
    const newExpenseCost3 = screen.getByTestId("testCost2");

    const remaining1 = screen.getByTestId('remain');
    const spent1 = screen.getByTestId('spent');

    expect(newExpenseName1).toBeInTheDocument();
    expect(newExpenseCost1).toBeInTheDocument();
    expect(newExpenseName2).toBeInTheDocument();
    expect(newExpenseCost2).toBeInTheDocument();
    expect(newExpenseName3).toBeInTheDocument();
    expect(newExpenseCost3).toBeInTheDocument();

    expect(remaining1.innerHTML).toContain('Remaining: $960');
    expect(spent1.innerHTML).toContain('Spent so far: $40');
  });

  test('delete an expense', () => {
    render(<App/>);
    
    const budget = screen.getByText('Budget: 1000');
    expect(budget).toBeInTheDocument();

    const remaining = screen.getByText('Remaining: $1000');
    expect(remaining).toBeInTheDocument();

    const spent = screen.getByText('Spent so far: $0');
    expect(spent).toBeInTheDocument();

    const createExpenseNameInput = screen.getByTestId("nameInput");
    const createExpenseCostInput = screen.getByTestId("costInput");
    const createExpenseButton = screen.getByText("Save");

    fireEvent.change(createExpenseNameInput, {target: {value: "testName1"}});
    fireEvent.change(createExpenseCostInput, {target: {value: 20}});
    fireEvent.click(createExpenseButton);

    const newExpenseName1 = screen.getByTestId("testName0");
    const newExpenseCost1 = screen.getByTestId("testCost0");
    expect(newExpenseName1).toBeInTheDocument();
    expect(newExpenseCost1).toBeInTheDocument();

    const remaining1 = screen.getByTestId('remain');
    const spent1 = screen.getByTestId('spent');

    expect(remaining1.innerHTML).toContain('Remaining: $980');
    expect(spent1.innerHTML).toContain('Spent so far: $20');

    const deleteButton = screen.getByTestId("0");
    fireEvent.click(deleteButton);

    expect(newExpenseName1).not.toBeInTheDocument();
    expect(newExpenseCost1).not.toBeInTheDocument();

    expect(remaining1.innerHTML).toContain('Remaining: $1000');
    expect(spent1.innerHTML).toContain('Spent so far: $0');
  });

  test('budget balance verification', () => {
    render(<App/>);
    
    const budget = screen.getByText('Budget: 1000');
    expect(budget).toBeInTheDocument();

    const remaining = screen.getByText('Remaining: $1000');
    expect(remaining).toBeInTheDocument();

    const spent = screen.getByText('Spent so far: $0');
    expect(spent).toBeInTheDocument();

    const createExpenseNameInput = screen.getByTestId("nameInput");
    const createExpenseCostInput = screen.getByTestId("costInput");
    const createExpenseButton = screen.getByText("Save");

    fireEvent.change(createExpenseNameInput, {target: {value: "testName1"}});
    fireEvent.change(createExpenseCostInput, {target: {value: 20}});
    fireEvent.click(createExpenseButton);

    const deleteButton = screen.getByTestId("0");
    fireEvent.click(deleteButton);

    fireEvent.change(createExpenseNameInput, {target: {value: "testName2"}});
    fireEvent.change(createExpenseCostInput, {target: {value: 9}});
    fireEvent.click(createExpenseButton);

    fireEvent.change(createExpenseNameInput, {target: {value: "testName3"}});
    fireEvent.change(createExpenseCostInput, {target: {value: 10}});
    fireEvent.click(createExpenseButton);

    fireEvent.change(createExpenseNameInput, {target: {value: "testName4"}});
    fireEvent.change(createExpenseCostInput, {target: {value: 2}});
    fireEvent.click(createExpenseButton);

    const deleteButton2 = screen.getByTestId("2");
    fireEvent.click(deleteButton2);


    fireEvent.change(createExpenseNameInput, {target: {value: "testName5"}});
    fireEvent.change(createExpenseCostInput, {target: {value: 12}});
    fireEvent.click(createExpenseButton);

    const remaining1 = screen.getByTestId('remain');
    const spent1 = screen.getByTestId('spent');

    expect(remaining1.innerHTML).toContain('Remaining: $969');
    expect(spent1.innerHTML).toContain('Spent so far: $31');
  });
});
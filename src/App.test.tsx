import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText("My Budget Planner");
  expect(linkElement).toBeInTheDocument();
});


//OUR TESTS
describe("Expenses", () => {
  test("Create expense", () => {
    render(<App />);

    const createNoteNameInput = screen.getByLabelText("Name");
    const createNoteCostInput = screen.getByLabelText("Cost");
    const createNoteButton = screen.getByTestId("Save");

    fireEvent.change(createNoteNameInput, { target: {value: "New Expense" } });
    fireEvent.change(createNoteCostInput, { target: {value: 10 } });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Expense");
    const newNoteCost = screen.getByText("$10");

    const amountSpent = screen.getByText("Spent so far: $10");
    const remaining = screen.getByText("Remaining: $990");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteCost).toBeInTheDocument();

    expect(amountSpent).toBeInTheDocument();
    expect(remaining).toBeInTheDocument();
  });

  test("Delete expense", () => {
    render(<App />);

    const createNoteNameInput = screen.getByLabelText("Name");
    const createNoteCostInput = screen.getByLabelText("Cost");
    const createNoteButton = screen.getByTestId("Save");

    fireEvent.change(createNoteNameInput, { target: {value: "New Expense" } });
    fireEvent.change(createNoteCostInput, { target: {value: 10 } });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Expense");
    const newNoteCost = screen.getByText("$10");

    const deleteNoteButton = screen.getByTestId("x1");
    fireEvent.click(deleteNoteButton);

    const amountSpent = screen.getByText("Spent so far: $0");
    const remaining = screen.getByText("Remaining: $1000");

    expect(newNoteTitle).not.toBeInTheDocument();
    expect(newNoteCost).not.toBeInTheDocument();

    expect(amountSpent).toBeInTheDocument();
    expect(remaining).toBeInTheDocument();
  });
});

describe("Budget Balance", () => {
  test("Create single expense and check budget balance", () => {
    render(<App />);

    const createNoteNameInput = screen.getByLabelText("Name");
    const createNoteCostInput = screen.getByLabelText("Cost");
    const createNoteButton = screen.getByTestId("Save");

    fireEvent.change(createNoteNameInput, { target: {value: "New Expense" } });
    fireEvent.change(createNoteCostInput, { target: {value: 10 } });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Expense");
    const newNoteCost = screen.getByText("$10");

    const amountSpent = screen.getByText("Spent so far: $10");
    const remaining = screen.getByText("Remaining: $990");
    const budget  = screen.getByText("Budget: $1000");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteCost).toBeInTheDocument();

    expect(amountSpent).toBeInTheDocument();
    expect(remaining).toBeInTheDocument();
    expect(budget).toBeInTheDocument();
  });

  test("Create multiple expenses and check budget balance", () => {
    render(<App />);

    const createNoteNameInput = screen.getByLabelText("Name");
    const createNoteCostInput = screen.getByLabelText("Cost");
    const createNoteButton = screen.getByTestId("Save");

    // First expense
    fireEvent.change(createNoteNameInput, { target: {value: "Expense 1" } });
    fireEvent.change(createNoteCostInput, { target: {value: 10 } });
    fireEvent.click(createNoteButton);

    const noteTitle1 = screen.getByText("Expense 1");
    const noteCost1 = screen.getByText("$10");

    // Second expense
    fireEvent.change(createNoteNameInput, { target: {value: "Expense 2" } });
    fireEvent.change(createNoteCostInput, { target: {value: 50 } });
    fireEvent.click(createNoteButton);

    const noteTitle2 = screen.getByText("Expense 2");
    const noteCost2 = screen.getByText("$50");

    // Third expense
    fireEvent.change(createNoteNameInput, { target: {value: "Expense 3" } });
    fireEvent.change(createNoteCostInput, { target: {value: 100 } });
    fireEvent.click(createNoteButton);

    const noteTitle3 = screen.getByText("Expense 3");
    const noteCost3 = screen.getByText("$100");

    const amountSpent = screen.getByText("Spent so far: $160");
    const remaining = screen.getByText("Remaining: $840");
    const budget  = screen.getByText("Budget: $1000");

    expect(noteTitle1).toBeInTheDocument();
    expect(noteCost1).toBeInTheDocument();

    expect(noteTitle2).toBeInTheDocument();
    expect(noteCost2).toBeInTheDocument();

    expect(noteTitle3).toBeInTheDocument();
    expect(noteCost3).toBeInTheDocument();

    expect(amountSpent).toBeInTheDocument();
    expect(remaining).toBeInTheDocument();
    expect(budget).toBeInTheDocument();
  });

  test("Create and delete expenses and check budget balance", () => {
    render(<App />);

    const createNoteNameInput = screen.getByLabelText("Name");
    const createNoteCostInput = screen.getByLabelText("Cost");
    const createNoteButton = screen.getByTestId("Save");

    // First expense
    fireEvent.change(createNoteNameInput, { target: {value: "Expense 1" } });
    fireEvent.change(createNoteCostInput, { target: {value: 10 } });
    fireEvent.click(createNoteButton);

    const noteTitle1 = screen.getByText("Expense 1");
    const noteCost1 = screen.getByText("$10");

    // Second expense
    fireEvent.change(createNoteNameInput, { target: {value: "Expense 2" } });
    fireEvent.change(createNoteCostInput, { target: {value: 50 } });
    fireEvent.click(createNoteButton);

    const noteTitle2 = screen.getByText("Expense 2");
    const noteCost2 = screen.getByText("$50");

    // Third expense
    fireEvent.change(createNoteNameInput, { target: {value: "Expense 3" } });
    fireEvent.change(createNoteCostInput, { target: {value: 100 } });
    fireEvent.click(createNoteButton);

    const noteTitle3 = screen.getByText("Expense 3");
    const noteCost3 = screen.getByText("$100");

    const deleteNoteButton = screen.getByTestId("x3");
    fireEvent.click(deleteNoteButton);

    const amountSpent = screen.getByText("Spent so far: $60");
    const remaining = screen.getByText("Remaining: $940");
    const budget  = screen.getByText("Budget: $1000");

    expect(noteTitle1).toBeInTheDocument();
    expect(noteCost1).toBeInTheDocument();

    expect(noteTitle2).toBeInTheDocument();
    expect(noteCost2).toBeInTheDocument();

    expect(noteTitle3).not.toBeInTheDocument();
    expect(noteCost3).not.toBeInTheDocument();

    expect(amountSpent).toBeInTheDocument();
    expect(remaining).toBeInTheDocument();
    expect(budget).toBeInTheDocument();
  });


});

//EDGE CASES BELOW
describe("Edge Cases", () => {
  test("Check that alert is triggered when over 1000 ", () => {
    render(<App />);

    //Going to make two expenses, $1000 and $1, that way we can see that expenses that total up to higher than $1000, 

    //Set up
    const createNoteNameInput = screen.getByLabelText("Name");
    const createNoteCostInput = screen.getByLabelText("Cost");
    const createNoteButton = screen.getByTestId("Save");
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});


    //First expense, $1000
    fireEvent.change(createNoteNameInput, { target: {value: "Expense 1" } });
    fireEvent.change(createNoteCostInput, { target: {value: 1000 } });
    fireEvent.click(createNoteButton);

    //Verifies that the expenses show up correctly
    const noteTitleEX1 = screen.getByText("Expense 1");
    const noteCost1K = screen.getByText("$1000");
    expect(noteTitleEX1).toBeInTheDocument();
    expect(noteCost1K).toBeInTheDocument();

    // Second expense, $1
    fireEvent.change(createNoteNameInput, { target: {value: "Expense 2" } });
    fireEvent.change(createNoteCostInput, { target: {value: 1 } });
    fireEvent.click(createNoteButton);

    //Verifies that the 2nd expenses show up correctly
    const noteTitleEX2 = screen.getByText("Expense 2");
    const noteCost1dollar = screen.getByText("$1");
    expect(noteTitleEX2).toBeInTheDocument();
    expect(noteCost1dollar).toBeInTheDocument();

    // Checks that the alert shows up, because this is the alerts text, got this from stack overflow
    expect(alertSpy).toHaveBeenCalledWith("Warning: Budget is less than 0!");

    //Restores the alert
    //alertSpy.mockRestore(); NOT NEEDED
  });

});



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

    const deleteNoteButton = screen.getByTestId("x");
    fireEvent.click(deleteNoteButton);

    const amountSpent = screen.getByText("Spent so far: $0");
    const remaining = screen.getByText("Remaining: $1000");

    expect(newNoteTitle).not.toBeInTheDocument();
    expect(newNoteCost).not.toBeInTheDocument();

    expect(amountSpent).toBeInTheDocument();
    expect(remaining).toBeInTheDocument();
  });
});



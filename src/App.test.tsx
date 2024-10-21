import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText("My Budget Planner");
  expect(linkElement).toBeInTheDocument();
});


//OUR TESTS
describe("Create an expense", () => {
  test("renders create expense", () => {
    render(<App />);

    const createNoteNameInput = screen.getByLabelText("Name");
    const createNoteCostInput = screen.getByLabelText("Cost");
    const createNoteButton = screen.getByTestId("Save");

    fireEvent.change(createNoteNameInput, { target: {value: "New Expense" } });
    fireEvent.change(createNoteCostInput, { target: {value: 10 } });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Expense");
    const newNoteCost = screen.getByText("$10");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteCost).toBeInTheDocument();
  });
});



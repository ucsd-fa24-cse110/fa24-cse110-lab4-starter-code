import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


//OUR TESTS
describe("Create an expense", () => {
  test("renders create expense", () => {
    render(<App />);

    const createNoteNameInput = screen.getByLabelText("Name");
    const createNoteCostInput = screen.getByLabelText("Cost");
    const createNoteButton = screen.getByLabelText("Save");

    fireEvent.change(createNoteNameInput, { target: {value: "New Expense" } });
    fireEvent.change(createNoteCostInput, { target: {value: "New Cost" } });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Expense");
    const newNoteCost = screen.getByText("New Cost");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteCost).toBeInTheDocument();
  });
});



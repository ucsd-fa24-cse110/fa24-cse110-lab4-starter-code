import { render, screen, fireEvent } from "@testing-library/react";
import App from './App';

describe("Create Expense", () => {
    test("renders create expense form and adds a new expense", () => {
      render(<App />);
  
      const nameInput = screen.getByLabelText("Name");
      const costInput = screen.getByLabelText("Cost");
      const saveButton = screen.getByText("Save");
  
      fireEvent.change(nameInput, { target: { value: "My new expense" } });
      fireEvent.change(costInput, { target: { value: "12" } });
  
      fireEvent.click(saveButton);
  
      const newExpense = screen.getByText("My new expense");
      expect(newExpense).toBeInTheDocument();
    });
  });
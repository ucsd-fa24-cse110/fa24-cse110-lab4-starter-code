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


  describe("Delete Expense", () => {
      test("create expense form and delete it", () => { // ensure that total spent and remaining update
        render(<App />);

        const nameInput = screen.getByLabelText("Name");
        const costInput = screen.getByLabelText("Cost");
        const saveButton = screen.getByText("Save");
        const initialRemaining = screen.getByText(/Remaining:/i).textContent!;
        const initialTotalSpent = screen.getByText(/Spent so far:/i).textContent!;
          
        fireEvent.change(nameInput, { target: { value: "Deletable Expense" } });
        fireEvent.change(costInput, { target: { value: "6" } });
    
        fireEvent.click(saveButton);
    
        const newExpense = screen.getByText("Deletable Expense");
        expect(newExpense).toBeInTheDocument();

        const deleteButton = screen.getAllByText("x")[0];
        fireEvent.click(deleteButton);

        expect(screen.queryByText("Deletable Expense")).not.toBeInTheDocument();
        expect(screen.queryByText(initialTotalSpent)).toBeInTheDocument();
        expect(screen.queryByText(initialRemaining)).toBeInTheDocument();
  });
});
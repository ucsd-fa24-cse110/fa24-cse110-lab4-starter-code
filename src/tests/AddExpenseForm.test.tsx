import { render, fireEvent, screen } from "@testing-library/react";
import { AppProvider } from "../context/AppContext";
import AddExpenseForm from "../components/Expense/AddExpenseForm";
import Remaining from "../components/Remaining";

describe("AddExpenseForm", () => {
  test("should add a new expense and update remaining balance", () => {
    render(
      <AppProvider>
        <AddExpenseForm />
        <Remaining />
      </AppProvider>
    );

    // Simulate filling in the form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Groceries" },
    });
    fireEvent.change(screen.getByLabelText(/cost/i), {
      target: { value: "100" },
    });

    // Simulate submitting the form
    fireEvent.click(screen.getByText(/save/i));

    // Check if the new expense is displayed in the remaining component
    expect(screen.getByText(/remaining/i)).toHaveTextContent("Remaining: $900");
  });
});
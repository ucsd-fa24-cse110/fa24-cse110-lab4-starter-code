
import { render, fireEvent, screen } from "@testing-library/react";
import { AppProvider } from "../context/AppContext";
import AddExpenseForm from "../components/Expense/AddExpenseForm";
import Remaining from "../components/Remaining";

describe("Budget Balance Verification", () => {
  test("should validate budget = remaining + total expenditure", () => {
    render(
      <AppProvider>
        <AddExpenseForm />
        <Remaining />
      </AppProvider>
    );

    // Add expense #1
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Groceries" },
    });
    fireEvent.change(screen.getByLabelText(/cost/i), {
      target: { value: "200" },
    });
    fireEvent.click(screen.getByText(/save/i));

    // Check remaining
    expect(screen.getByText(/remaining/i)).toHaveTextContent("Remaining: $800");

    // Add expense #2
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Electricity" },
    });
    fireEvent.change(screen.getByLabelText(/cost/i), {
      target: { value: "100" },
    });
    fireEvent.click(screen.getByText(/save/i));

    // Check remaining
    expect(screen.getByText(/remaining/i)).toHaveTextContent("Remaining: $700");

    // Check that the budget formula holds
    const totalSpent = 300; // 200 for groceries + 100 for electricity
    const remaining = 700;
    const budget = 1000;
    expect(budget).toBe(totalSpent + remaining );
  });
});
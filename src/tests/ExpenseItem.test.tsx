
import { render, fireEvent, screen } from "@testing-library/react";
import { AppProvider } from "../context/AppContext";
import ExpenseItem from "../components/Expense/ExpenseItem";
import Remaining from "../components/Remaining";

describe("ExpenseItem", () => {
  test("should delete an expense and update remaining balance", () => {
    render(
      <AppProvider>
        <ExpenseItem id="1" name="Groceries" cost={100} />
        <Remaining />
      </AppProvider>
    );

    // Simulate clicking the delete button
    fireEvent.click(screen.getByText("x"));

    // Check if the remaining balance is updated
    expect(screen.getByText(/remaining/i)).toHaveTextContent("Remaining: $1000");
  });
});
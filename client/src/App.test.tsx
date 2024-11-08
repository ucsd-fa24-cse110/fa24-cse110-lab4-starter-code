import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App"; // Adjust the import path if necessary
import { AppProvider } from "./context/AppContext"; // Ensure you import the AppProvider for context testing

test("renders MyBudgetTracker component", () => {
  render(<App />);

  // Check if MyBudgetTracker is rendered (you can replace this with actual text or elements present in MyBudgetTracker)
  const budgetTrackerElement = screen.getByText(/Budget:/i); // Replace with actual text from MyBudgetTracker
  expect(budgetTrackerElement).toBeInTheDocument();
});

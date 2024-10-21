import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { AppProvider } from "./context/AppContext";
import ExpenseItem from "./components/Expense/ExpenseItem";
import Remaining from "./components/Remaining";
import App from "./App";

describe("ExpenseItem", () => {
    test("should display the expense item correctly", () => {
      render(
        <AppProvider>
          <ExpenseItem id="1" name="Groceries" cost={50} />
          <Remaining/>
        </AppProvider>
      );
      const testItemName = screen.getByText("Groceries");
      const testSpentCost = screen.getByText("$50");
      const testRemainingCost = screen.getByText("$4950");
      expect(testItemName).toBeInTheDocument();
      expect(testSpentCost).toBeInTheDocument();
      expect(testRemainingCost).toBeInTheDocument();
    });
  
    test("should delete the expense item when delete button is clicked", () => {
      render(
        <AppProvider>
          <ExpenseItem id="1" name="Groceries" cost={50} />
          <ExpenseItem id="2" name="Clothes" cost={100} />
          <Remaining />
        </AppProvider>
      );

      const deleteButton = screen.getAllByText("x");
      fireEvent.click(deleteButton[0]);
      fireEvent.click(deleteButton[1]);

      expect(screen.getByText("$4900")).toBeInTheDocument();
      expect(screen.getByText("Clothes")).toBeInTheDocument();
      expect(screen.getByText("$100")).toBeInTheDocument();
      expect(screen.queryByText("Groceries")).not.toBeInTheDocument();
    });
  });
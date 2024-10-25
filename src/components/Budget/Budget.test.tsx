import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AppContext } from "../../context/AppContext";
import Budget from "./Budget";
import { Expense } from "../../types/types";

// Mock context wrapper component
import { ReactNode } from "react";
import React from "react";

const MockProvider = ({ children, initialBudget = 1000 }: { children: ReactNode, initialBudget?: number }) => {
  const [budget, setBudget] = React.useState(initialBudget);
  const [expenses, setExpenses] = React.useState<Expense[]>([]);
  return (
    <AppContext.Provider value={{ budget, setBudget, expenses, setExpenses }}>
      {children}
    </AppContext.Provider>
  );
};

describe("View Budget", () => {
  test("renders initial budget value and edit button", () => {
    render(
      <MockProvider>
        <Budget />
      </MockProvider>
    );
    
    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });
});

describe("Edit Budget", () => {
  test("shows edit form when edit button is clicked", () => {
    render(
      <MockProvider>
        <Budget />
      </MockProvider>
    );
    
    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);
    
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  test("updates budget value when form is submitted", () => {
    render(
      <MockProvider>
        <Budget />
      </MockProvider>
    );
    
    // Enter edit mode
    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);
    
    // Change input value
    const budgetInput = screen.getByRole("spinbutton");
    fireEvent.change(budgetInput, { target: { value: "2000" } });
    
    // Submit form
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    
    expect(screen.getByText("Budget: $2000")).toBeInTheDocument();
  });
});

describe("Budget Edge Cases", () => {
  test("handles negative budget values", () => {
    render(
      <MockProvider>
        <Budget />
      </MockProvider>
    );
    
    // Enter edit mode
    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);
    
    // Set negative value
    const budgetInput = screen.getByRole("spinbutton");
    fireEvent.change(budgetInput, { target: { value: "-500" } });
    
    // Submit form
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    
    expect(screen.getByText("Budget: $-500")).toBeInTheDocument();
  });

  test("maintains input value between edit sessions", () => {
    render(
      <MockProvider initialBudget={1500}>
        <Budget />
      </MockProvider>
    );
    
    // First edit session
    fireEvent.click(screen.getByText("Edit"));
    const budgetInput = screen.getByRole("spinbutton");
    fireEvent.change(budgetInput, { target: { value: "2500" } });
    fireEvent.click(screen.getByText("Save"));
    
    // Second edit session
    fireEvent.click(screen.getByText("Edit"));
    expect(screen.getByRole("spinbutton")).toHaveValue(2500);
  });
});
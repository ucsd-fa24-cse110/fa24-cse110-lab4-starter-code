import { render, screen, fireEvent } from "@testing-library/react";
//import Budget from "./components/Budget/Budget";
import App from "./App"

describe("Budget Balance Verification", () => {
    test("checks initial budget is correct", () => {
      render(<App />);
   
      //const initialBudget = screen.getByLabelText("Budget: $")
      //use innerHTML or assign id to the div in Budget
      const initialBudget = screen.getByTestId('budget-value');
      const initialBudgetVal = initialBudget.textContent;
      //const initialBudget = screen.getByText(/Budget: \$/)
      
      //const initialBudgetValue = initialBudget.textContent.match(/The price is: \$(\d+)/)[1];
      expect(initialBudgetVal).toEqual("$5000");
    });
   });
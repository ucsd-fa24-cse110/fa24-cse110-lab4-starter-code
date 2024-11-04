import { createContext, useState } from "react";
import { Expense, Budget } from "../types/types";

interface AppContextType {
  expenses: Expense[];
  budget: Budget;
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  setBudget: React.Dispatch<React.SetStateAction<Budget>>;
}

const initialState: AppContextType = {
  expenses: [],
  budget: { amount: 1000 }, // Initialize budget as a Budget object
  setExpenses: () => {},
  setBudget: () => {},
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = (props: any) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialState.expenses);
  const [budget, setBudget] = useState<Budget>(initialState.budget);

  return (
    <AppContext.Provider
      value={{
        expenses: expenses,
        setExpenses: setExpenses,
        budget: budget,
        setBudget: setBudget,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
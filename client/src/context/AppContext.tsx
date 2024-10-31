import { createContext, useState } from "react";
import { Expense } from "../types/types";

// Exercise: Create add budget to the context

interface AppContextType {
  map(arg0: (expense: Expense) => import("react").JSX.Element): import("react").ReactNode;
  budget: number;
  setBudget:  React.Dispatch<React.SetStateAction<number>>;
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

const initialState: AppContextType = {
  budget: 2000,
  setBudget: () => {},
  expenses: [],
  setExpenses: () => {},
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = (props: any) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialState.expenses);
  const [budget, setBudget] = useState<number>(initialState.budget);

  return (
    <AppContext.Provider
      value={{
        budget: budget,
        setBudget: setBudget,
        expenses: expenses,
        setExpenses: setExpenses,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

import { createContext, useState } from "react";
import { Expense } from "../types/types";

interface AppContextType {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  budget: number;
  setBudget: React.Dispatch<React.SetStateAction<number>>;
}

const initialState: AppContextType = {
  expenses: [],
  setExpenses: () => {},
  budget: 1000, // Initial default budget
  setBudget: () => {},
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = (props: any) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialState.expenses);
  const [budget, setBudget] = useState<number>(initialState.budget); // Budget state

  return (
    <AppContext.Provider
      value={{
        expenses,
        setExpenses,
        budget, // Providing the budget
        setBudget, // Providing the ability to set the budget
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};


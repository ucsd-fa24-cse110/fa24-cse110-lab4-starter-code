import { createContext, useState } from "react";
import { Expense } from "../types/types";

// Exercise: Create add budget to the context

interface AppContextType {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  //follow same syntax as above
  budget: number,
  setBudget: React.Dispatch<React.SetStateAction<number>>;
}

const initialState: AppContextType = {
  expenses: [],
  setExpenses: () => {},
  //follow same syntax as above & have initial val for budget == 1000
  budget: 1000, //predefined budget value 
  setBudget: ()=> { },
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = (props: any) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialState.expenses);
  const [budget, setBudget] = useState<number>(initialState.budget);

  return (
    <AppContext.Provider
      value={{
        expenses: expenses,
        setExpenses: setExpenses,
        budget,
        setBudget,

      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

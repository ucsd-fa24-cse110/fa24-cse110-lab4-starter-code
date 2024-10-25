import { createContext, useState } from "react";
import { Expense } from "../types/types";

// Exercise: Create add budget to the context


//Define the shape of our context
interface AppContextType {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

const initialState: AppContextType = {
  expenses: [],
  setExpenses: () => {},
};

//Create the context
export const AppContext = createContext<AppContextType>(initialState);

//Create the provider component
export const AppProvider = (props: any) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialState.expenses);

  //method for setExpenses?

  return (
    <AppContext.Provider
      value={{
        expenses: expenses,
        setExpenses: setExpenses,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

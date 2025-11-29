import { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";

//type ProduceType = "Beans" | "Grain Maize" | "Cowpeas" | "Groundnuts (G-nuts)" | "Rice" | "Soybeans";

interface Stock {
  [key: string]: number; // e.g., { "Beans": 320, "Rice": 190 }
}

interface Transaction {
  id: number;
  type: "procurement" | "sale" | "credit-sale";
  produce: string;
  tonnage: number;
  amount?: number;
  date: string;
  buyerDealer?: string;
}

interface State {
  stock: Stock;
  transactions: Transaction[];
}

type Action =
  | { type: "ADD_PROCUREMENT"; payload: { produce: string; tonnage: number } }
  | { type: "ADD_SALE"; payload: { produce: string; tonnage: number } }
  | { type: "ADD_CREDIT_SALE"; payload: { produce: string; tonnage: number } }
  | { type: "SET_STOCK"; payload: Stock };

const initialStock: Stock = {
  Beans: 320,
  "Grain Maize": 280,
  Cowpeas: 140,
  "Groundnuts (G-nuts)": 150,
  Rice: 190,
  Soybeans: 210,
};

function stockReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_PROCUREMENT":
      return {
        ...state,
        stock: {
          ...state.stock,
          [action.payload.produce]: (state.stock[action.payload.produce] || 0) + action.payload.tonnage,
        },
        transactions: [
          {
            id: Date.now(),
            type: "procurement",
            produce: action.payload.produce,
            tonnage: action.payload.tonnage,
            date: new Date().toISOString().split("T")[0],
          },
          ...state.transactions,
        ],
      };

    case "ADD_SALE":
    case "ADD_CREDIT_SALE":
      const current = state.stock[action.payload.produce] || 0;
      if (current < action.payload.tonnage) {
        alert(`Not enough ${action.payload.produce} in stock!`);
        return state;
      }
      return {
        ...state,
        stock: {
          ...state.stock,
          [action.payload.produce]: current - action.payload.tonnage,
        },
        transactions: [
          {
            id: Date.now(),
            type: action.type === "ADD_SALE" ? "sale" : "credit-sale",
            produce: action.payload.produce,
            tonnage: action.payload.tonnage,
            date: new Date().toISOString().split("T")[0],
          },
          ...state.transactions.slice(0, 10),
        ],
      };

    case "SET_STOCK":
      return { ...state, stock: action.payload };

    default:
      return state;
  }
}

const StockContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: { stock: initialStock, transactions: [] },
  dispatch: () => null,
});

export function StockProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(stockReducer, {
    stock: initialStock,
    transactions: [],
  });

  return (
    <StockContext.Provider value={{ state, dispatch }}>
      {children}
    </StockContext.Provider>
  );
}

export const useStock = () => useContext(StockContext);
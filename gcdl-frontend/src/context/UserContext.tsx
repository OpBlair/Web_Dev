// src/context/UserContext.tsx
import { createContext, useContext, useState } from "react";
import type { User } from "../types/index";
import type { ReactNode } from "react";

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [selectedBranch, setSelectedBranch] = useState("All Branches");

  return (
    <UserContext.Provider value={{ user, setUser, selectedBranch, setSelectedBranch }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
}
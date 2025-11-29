export type UserRole = "ceo" | "manager" | "agent";

export interface User {
  name: string;
  email: string;
  role: UserRole;
}

export interface Produce {
  id: number;
  name: string;
  tonnage: number;
}
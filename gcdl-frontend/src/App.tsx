// app.tsx (FIXED: Redundant wrapper removed, ensuring correct Layout application)
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Procurement from "./pages/Procurement";
import Sales from "./pages/Sales";
import CreditSales from "./pages/CreditSales";
import Stock from "./pages/Stock";
import Reports from "./pages/Reports";
import Layout from "./pages/layout";

import { useState } from "react";
import type { User, UserRole } from "./types/index";
import { StockProvider } from "./context/StockContext";

// Define the access control list: route path -> roles allowed
const ACCESS_RULES: Record<string, UserRole[]> = {
  "/dashboard": ["ceo", "manager", "agent"],
  "/procurement": ["agent"],
  "/sales": ["agent"],
  "/credit-sales": ["agent"],
  "/stock": ["ceo", "manager"],
  "/reports": ["ceo", "manager"],
};

function ProtectedRoute({ children, user }: { children: React.ReactNode; user: User | null }) {
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const allowedRoles = ACCESS_RULES[location.pathname];
  const userRole = user.role;

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    console.warn(`Access Denied: User ${user.name} (${userRole}) attempted to access ${location.pathname}`);
    return (
      <div className="p-8 text-center min-h-[50vh] flex items-center justify-center">
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 w-full max-w-md rounded-lg shadow-lg">
          <p className="font-bold text-xl mb-2">Access Denied</p>
          <p>You do not have the required role ({userRole.toUpperCase()}) to view this section.</p>
        </div>
      </div>
    );
  }

  // Authenticated and authorized: WRAP CHILDREN IN LAYOUT
  return <Layout user={ user }>{children}</Layout>;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <BrowserRouter>
    <StockProvider>
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute user={user}>
                {/* REMOVED: Redundant div wrapper was here */}
                <Routes>
                  <Route path="/dashboard" element={<Dashboard user={user!} />} />
                  <Route path="/procurement" element={<Procurement />} />
                  <Route path="/sales" element={<Sales />} />
                  <Route path="/CreditSales" element={<CreditSales />} />
                  <Route path="/stock" element={<Stock />} />
                  <Route path="/reports" element={<Reports user={user!} />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </StockProvider>
    </BrowserRouter>
  );
}
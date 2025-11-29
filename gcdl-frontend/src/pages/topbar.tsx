// topbar.tsx (Refined State Management and Error Handling)
import BranchSelector from "./branchSelector";
import { useLocation } from "react-router-dom";
import type { User } from "../types/index";
import { useState } from "react"; // CRITICAL: Import useState

// topbar.tsx

// 🛑 THE FIX: Define the type as Record<string, string>
// This tells TypeScript: "This is an object where keys are strings and values are strings."
const TITLE_MAP: Record<string, string> = {
  "/dashboard": "Overview",
  "/procurement": "Procurement",
  "/sales": "Sales",
  "/credit-sales": "CreditSales", // Assuming you fixed the casing here to match app.tsx route
  "/stock": "Stock Management",
  "/reports": "Business Reports",
  // Add any other routes here
};
// ... rest of the file
export default function Topbar({ user }: { user: User | null }) {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const displayTitle = TITLE_MAP[currentPath] || "Dashboard";
  
  // 🛑 REFINED CHECK: Only show the selector if user exists AND the role is CEO or Manager
  const showBranchSelector = user && (user.role === "ceo" || user.role === "manager");
  
  // Initialize and manage the state for the selected branch
  const branches = ["HQ", "Maganjo", "Matugga", "Kawempe", "Nansana"];
  const [selectedBranch, setSelectedBranch] = useState(branches[0]); 
  
  return (
    <header className="bg-white shadow px-6 flex justify-between items-center h-16">
      <div className="flex items-center gap-6">
        {/* 1. Page Title */}
        <h1 className="text-xl font-semibold text-gray-800">{displayTitle}</h1>
        
        {/* 2. Branch Selector */}
        {showBranchSelector && (
          <BranchSelector
            branches={branches}
            selected={selectedBranch}
            onChange={setSelectedBranch}
            // 🛑 CRITICAL FIX: We are certain 'user' exists here because of the 'showBranchSelector' check above.
            role={user!.role} 
          />
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* 3. User Role & Name */}
        {user && (
            <span className="text-gray-600">
                Welcome back, **{user.name.split(" ")[0]}!** <span className={`ml-2 text-xs font-bold uppercase rounded-full px-2 py-0.5 
                    ${user.role === 'ceo' ? 'bg-red-100 text-red-700' : 
                      user.role === 'manager' ? 'bg-blue-100 text-blue-700' : 
                      'bg-green-100 text-green-700'}`}>
                    {user.role}
                </span>
            </span>
        )}
      </div>
    </header>
  );
}
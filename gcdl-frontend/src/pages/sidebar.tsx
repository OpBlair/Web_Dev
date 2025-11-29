// sidebar.tsx (CRITICAL FIX APPLIED)
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Truck, 
  TrendingUp, 
  CreditCard, 
  Package, 
  FileText, 
  LogOut 
} from "lucide-react";
import type { User } from "../types/index"; 

// Update the component signature to accept user
export default function Sidebar({ user }: { user: User | null }) {
  const isAgent = user?.role === "agent";
  const isManagerOrCEO = user?.role === "manager" || user?.role === "ceo";
  
  return (
    // 🛑 FIXED: Added fixed top-0 left-0 z-50 to ensure positioning is correct
    <aside className="w-64 bg-gray-900 text-white h-screen fixed top-0 left-0 z-50 flex flex-col">
      
      {/* Header content (Title area) */}
      <div className="p-6">
        <h1 className="text-3xl font-extrabold text-teal-400">GCDL</h1>
      </div>

      <nav className="flex-1 px-6 py-6 space-y-2">
        {/* ... Navigation links remain the same ... */}
        
        {/* Dashboard - Always visible */}
        <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-emerald-600 rounded-lg">
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </Link>
        
        {/* Procurement - Only visible to AGENTS */}
        {isAgent && (
          <Link to="/procurement" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg">
            <Truck className="w-5 h-5" />
            Procurement
          </Link>
        )}
        
        {/* Sales - Only visible to AGENTS */}
        {isAgent && (
          <Link to="/sales" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg">
            <TrendingUp className="w-5 h-5" />
            Sales
          </Link>
        )}
        
        {/* Credit Sales - Only visible to AGENTS */}
        {isAgent && (
          <Link to="/creditSales" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg">
            <CreditCard className="w-5 h-5" />
            Credit Sales
          </Link>
        )}
        
        {/* Stock - Only visible to MANAGER/CEO */}
        {isManagerOrCEO && (
          <Link to="/stock" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg">
            <Package className="w-5 h-5" />
            Stock
          </Link>
        )}
        
        {/* Reports - Only visible to MANAGER/CEO */}
        {isManagerOrCEO && (
          <Link to="/reports" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg">
            <FileText className="w-5 h-5" />
            Reports
          </Link>
        )}
      </nav>

      {/* Logout button */}
      <div className="p-6 border-t border-gray-700">
        <Link to="/">
          <button className="w-full text-left px-4 py-3 hover:bg-red-600 rounded-lg transition flex items-center gap-3">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </Link>
      </div>
    </aside>
  );
}
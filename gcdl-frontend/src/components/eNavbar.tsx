import { Link, useNavigate } from "react-router-dom";
import { Home, Package2, ShoppingCart, CreditCard, Warehouse, BarChart3, LogOut } from "lucide-react";
import type { User, UserRole } from "../types/index";

// Assuming ACCESS_RULES is passed via props or available via Context in a full app.
interface NavbarProps { 
    user: User; 
    setUser: (u: User | null) => void; 
    accessRules: Record<string, UserRole[]>; 
}


export default function Navbar({ user, setUser, accessRules }: NavbarProps) {
  const navigate = useNavigate();
  const userRole = user.role;

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  const fullMenu = [
    { to: "/dashboard", icon: Home, label: "Dashboard" },
    { to: "/procurement", icon: Package2, label: "Procurement" },
    { to: "/sales", icon: ShoppingCart, label: "Sales" },
    { to: "/credit-sales", icon: CreditCard, label: "Credit Sales" },
    { to: "/stock", icon: Warehouse, label: "Stock" },
    { to: "/reports", icon: BarChart3, label: "Reports" },
  ];

  // Filter the menu based on the user's role
  const visibleMenu = fullMenu.filter((item) => {
    const allowedRoles = accessRules[item.to];
    // Check if the current user role is included in the allowed roles for this path
    return allowedRoles && allowedRoles.includes(userRole);
  });

  return (
    <nav className="bg-blue-600 text-white shadow-lg z-10 sticky top-0">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/dashboard" className="text-2xl font-bold">Golden Crop Distributors</Link>
        <div className="flex items-center gap-6">
          {visibleMenu.map((item) => (
            <Link key={item.to} to={item.to} className="flex items-center gap-2 hover:bg-blue-700 px-3 py-2 rounded transition">
              <item.icon className="w-5 h-5" />
              <span className="hidden md:block">{item.label}</span>
            </Link>
          ))}
          <div className="relative group">
            <button className="flex items-center gap-2 hover:bg-blue-700 px-3 py-2 rounded transition">
              <div className="w-10 h-10 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold text-lg uppercase">
                {user.name[0]}
              </div>
              <span className="hidden md:block uppercase">{user.role}</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-50">
              <button onClick={logout} className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
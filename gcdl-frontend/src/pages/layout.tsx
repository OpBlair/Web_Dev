// layout.tsx (Stable Version with Fixed Margins)
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import type { User } from "../types/index"; 

export default function Layout({ 
    children, 
    user 
}: { 
    children: React.ReactNode, 
    user: User | null 
}) {
  return (
    // 1. Root Container
    <div className="relative min-h-screen bg-gray-100">
      
      {/* 2. Fixed Sidebar (Assumes w-64, fixed top-0 left-0, z-50 in its own component) */}
      <Sidebar user={user} /> 

      {/* 3. Fixed Topbar Container: 
          - fixed top-0 right-0 z-50
          - left-64: Forces the topbar to start exactly after the w-64 sidebar.
      */}
      <div className="fixed top-0 right-0 left-64 z-50 bg-white shadow-md">
          <Topbar user={user} />
      </div>

      {/* 4. Main Content Area (Uses Margins for Offsets) 
          - ml-64: Clears the w-64 sidebar space.
          - mt-16: Clears the h-16 topbar space.
          - p-8: Provides internal padding for the content.
      */}
      <main className="ml-64 mt-16 p-5">
        {children}
      </main>
      
    </div>
  );
}
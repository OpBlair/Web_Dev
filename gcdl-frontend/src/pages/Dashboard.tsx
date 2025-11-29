// dashboard.tsx (FIXED: Cleaned Agent Activity and added React import)
import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { Package, TrendingUp, AlertTriangle, DollarSign, BarChart2 } from "lucide-react";
import type { User } from "../types/index";
import { useStock } from "../context/StockContext";
import { ArrowUpRight, ArrowDownLeft, CreditCard } from "lucide-react";
import React from "react"; // <--- CRITICAL FIX: Import React for React.createElement

const COLORS = ["#10b981", "#f59e0b", "#ef4444", "#3b82f6", "#8b5cf6", "#ec4899"];

export default function Dashboard({ user }: { user: User }) {
  const { state } = useStock();
  const { stock, transactions } = state;

  const totalStock = Object.values(stock).reduce((a, b) => a + b, 0);
  const lowStockItems = Object.entries(stock).filter(([_, tons]) => tons < 100);

  const stockData = Object.entries(stock).map(([name, value]) => ({ name, value }));

  // Branch selector state (Kept for local use)
  const branches = ["HQ", "Maganjo", "Matugga", "Kawempe", "Nansana"];
  const selectedBranch = "HQ";

  const salesTrend = [
    { month: "Jul", sales: 42 },
    { month: "Aug", sales: 58 },
    { month: "Sep", sales: 71 },
    { month: "Oct", sales: 89 },
    { month: "Nov", sales: 105 },
    { month: "Dec", sales: 120 },
  ];

  // Temporary branch comparison (CEO)
  const branchPerformance = [
    { branch: "Maganjo", stock: 186, revenue: 42, growth: 12 },
    { branch: "Matugga", stock: 98, revenue: 27, growth: 4 },
    { branch: "Kawempe", stock: 122, revenue: 31, growth: 8 },
  ];

  return (
    <> {/* CRITICAL FIX: Fragment to wrap multiple conditional returns */}

      {/*═══════════════════════════════════════════════*/}
      {/* CEO DASHBOARD                   */}
      {/*═══════════════════════════════════════════════*/}
      {user.role === "ceo" && (
        <div className="space-y-8">
          
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold text-gray-700">
              Executive Summary
            </h2>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-2xl shadow-xl">
              <DollarSign className="w-10 h-10 mb-2" />
              <div className="text-3xl font-bold">UGX 185M</div>
              <div>YTD Total Revenue</div>
            </div>

            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-2xl">
              <Package className="w-10 h-10 mb-2" />
              <div className="text-3xl font-bold">{totalStock.toFixed(0)} Tons</div>
              <div>Total Stock Across Branches</div>
            </div>

            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-2xl">
              <AlertTriangle className="w-10 h-10 mb-2" />
              <div className="text-3xl font-bold">UGX 18.2M</div>
              <div>Outstanding Credit</div>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-2xl">
              <TrendingUp className="w-10 h-10 mb-2" />
              <div className="text-3xl font-bold">+24%</div>
              <div>Growth vs Previous Year</div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold mb-4">Sales Trend (2025)</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesTrend}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={4} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold mb-4">Stock Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stockData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    label
                  >
                    {stockData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Executive Reports */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <BarChart2 /> Executive Summary Report
            </h2>

            <p className="text-gray-700 mb-6 leading-relaxed">
              A quick breakdown of enterprise-wide performance across all zones, branches, and sales teams.
              This report updates automatically based on real-time stock, revenue, and sales movement.
            </p>

            {/* Branch Performance Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-xl overflow-hidden">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-4 text-left">Branch</th>
                    <th className="p-4 text-left">Stock (Tons)</th>
                    <th className="p-4 text-left">Monthly Revenue (M UGX)</th>
                    <th className="p-4 text-left">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {branchPerformance.map((b) => (
                    <tr key={b.branch} className="border-t">
                      <td className="p-4">{b.branch}</td>
                      <td className="p-4 font-semibold">{b.stock}</td>
                      <td className="p-4">{b.revenue}</td>
                      <td className={`p-4 font-bold ${b.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                        {b.growth}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/*═══════════════════════════════════════════════*/}
      {/* MANAGER DASHBOARD               */}
      {/*═══════════════════════════════════════════════*/}
      {user.role === "manager" && (
        <div className="space-y-8">
          {/* Title - Changed to h2 since the main page title is in the Topbar */}
          <h2 className="text-3xl font-bold text-gray-700">Branch Manager Dashboard</h2>

          {lowStockItems.length > 0 && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <p className="font-bold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> Low Stock Alert
              </p>
              <p>
                {lowStockItems.map(([item]) => item).join(", ")}{" "}
                {lowStockItems.length === 1 ? "is" : "are"} below 100 tons!
              </p>
            </div>
          )}
          {/* ... rest of manager dashboard ... */}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Current Stock", value: totalStock.toFixed(0) + " Tons", color: "blue" },
              { label: "Today's Sales", value: "42 Tons", color: "green" },
              { label: "Credit Due (7 days)", value: "UGX 4.2M", color: "orange" },
            ].map((card) => (
              <div
                key={card.label}
                className={`bg-white border-2 border-${card.color}-200 p-6 rounded-2xl`}
              >
                <h3 className="text-lg font-semibold">{card.label}</h3>
                <p className={`text-4xl font-bold text-${card.color}-600`}>{card.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-6">Current Stock Levels</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {Object.entries(stock).map(([produce, tons]) => (
                <div
                  key={produce}
                  className={`p-5 rounded-lg border text-center ${
                    tons < 100 ? "bg-red-50 border-red-300" : "bg-gray-50 border-gray-300"
                  }`}
                >
                  <p className="font-medium text-gray-700">{produce}</p>
                  <p className={`text-3xl font-bold mt-2 ${
                    tons < 100 ? "text-red-600" : "text-gray-800"
                  }`}>
                    {tons} tons
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/*═══════════════════════════════════════════════*/}
      {/* AGENT DASHBOARD                 */}
      {/*═══════════════════════════════════════════════*/}
      {user.role === "agent" && (
        <div className="space-y-8">
          {/* Title - Changed to h2 since the main page title is in the Topbar */}
          <h2 className="text-3xl font-bold text-gray-700">
            Hello, {user.name.split(" ")[0]}!
          </h2>
          <p className="text-xl text-gray-600">Ready to record today's transactions?</p>
          
          {/* ... rest of agent dashboard ... */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/procurement"
              className="bg-blue-600 text-white p-10 rounded-2xl text-center hover:bg-blue-700 transition shadow-xl"
            >
              <Package className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold">Record Procurement</h3>
            </a>

            <a
              href="/sales"
              className="bg-green-600 text-white p-10 rounded-2xl text-center hover:bg-green-700 transition shadow-xl"
            >
              <TrendingUp className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold">Record Sale</h3>
            </a>

            <a
              href="/credit-sales"
              className="bg-orange-600 text-white p-10 rounded-2xl text-center hover:bg-orange-700 transition shadow-xl"
            >
              <DollarSign className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold">Credit Sale</h3>
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl"> {/* <-- Adjusted shadow for consistency */}
            <h2 className="text-2xl font-bold mb-4">Your Recent Activity</h2>

            {transactions.length === 0 ? (
              <p className="text-gray-500">No transactions yet. Start recording!</p>
            ) : (
              <div className="space-y-3 divide-y divide-gray-100">
                {transactions.slice(0, 7).map((t) => {
                  const isSale = t.type === 'sale';
                  const isCredit = t.type === 'credit-sale';
                  const icon = isSale ? ArrowUpRight : isCredit ? CreditCard : ArrowDownLeft;
                  const colorClass = isSale ? 'text-green-600 bg-green-50' : isCredit ? 'text-orange-600 bg-orange-50' : 'text-blue-600 bg-blue-50';
                  const typeLabel = t.type.replace("-", " ");
                  
                  return (
                    <div key={t.id} className="flex items-center justify-between pt-3">
                      
                      {/* Left side: Icon, Type, Produce */}
                      <div className="flex items-center gap-3">
                        <span className={`p-2 rounded-full ${colorClass}`}>
                          {React.createElement(icon, { className: "w-4 h-4" })}
                        </span>
                        <div>
                          <p className="text-sm font-semibold capitalize text-gray-800">{typeLabel}</p>
                          <p className="text-xs text-gray-500">{t.produce}</p>
                        </div>
                      </div>
                      
                      {/* Right side: Tonnage and Date */}
                      <div className="text-right">
                        <p className={`text-sm font-bold ${isSale || isCredit ? 'text-red-500' : 'text-green-500'}`}>
                          {t.tonnage} tons
                        </p>
                        <p className="text-xs text-gray-400">{t.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

    </>
  );
}
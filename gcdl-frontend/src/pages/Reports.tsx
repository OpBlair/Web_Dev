// Reports.tsx
import { useStock } from "../context/StockContext";
import type { User } from "../types/index";
import { TrendingUp, BarChart2, Package, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// A simple map to estimate revenue per ton for reporting (Placeholder/Mock data)
const PRICE_PER_TON: { [key: string]: number } = {
  "Beans": 3500000,
  "Grain Maize": 1800000,
  "Cowpeas": 4000000,
  "Groundnuts (G-nuts)": 5500000,
  "Rice": 4500000,
  "Soybeans": 2500000,
};

// Helper function to process transactions into monthly summaries
const getMonthlyReportData = (transactions: any[]) => {
  const monthlyData: { [key: string]: { sales: number; procurement: number; revenue: number } } = {};

  transactions.forEach(t => {
    const monthYear = t.date.substring(0, 7); // YYYY-MM
    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = { sales: 0, procurement: 0, revenue: 0 };
    }
    
    const price = PRICE_PER_TON[t.produce] || 2000000; // Use default if produce not found
    const value = t.tonnage * price / 1000000; // Convert to Millions (M UGX)

    if (t.type === 'sale' || t.type === 'credit-sale') {
      monthlyData[monthYear].sales += t.tonnage;
      monthlyData[monthYear].revenue += value;
    } else if (t.type === 'procurement') {
      monthlyData[monthYear].procurement += t.tonnage;
    }
  });

  // Convert map to array, sort by month, and format month name
  return Object.entries(monthlyData)
    .map(([date, data]) => ({
      name: new Date(date + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      ...data,
      revenue: parseFloat(data.revenue.toFixed(2)) // Round revenue to 2 decimal places
    }))
    .sort((a, b) => new Date(`01-${a.name}`).getTime() - new Date(`01-${b.name}`).getTime());
};

export default function Reports({ user }: { user: User }) {
  const { state } = useStock();
  const { transactions, stock } = state;
  
  const monthlyData = getMonthlyReportData(transactions);
  
  // Calculate total metrics
  const totalSalesTons = monthlyData.reduce((acc, curr) => acc + curr.sales, 0);
  const totalRevenue = monthlyData.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalProcurementTons = monthlyData.reduce((acc, curr) => acc + curr.procurement, 0);

  // Calculate current stock value
  const currentStockValue = Object.entries(stock).reduce((acc, [produce, tons]) => {
    const price = PRICE_PER_TON[produce] || 2000000;
    return acc + (tons * price / 1000000); // M UGX
  }, 0);

  // Check if there's data to display
  if (transactions.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-lg shadow-xl max-w-xl mx-auto mt-10">
        <BarChart2 className="w-12 h-12 text-blue-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Report Data Available</h2>
        <p className="text-gray-600">Please record some procurement and sales transactions to generate reports.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-full">
      <h1 className="text-3xl font-bold text-gray-800">
        <BarChart2 className="inline w-7 h-7 mr-2" /> Business Performance Reports
      </h1>
      
      <hr className="border-gray-300" />
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
          <p className="text-sm font-medium text-gray-500">Total Revenue (M UGX)</p>
          <p className="text-3xl font-extrabold text-blue-600 mt-1">
            {totalRevenue.toFixed(2)} M
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
          <p className="text-sm font-medium text-gray-500">Total Sales (Tons)</p>
          <p className="text-3xl font-extrabold text-green-600 mt-1">
            {totalSalesTons}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
          <p className="text-sm font-medium text-gray-500">Total Procurement (Tons)</p>
          <p className="text-3xl font-extrabold text-yellow-600 mt-1">
            {totalProcurementTons}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
          <p className="text-sm font-medium text-gray-500">Current Stock Value (M UGX)</p>
          <p className="text-3xl font-extrabold text-purple-600 mt-1">
            {currentStockValue.toFixed(2)} M
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 1. Monthly Revenue Chart (Main Report) */}
        <div className="bg-white p-8 rounded-xl shadow-lg col-span-1 lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" /> Monthly Financial Trend
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis domain={['auto', 'auto']} tickFormatter={(value) => `${value}M`} />
              <Tooltip formatter={(value: number) => [`${value.toFixed(2)} M UGX`, 'Revenue']} />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 2. Procurement vs Sales Summary (Table/List) */}
        <div className="bg-white p-8 rounded-xl shadow-lg col-span-1">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Package className="w-6 h-6" /> Tonnage Movement
          </h2>
          <div className="space-y-4">
            {monthlyData.slice(-5).reverse().map((data) => (
              <div key={data.name} className="border-b pb-3">
                <p className="font-semibold text-lg flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" /> {data.name}
                </p>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-green-600">Sales: **{data.sales} Tons**</span>
                  <span className="text-yellow-600">Procurement: **{data.procurement} Tons**</span>
                </div>
              </div>
            ))}
          </div>
          {monthlyData.length > 5 && (
            <p className="text-sm text-gray-500 mt-4">Showing last 5 months...</p>
          )}
        </div>
      </div>
      
    </div>
  );
}
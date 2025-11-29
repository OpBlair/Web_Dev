// Stock.tsx (Updated to use StockContext)
import { useStock } from "../context/StockContext";
import { AlertTriangle, Package } from "lucide-react";

// Helper function for date formatting (optional but good practice)
const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A';
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options as Intl.DateTimeFormatOptions);
};

export default function Stock() {
  // 1. Retrieve the global state from the context
  const { state } = useStock();
  const { stock } = state;

  // Assuming all stock is managed at the HQ branch for simplicity right now.
  const BRANCH_NAME = "HQ Branch"; 
  const LOW_STOCK_THRESHOLD = 100;

  // Prepare data for the table
  const stockEntries = Object.entries(stock).map(([produce, tonnage]) => ({
    produce,
    tonnage,
    branch: BRANCH_NAME,
    // Note: We don't have a specific 'last updated' time per produce item in your current state, 
    // so we'll use today's date or the last transaction date. Using today for now.
    lastUpdated: formatDate(new Date().toISOString()),
    status: tonnage <= LOW_STOCK_THRESHOLD ? 'low' : (tonnage <= LOW_STOCK_THRESHOLD * 2 ? 'warning' : 'good')
  }));
  
  const lowStockCount = stockEntries.filter(item => item.status === 'low').length;

  return (
    <div className="max-w-7xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <Package className="w-7 h-7" /> Current Stock Levels
      </h1>

      {/* Low Stock Alert */}
      {lowStockCount > 0 && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg shadow-md">
          <p className="font-bold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Low Stock Alert
          </p>
          <p>
            {lowStockCount} item{lowStockCount > 1 ? 's are' : ' is'} below the {LOW_STOCK_THRESHOLD} tons threshold.
          </p>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produce</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tonnage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stockEntries.map((item) => (
              <tr key={item.produce}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.produce}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.branch}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold 
                  ${item.status === 'low' ? 'text-red-600' : item.status === 'warning' ? 'text-orange-600' : 'text-green-600'}`}>
                  {item.tonnage} tons
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${item.status === 'low' ? 'bg-red-100 text-red-800' : item.status === 'warning' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                      {item.status === 'low' ? 'Low' : item.status === 'warning' ? 'Monitor' : 'Good'}
                   </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
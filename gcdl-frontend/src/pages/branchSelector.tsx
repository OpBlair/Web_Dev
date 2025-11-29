// BranchSelector.tsx (Fixed)

interface Props {
  branches: string[];
  selected: string;
  onChange: (value: string) => void;
  role: string; // Assuming 'ceo' or 'manager' are the intended roles
}

export default function BranchSelector({ branches, selected, onChange, role }: Props) {
  // Assuming the roles 'Staff' and 'Sales' are not allowed to use the selector
  if (role === "Staff" || role === "Sales") return null;

  return (
    // 🛑 FIX: Removed mb-4 and adjusted inline padding/styling for better alignment in the Topbar.
    <div className="flex items-center space-x-2 text-sm text-gray-600">
      <label className="font-medium shrink-0">Branch:</label>
      <select
        className="border border-gray-300 py-1 px-2 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
        value={selected}
        onChange={(e) => onChange(e.target.value)} // This line is correct!
      >
        {branches.map((b) => (
          <option key={b} value={b}>{b}</option>
        ))}
      </select>
    </div>
  );
}
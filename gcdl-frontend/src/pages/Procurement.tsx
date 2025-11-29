import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useStock } from "../context/StockContext";

// --- ZOD SCHEMA FOR PROCUREMENT ---

const contactRegex = /^\d{10,}$/; 

const procurementSchema = z.object({
  // Produce Details
  produce: z.string().min(1, "Produce name is required."),
  type: z.string().min(1, "Produce type (e.g., Grade A) is required."),
  tonnage: z.string().regex(/^\d+(\.\d+)?$/, "Tonnage must be a positive number.").min(1, "Tonnage is required."),
  
  // Date & Time
  date: z.string().min(1, "Date is required."),
  time: z.string().min(1, "Time is required."),

  // Cost & Price
  cost: z.string().regex(/^\d+$/, "Cost must be a whole number.").min(1, "Total Cost is required."),
  sellingPrice: z.string().regex(/^\d+$/, "Selling Price must be a whole number.").min(1, "Selling Price is required."),

  // Dealer & Location
  dealerName: z.string().min(3, "Dealer Name is required."),
  dealerContact: z.string()
    .min(10, "Contact must be at least 10 digits.")
    .regex(contactRegex, "Invalid phone number format."),
  branch: z.string().min(1, "Branch is required."),
});

// Infer the type from the schema for strong typing
type ProcurementForm = z.infer<typeof procurementSchema>;

// --- REACT COMPONENT ---

export default function Procurement() {
  const {dispatch} = useStock();
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm<ProcurementForm>({ 
    resolver: zodResolver(procurementSchema) 
  });

  const onSubmit = (data: ProcurementForm) => {
    console.log("Procurement Data:", data);
    alert(`Procurement of ${data.tonnage} tons recorded from ${data.dealerName} for UGX ${data.cost}!`);
    // Update global stock
    dispatch({
      type: "ADD_PROCUREMENT",
      payload: { produce: data.produce, tonnage: parseFloat(data.tonnage) },
    });

    reset();


  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">🚚 New Procurement Record</h1>
      <div className="card bg-base-100 shadow-xl border-t-4 border-blue-500">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* PRODUCE DETAILS SECTION */}
            <h2 className="md:col-span-2 text-xl font-semibold border-b pb-2">Produce Details & Quantity</h2>
            
            <div className="form-control">
                <select {...register("produce")} className={`select border p-2 w-full rounded focus:ring-blue-500 focus:border-blue-500 ${errors.produce ? 'select-error' : ''}`}>
                    <option value="">Select Produce *</option>
                    <option>Beans</option><option>Grain Maize</option><option>Cowpeas</option><option>Groundnuts (G-nuts)</option><option>Rice</option><option>Soybeans</option>
                </select>
                {errors.produce && <p className="text-error text-xs mt-1">{errors.produce.message}</p>}
            </div>
            
            <div className="form-control">
                <input {...register("type")} placeholder="Produce Type (e.g., Grade A, White) *" className={`border p-2 w-full rounded focus:ring-blue-500 focus:border-blue-500 ${errors.type ? 'input-error' : ''}`} />
                {errors.type && <p className="text-error text-xs mt-1">{errors.type.message}</p>}
            </div>
            
            <div className="form-control">
                <input {...register("tonnage")} placeholder="Tonnage (tons) *" type="number" step="0.01" className={`border p-2 w-full rounded focus:ring-blue-500 focus:border-blue-500 ${errors.tonnage ? 'input-error' : ''}`} />
                {errors.tonnage && <p className="text-error text-xs mt-1">{errors.tonnage.message}</p>}
            </div>

            {/* COST & PRICE SECTION */}
            <h2 className="md:col-span-2 text-xl font-semibold border-b pb-2 mt-4">Cost & Expected Selling Price</h2>
            
            <div className="form-control">
                <input {...register("cost")} placeholder="Total Cost (UGX) *" type="number" className={`border p-2 w-full rounded focus:ring-blue-500 focus:border-blue-500 ${errors.cost ? 'input-error' : ''}`} />
                {errors.cost && <p className="text-error text-xs mt-1">{errors.cost.message}</p>}
            </div>
            <div className="form-control">
                <input {...register("sellingPrice")} placeholder="Expected Selling Price (UGX) *" type="number" className={`border p-2 w-full rounded focus:ring-blue-500 focus:border-blue-500 ${errors.sellingPrice ? 'input-error' : ''}`} />
                {errors.sellingPrice && <p className="text-error text-xs mt-1">{errors.sellingPrice.message}</p>}
            </div>

            {/* DEALER & LOCATION SECTION */}
            <h2 className="md:col-span-2 text-xl font-semibold border-b pb-2 mt-4">Dealer & Branch Details</h2>
            
            <div className="form-control">
                <input {...register("dealerName")} placeholder="Dealer Name *" className={`border p-2 w-full rounded focus:ring-blue-500 focus:border-blue-500 ${errors.dealerName ? 'input-error' : ''}`} />
                {errors.dealerName && <p className="text-error text-xs mt-1">{errors.dealerName.message}</p>}
            </div>
            <div className="form-control">
                <input {...register("dealerContact")} placeholder="Dealer Contact *" type="tel" className={`border p-2 w-full rounded focus:ring-blue-500 focus:border-blue-500 ${errors.dealerContact ? 'input-error' : ''}`} />
                {errors.dealerContact && <p className="text-error text-xs mt-1">{errors.dealerContact.message}</p>}
            </div>
            
            <div className="form-control">
                <select {...register("branch")} className={`select border p-2 w-full rounded focus:ring-blue-500 focus:border-blue-500 ${errors.branch ? 'select-error' : ''}`}>
                    <option value="">Select Branch *</option>
                    <option>Kampala</option><option>Mukono</option>
                </select>
                {errors.branch && <p className="text-error text-xs mt-1">{errors.branch.message}</p>}
            </div>

            {/* DATE & TIME SECTION */}
            <div className="form-control">
                <label className="label pt-0 pb-1"><span className="label-text text-sm font-medium">Date Procured *</span></label>
                <input {...register("date")} type="date" className={`border p-2 w-full rounded focus:ring-blue-500 focus:border-blue-500 ${errors.date ? 'input-error' : ''}`} />
                {errors.date && <p className="text-error text-xs mt-1">{errors.date.message}</p>}
            </div>
            
            <div className="form-control">
                <label className="label pt-0 pb-1"><span className="label-text text-sm font-medium">Time Procured *</span></label>
                <input {...register("time")} type="time" className={`border p-2 w-full rounded focus:ring-blue-500 focus:border-blue-500 ${errors.time ? 'input-error' : ''}`} />
                {errors.time && <p className="text-error text-xs mt-1">{errors.time.message}</p>}
            </div>

            {/* SUBMIT BUTTON */}
            <div className="md:col-span-2 mt-4">
              <button type="submit" className="bg-blue-600 w-full p-3 text-white rounded-lg hover:bg-blue-700 font-semibold">RECORD PROCUREMENT</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
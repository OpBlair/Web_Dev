import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useStock } from "../context/StockContext";

// --- ZOD SCHEMA FOR CASH SALES ---

const cashSalesSchema = z.object({
  produce: z.string().min(1, "Produce selection is required."),
  tonnage: z.string().regex(/^\d+(\.\d+)?$/, "Tonnage must be a positive number.").min(1, "Tonnage is required."),
  // Renamed cost to amountPaid to better reflect a Sale transaction
  amountPaid: z.string().regex(/^\d+$/, "Amount Paid must be a number.").min(1, "Amount Paid is required."),
  // The original sellingPrice and dealerName/dealerContact fields are better named for a sale:
  // We'll rename dealerName to buyerName and dealerContact to buyerContact
  buyerName: z.string().min(3, "Buyer Name is required."),
  buyerContact: z.string().min(10, "Buyer Contact must be at least 10 digits."),
  // Note: SellingPrice is usually stored in a database/state, but kept here for validation simplicity
  sellingPrice: z.string().regex(/^\d+$/, "Selling Price must be a number.").optional(),
});

// Infer the type from the schema for strong typing
type CashSalesForm = z.infer<typeof cashSalesSchema>;

// --- REACT COMPONENT ---

export default function Sales() {
  const { dispatch } = useStock();
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm<CashSalesForm>({ 
    resolver: zodResolver(cashSalesSchema) 
  });

  const onSubmit = (data: CashSalesForm) => {
    console.log("Cash Sales Data:", data);
    alert(`Cash Sale recorded successfully for ${data.buyerName}! UGX ${data.amountPaid} received.`);
    
    //update global stock
    dispatch({
      type: "ADD_SALE",
      payload: { produce: data.produce, tonnage: parseFloat(data.tonnage) },
    });
    
    reset();
  };

  const generateReceipt = () => {
    alert("Receipt generated and downloaded! (Real PDF generation logic is in the backend)");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-green-700">🛒 New Cash Sale Record</h1>
      <div className="card bg-base-100 shadow-xl border-t-4 border-green-500">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* PRODUCE DETAILS */}
            <h2 className="md:col-span-2 text-xl font-semibold border-b pb-2">Produce Details</h2>
            <div className="form-control">
                <select {...register("produce")} className={`select border p-2 w-full rounded focus:ring-green-500 focus:border-green-500 ${errors.produce ? 'select-error' : ''}`}>
                    <option value="">Select Produce *</option>
                    {/* Add all produce types from GCDL business overview */}
                    <option>Beans</option><option>Grain Maize</option><option>Cowpeas</option><option>Groundnuts (G-nuts)</option><option>Rice</option><option>Soybeans</option>
                </select>
                {errors.produce && <p className="text-error text-xs mt-1">{errors.produce.message}</p>}
            </div>
            <div className="form-control">
                <input {...register("tonnage")} placeholder="Tonnage Sold (tons) *" className={`border p-2 w-full rounded focus:ring-green-500 focus:border-green-500 ${errors.tonnage ? 'input-error' : ''}`} />
                {errors.tonnage && <p className="text-error text-xs mt-1">{errors.tonnage.message}</p>}
            </div>

            {/* BUYER & FINANCIAL DETAILS */}
            <h2 className="md:col-span-2 text-xl font-semibold border-b pb-2 mt-4">Buyer & Payment Details</h2>
            
            <div className="form-control">
                <input {...register("buyerName")} placeholder="Buyer Name *" className={`border p-2 w-full rounded focus:ring-green-500 focus:border-green-500 ${errors.buyerName ? 'input-error' : ''}`} />
                {errors.buyerName && <p className="text-error text-xs mt-1">{errors.buyerName.message}</p>}
            </div>
            <div className="form-control">
                <input {...register("buyerContact")} placeholder="Buyer Contact *" className={`border p-2 w-full rounded focus:ring-green-500 focus:border-green-500 ${errors.buyerContact ? 'input-error' : ''}`} />
                {errors.buyerContact && <p className="text-error text-xs mt-1">{errors.buyerContact.message}</p>}
            </div>

            <div className="form-control">
                <input {...register("amountPaid")} placeholder="Amount Paid (UGX) *" className={`border p-2 w-full rounded focus:ring-green-500 focus:border-green-500 ${errors.amountPaid ? 'input-error' : ''}`} />
                {errors.amountPaid && <p className="text-error text-xs mt-1">{errors.amountPaid.message}</p>}
            </div>

            <div className="form-control">
                {/* Selling price is often dynamic or for internal tracking, making it optional for entry */}
                <input {...register("sellingPrice")} placeholder="Unit Selling Price (Internal)" className={`border p-2 w-full rounded focus:ring-green-500 focus:border-green-500 ${errors.sellingPrice ? 'input-error' : ''}`} />
                {errors.sellingPrice && <p className="text-error text-xs mt-1">{errors.sellingPrice.message}</p>}
            </div>

            {/* SUBMIT BUTTON */}
            <div className="md:col-span-2 mt-4 flex gap-4">
              <button type="submit" className="bg-green-600 w-full p-3 text-white rounded-lg hover:bg-green-700 transition font-semibold">
                <i className="bi bi-check-circle-fill me-2"></i> COMPLETE & RECORD SALE
              </button>
              <button type="button" onClick={generateReceipt} className="bg-gray-400 w-1/3 p-3 text-white rounded-lg hover:bg-gray-500 transition font-semibold">
                <i className="bi bi-file-earmark-text-fill me-2"></i> RECEIPT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
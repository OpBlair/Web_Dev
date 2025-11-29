import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { parse, isValid } from "date-fns"; 
import { useStock } from "../context/StockContext";

// --- ZOD SCHEMA FOR CREDIT SALES ---

// Simplified Regex Check: Must start with CF or CM, followed by at least 10 alphanumeric characters.
const nationalIdRegex = /^(CF|CM)[A-Z0-9]{10,}$/i;

const creditSalesSchema = z.object({
  produce: z.string().min(1, "Produce selection is required."),
  tonnage: z.string().regex(/^\d+(\.\d+)?$/, "Tonnage must be a positive number.").min(1, "Tonnage is required."),
  amountDue: z.string().regex(/^\d+$/, "Amount Due must be a number.").min(1, "Amount Due is required."),
  buyerName: z.string().min(3, "Buyer Name is required."),
  nationalId: z.string()
    .min(12, "National ID must be at least 12 characters.")
    .regex(nationalIdRegex, "Invalid Uganda National ID format (Must start with CF or CM)."),
  location: z.string().min(3, "Buyer location is required."),
  dueDate: z.string().refine((val) => {
    // Custom validation: check if the string can be parsed as a valid date
    const date = parse(val, 'yyyy-MM-dd', new Date());
    return isValid(date);
  }, {
    message: "Invalid Due Date format (must be YYYY-MM-DD)."
  }),
});

// Infer the type from the schema for strong typing
type CreditSalesForm = z.infer<typeof creditSalesSchema>;

// --- REACT COMPONENT ---

export default function CreditSales() {
  const {dispatch} = useStock();
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm<CreditSalesForm>({ 
    resolver: zodResolver(creditSalesSchema) 
  });

  const onSubmit = (data: CreditSalesForm) => {
    console.log("Credit Sales Data:", data);
    alert(`Credit Sale recorded for ${data.buyerName}. Amount Due: UGX ${data.amountDue}`);
    
    //update global stock
    dispatch({
      type: "ADD_CREDIT_SALE",
      payload: { produce: data.produce, tonnage: parseFloat(data.tonnage) },
    });

    reset();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-yellow-700">✍️ New Credit Sale Record</h1>
      <div className="card bg-base-100 shadow-xl border-t-4 border-yellow-500">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* PRODUCE DETAILS */}
            <h2 className="md:col-span-2 text-xl font-semibold border-b pb-2">Produce Details</h2>
            <div className="form-control">
                <select {...register("produce")} className={`select border p-2 w-full rounded focus:ring-yellow-500 focus:border-yellow-500  ${errors.produce ? 'select-error' : ''}`}>
                    <option value="">Select Produce *</option>
                    <option>Beans</option><option>Grain Maize</option><option>Cowpeas</option><option>Groundnuts (G-nuts)</option><option>Rice</option><option>Soybeans</option>
                </select>
                {errors.produce && <p className="text-error text-xs mt-1">{errors.produce.message}</p>}
            </div>
            <div className="form-control">
                <input {...register("tonnage")} placeholder="Tonnage (tons) *" className={`border p-2 w-full rounded focus:ring-yellow-500 focus:border-yellow-500  ${errors.tonnage ? 'input-error' : ''}`} />
                {errors.tonnage && <p className="text-error text-xs mt-1">{errors.tonnage.message}</p>}
            </div>

            {/* BUYER & FINANCIAL DETAILS */}
            <h2 className="md:col-span-2 text-xl font-semibold border-b pb-2 mt-4">Buyer & Credit Terms</h2>
            
            <div className="form-control">
                <input {...register("buyerName")} placeholder="Buyer Name *" className={`border p-2 w-full rounded focus:ring-yellow-500 focus:border-yellow-500 ${errors.buyerName ? 'input-error' : ''}`} />
                {errors.buyerName && <p className="text-error text-xs mt-1">{errors.buyerName.message}</p>}
            </div>
            <div className="form-control">
                <input {...register("nationalId")} placeholder="National ID (CF/CM...) *" className={`border p-2 w-full rounded focus:ring-yellow-500 focus:border-yellow-500  ${errors.nationalId ? 'input-error' : ''}`} />
                {errors.nationalId && <p className="text-error text-xs mt-1">{errors.nationalId.message}</p>}
            </div>
            
            <div className="form-control">
                <input {...register("location")} placeholder="Location *" className={`border p-2 w-full rounded focus:ring-yellow-500 focus:border-yellow-500  ${errors.location ? 'input-error' : ''}`} />
                {errors.location && <p className="text-error text-xs mt-1">{errors.location.message}</p>}
            </div>
            <div className="form-control">
                <input {...register("amountDue")} placeholder="Amount Due (UGX) *" className={`border p-2 w-full rounded focus:ring-yellow-500 focus:border-yellow-500  ${errors.amountDue ? 'input-error' : ''}`} />
                {errors.amountDue && <p className="text-error text-xs mt-1">{errors.amountDue.message}</p>}
            </div>
            
            {/* Due Date field using flex to achieve inline label/input */}
            <div className="form-control md:col-span-2 flex items-center gap-4">
                <label htmlFor="dueDate" className="label pt-0 pb-0 shrink-0 w-28">
                  <span className="label-text text-sm font-medium">Due Date *</span>
                </label>
                
                <div className="flex flex-col w-full"> 
                    <input 
                        {...register("dueDate")} 
                        id="dueDate"
                        type="date" 
                        className={`border p-2 w-full rounded focus:ring-yellow-500 focus:border-yellow-500 ${errors.dueDate ? 'input-error' : ''}`} 
                    />
                    
                    {errors.dueDate && <p className="text-error text-xs mt-1">{errors.dueDate.message}</p>}
                </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="md:col-span-2 mt-4">
              <button type="submit" className="bg-yellow-600 w-full p-2 text-white rounded-lg hover:bg-yellow-700">RECORD CREDIT SALE</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
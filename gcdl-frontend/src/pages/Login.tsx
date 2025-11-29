import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/index";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

type LoginForm = z.infer<typeof schema>;

export default function Login({ setUser }: { setUser: (u: User) => void }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: LoginForm) => {
    // Consolidated Agents into a single 'agent' role for simplicity and coverage of both sales/procurement tasks.
    const users: Record<string, User> = {
      "ceo@gcdl.com": { name: "CEO John", email: "ceo@gcdl.com", role: "ceo" },
      "manager@gcdl.com": { name: "Manager Maganjo", email: "manager@gcdl.com", role: "manager" },
      // Single agent role handles all transaction entry (Sales, Credit Sales, Procurement)
      "agent@gcdl.com": { name: "Agent Sarah", email: "agent@gcdl.com", role: "agent" },
    };

    if (users[data.email] && data.password === "123456") {
      setUser(users[data.email]);
      navigate("/dashboard");
    } else {
      alert("Wrong credentials! Try agent@gcdl.com / 123456");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-yellow-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-center text-4xl font-bold text-gray-800 mb-8">GCDL</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <input
                {...register("email")}
                type="email"
                placeholder="agent@gcdl.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">Valid email required</p>}
            </div>
            <div>
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              LOGIN
            </button>
          </form>
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
            <p className="font-semibold mb-2">Demo Credentials:</p>
            <ul className="space-y-1">
              <li>CEO → ceo@gcdl.com</li>
              <li>Manager → manager@gcdl.com</li>
              <li>Agent (Sales & Procurement) → agent@gcdl.com</li>
              <li>Password → 123456 (For all users)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
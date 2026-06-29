import CustomerProfileCard from "../components/Customers/CustomerProfileCard";
import { useNavigate, useParams } from "react-router-dom";
function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const customers = [
    {
      id: 1,
      name: "Rahul Sharma",
      phone: "9876543210",
      email: "rahul@gmail.com",
      company: "ABC Logistics",
      city: "Jaipur",
    },
    {
      id: 2,
      name: "Amit Verma",
      phone: "9876500000",
      email: "amit@gmail.com",
      company: "XYZ Transport",
      city: "Delhi",
    },
    {
      id: 3,
      name: "Rohit Singh",
      phone: "9876512345",
      email: "rohit@gmail.com",
      company: "Fast Cargo",
      city: "Ajmer",
    }
  ];


  const customer = customers.find(
    (customer) => customer.id === Number(id)

  );
  if (!customer) {
    return (
      <div className="p-10">
        <button
          onClick={() => navigate("/customers")}
          className="mb-6 flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 hover:text-emerald-600 hover:shadow-lg"
        >
          ← Back to Customers
        </button>
        <h1 className="text-3xl font-bold text-red-600">
          Customer Not Found
        </h1>

        <p className="text-slate-500 mt-2">
          This customer does not exist.
        </p>
      </div>
    );
  }


return (
  <div >

    <div className="mb-6">
      <button
        onClick={() => navigate("/customers")}
        className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 border border-slate-200 shadow-sm hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition"
      >
        ← Back to Customers
      </button>
    </div>

    <CustomerProfileCard customer={customer} />

  </div>
);
}

export default CustomerDetails;
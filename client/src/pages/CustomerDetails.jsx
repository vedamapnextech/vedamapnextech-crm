import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddCustomerModal from "../components/Customers/AddCustomerModal";
import CustomerProfileCard from "../components/Customers/CustomerProfileCard";
function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openProductModal, setOpenProductModal] = useState(false);



  const getCustomer = () => {
    fetch(`${import.meta.env.VITE_API_URL}/customers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCustomer(data);
        setSelectedCustomer(data);
      });
  };
  useEffect(() => {
    getCustomer();
  }, [id]);

  if (!customer) {
    return <h1 className="p-10 text-2xl">Loading...</h1>;
  }
  // if (!customer) {
  //   return (
  //     <div className="p-10">
  //       <button
  //         onClick={() => navigate("/customers")}
  //         className="mb-6 flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 hover:text-emerald-600 hover:shadow-lg"
  //       >
  //         ← Back to Customers
  //       </button>
  //       <h1 className="text-3xl font-bold text-red-600">
  //         Customer Not Found
  //       </h1>

  //       <p className="text-slate-500 mt-2">
  //         This customer does not exist.
  //       </p>
  //     </div>
  //   );
  // }


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

      <CustomerProfileCard
        customer={customer}
        setOpenModal={setOpenModal}
        setSelectedCustomer={setSelectedCustomer}
        setOpenProductModal={setOpenProductModal}
      />


      {openModal && (
        <AddCustomerModal
          setOpenModal={setOpenModal}
          customers={[customer]}
          setCustomers={() => { }}
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
          getCustomers={getCustomer}
        />
      )}
      {openProductModal && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

        <div className="bg-white rounded-3xl w-[500px] p-8">

            <h2 className="text-2xl font-bold">
                Add Product
            </h2>

            <p className="text-slate-500 mt-2">
                Product module coming next...
            </p>

            <button
                onClick={() => setOpenProductModal(false)}
                className="mt-6 px-6 py-3 rounded-xl bg-emerald-500 text-white"
            >
                Close
            </button>

        </div>

    </div>
)}


    </div>
  );
}

export default CustomerDetails;
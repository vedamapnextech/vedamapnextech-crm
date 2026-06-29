
import { useNavigate } from "react-router-dom";
import StatCard from "../../components/Dashboard/StatCard";
import AddCustomerModal from "../../components/Customers/AddCustomerModal";
import DeleteCustomerModal from "../../components/Customers/DeleteCustomerModal";
import { useEffect, useState } from "react";
import {
  MdPeople,
  MdCheckCircle,
  MdBuild,
  MdSupportAgent,
} from "react-icons/md";

function Customers() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  // {
  //   id: 1,
  //   name: "Rahul Sharma",
  //   phone: "9876543210",
  //   company: "ABC Logistics",
  //   city: "Jaipur",
  //   email: "rahul@gmail.com",
  //   product: "GPS Tracker",
  //   address: "Vaishali Nagar, Jaipur",
  //   status: "Active",
  // },
  // {
  //   id: 2,
  //   name: "Amit Verma",
  //   phone: "9876500000",
  //   company: "XYZ Transport",
  //   city: "Delhi",
  //   email: "amit@gmail.com",
  //   product: "RFID",
  //   address: "Vaishali Nagar, Delhi",
  //   status: "Pending",

  // },
  // {
  //   id: 3,
  //   name: "Rohit Singh",
  //   phone: "9876512345",
  //   company: "Fast Cargo",
  //   city: "Ajmer",
  //   email: "rohit@gmail.com",
  //   product: "Fuel Sensor",
  //   address: "Vaishali Nagar, Ajmeraipur",
  //   status: "Active",
  // },

  const [search, setSearch] = useState("");
  useEffect(() => {

    fetch("http://localhost:5000/api/customers")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCustomers(data);
      });

  }, []);
  console.log("Customers State:", customers);
  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.company.toLowerCase().includes(search.toLowerCase()) ||
      customer.city.toLowerCase().includes(search.toLowerCase()) ||
      customer.product.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.includes(search)
    );
  });
  return (
    <div className="space-y-10">

      {/* Header */}

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <p className="text-emerald-600 font-semibold tracking-wider uppercase text-sm">
              Customer Management
            </p>

            <h1 className="text-4xl font-bold text-slate-800 mt-2">
              Customers
            </h1>

            <p className="text-slate-500 mt-3 text-lg">
              Manage all customers, installations, follow-ups and support from one place.
            </p>

          </div>

          <div className="flex gap-4">



            <button
              onClick={() => {
                setSelectedCustomer(null);
                setOpenModal(true);
              }}
              className="px-7 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/30 transition-all duration-300"
            >
              + Add Customer
            </button>

          </div>

        </div>

      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8 mb-8">
        <StatCard
          title="Total Customers"
          value="1,254"
          icon={<MdPeople />}
          color="bg-blue-500"
        />

        <StatCard
          title="Active Customers"
          value="1,180"
          icon={<MdCheckCircle />}
          color="bg-emerald-500"
        />

        <StatCard
          title="Installation Due"
          value="23"
          icon={<MdBuild />}
          color="bg-orange-500"
        />

        <StatCard
          title="Open Tickets"
          value="17"
          icon={<MdSupportAgent />}
          color="bg-red-500"
        />

      </div>

      {/* Search */}
      {/* Search & Filters */}

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="🔍 Search customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-400 outline-none"
          />

          <select className="px-5 py-4 rounded-2xl border border-slate-200">

            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>

          </select>

          <select className="px-5 py-4 rounded-2xl border border-slate-200">

            <option>All Cities</option>
            <option>Jaipur</option>
            <option>Delhi</option>

          </select>

          <button
            className="rounded-2xl bg-slate-900 hover:bg-black text-white font-semibold transition"
          >
            Search
          </button>

        </div>

      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50 border-b border-slate-200">

              <tr className="text-left text-slate-500 uppercase text-sm tracking-wider">

                <th className="px-6 py-6">Customer</th>
                <th className="px-6 py-6">Company</th>
                <th className="px-6 py-6">Phone</th>
                <th className="px-6 py-6">City</th>
                <th className="px-6 py-6">Product</th>
                <th className="px-6 py-6">Status</th>
                <th className="px-6 py-6">Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredCustomers.map((customer) => (

                <tr
                  key={customer.id}
                  className="border-t border-slate-200 hover:bg-slate-50 transition-all duration-200"                >

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <img
                        src={`https://ui-avatars.com/api/?name=${customer.name}&background=10B981&color=fff`}
                        alt=""
                        className="w-11 h-11 rounded-full"
                      />

                      <div>

                        <h3 className="font-semibold text-slate-800">
                          {customer.name}
                        </h3>

                        <p className="text-xs text-slate-500">
                          Customer ID #{customer.id}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-5">
                    {customer.company}
                  </td>

                  <td className="px-6 py-5">
                    {customer.phone}
                  </td>

                  <td className="px-6 py-5">
                    {customer.city}
                  </td>

                  <td className="px-6 py-5">
                    {customer.product}
                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${customer.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {customer.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">

                    <div className="flex gap-2">

                      <button onClick={() => navigate(`/customer/${customer.id}`)} className="px-3 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition">
                        View
                      </button>

                      <button onClick={() => {
                        setSelectedCustomer(customer);
                        setOpenModal(true);
                      }} className="px-3 py-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition">

                        Edit
                      </button>
                      <button onClick={() => {
                        setSelectedCustomer(customer);
                        setIsDeleteModalOpen(true);
                      }} className="px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition">
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
      {openModal && (<AddCustomerModal
        setOpenModal={setOpenModal}
        customers={customers}
        setCustomers={setCustomers}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
      />)}
      {isDeleteModalOpen && (
        <DeleteCustomerModal selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          customers={customers}
          setCustomers={setCustomers} />
      )}

    </div>
  );
}

export default Customers;
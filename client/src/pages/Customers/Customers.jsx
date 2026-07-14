
import { useNavigate } from "react-router-dom";
import LeadTable from "../../components/Customers/LeadTable";
import StatCard from "../../components/Dashboard/StatCard";
import AddLeadModal from "../../components/Customers/AddLeadModal";
import DeleteConfirmationModal from "../../components/Common/DeleteConfirmationModal";
import { useEffect, useState } from "react";
import {
  MdPeople,
  MdCheckCircle,
  MdBuild,
  MdSupportAgent,
} from "react-icons/md";

function Customers() {
  const [actualCustomers, setActualCustomers] = useState([]);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [showTodayFollowUps, setShowTodayFollowUps] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [city, setCity] = useState("");

  const getCustomers = (
    searchText = "",
    statusText = "",
    cityText = ""
  ) => {
    console.log(import.meta.env.VITE_API_URL);
    fetch(`${import.meta.env.VITE_API_URL}/leads?search=${searchText}&status=${statusText}&city=${cityText}`)
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data.reverse());
      });

  };


  const getActualCustomers = () => {

    fetch(`${import.meta.env.VITE_API_URL}/customers`)
      .then((res) => res.json())
      .then((data) => {

        setActualCustomers(data);

      });

  };

  const handleDeleteCustomer = async () => {

    if (!selectedCustomer) return;

    try {

      const response = await fetch(

        `${import.meta.env.VITE_API_URL}/leads/${selectedCustomer._id}`,

        {

          method: "DELETE",

        }

      );

      const data = await response.json();

      if (!response.ok) {

        throw new Error(data.message);

      }

      getCustomers();

      setIsDeleteModalOpen(false);

      setSelectedCustomer(null);

    } catch (error) {

      console.log(error);

    }

  };






  useEffect(() => {

    getCustomers();
    getActualCustomers();

  }, []);
  console.log("Customers State:", customers);




  const newLeads = customers.filter(
    (customer) => customer.status === "New"
  );

  const followUpLeads = customers.filter(
    (customer) => customer.status === "Follow-up"
  );

  const qualifiedLeads = customers.filter(
    (customer) => customer.status === "Qualified"
  );

  const convertedLeads = customers.filter(
    (customer) => customer.status === "Converted"
  );

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const todayFollowUps = customers.filter((customer) => {



    if (!customer.followUpDate) return false;

    const followUp = new Date(customer.followUpDate);

    followUp.setHours(0, 0, 0, 0);

    return followUp.getTime() === today.getTime();

  });

  const displayedCustomers = showTodayFollowUps
    ? todayFollowUps
    : customers;

  const cities = [...new Set(customers.map((lead) => lead.city))]
    .filter(Boolean)
    .sort();

  return (
    <div className="space-y-10">

      {/* Header */}

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <p className="text-emerald-600 font-semibold tracking-wider uppercase text-sm">
              Lead Management
            </p>

            <h1 className="text-4xl font-bold text-slate-800 mt-2">
              Leads
            </h1>

            <p className="text-slate-500 mt-3 text-lg">
              Manage leads, follow-ups, quotations and convert qualified leads into customers.
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
              + Add Lead
            </button>

          </div>

        </div>

      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8 mb-8">
        <StatCard
          title="Total Leads"
          value={customers.length}
          icon={<MdPeople />}
          color="bg-blue-500"
        />

        <StatCard
          title="Qualified Leads"
          value={qualifiedLeads.length}
          icon={<MdCheckCircle />}
          color="bg-emerald-500"
        />

        <div
          className="cursor-pointer"
          onClick={() => navigate("/customers-list")}
        >
          <StatCard
            title="Customer"
            value={actualCustomers.length}
            icon={<MdBuild />}
            color="bg-orange-500"
          />
        </div>

        <div
          className="cursor-pointer"
          onClick={() => {

            setShowTodayFollowUps(true);
          }}
        >
          <StatCard
            title="Today's Follow-ups"
            value={todayFollowUps.length}
            icon={<MdSupportAgent />}
            color="bg-red-500"
          />
        </div>
      </div>

      {/* Search */}
      {/* Search & Filters */}

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="🔍 Search lead..."
            value={search}
            onChange={(e) => {

              setSearch(e.target.value);

              getCustomers(e.target.value, status, city);
            }}
            className="px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-400 outline-none"
          />

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              getCustomers(search, e.target.value, city);
            }}
            className="px-5 py-4 rounded-2xl border border-slate-200"
          >
            <option value="">All Status</option>
            <option value="New">New</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Qualified">Qualified</option>
            <option value="Converted">Converted</option>
            <option value="Lost">Lost</option>
          </select>

          <select
            value={city}
            onChange={(e) => {

              setCity(e.target.value);

              getCustomers(search, status, e.target.value);

            }}
            className="px-5 py-4 rounded-2xl border border-slate-200"
          >

            <option value="">All Cities</option>

            {cities.map((cityName) => (
              <option key={cityName} value={cityName}>
                {cityName}
              </option>
            ))}

          </select>



        </div>

      </div>

      <div className="mt-6 flex items-center justify-between">

        <h2 className="text-lg font-bold text-slate-700">

          Showing {displayedCustomers.length} Leads
        </h2>

        {(search || status || city || showTodayFollowUps) && (

          <button

            onClick={() => {

              setSearch("");

              setStatus("");

              setCity("");

              setShowTodayFollowUps(false);

              getCustomers("", "", "");

            }}

            className="rounded-xl bg-slate-200 px-5 py-2 font-semibold hover:bg-slate-300"

          >

            Clear Filters

          </button>

        )}

      </div>


      <LeadTable
        customers={displayedCustomers}
        setSelectedCustomer={setSelectedCustomer}
        setOpenModal={setOpenModal}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />


      {openModal && (
        <AddLeadModal
          setOpenModal={setOpenModal}
          customers={customers}
          setCustomers={setCustomers}
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
          getCustomers={getCustomers}
        />)}
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        title="Delete Lead"
        message={`Are you sure you want to delete "${selectedCustomer?.name}"? This action cannot be undone.`}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedCustomer(null);
        }}
        onDelete={handleDeleteCustomer}
      />

    </div>
  );
}

export default Customers;
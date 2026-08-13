import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import SupportTable from "../../components/Support/SupportTable";
import AddSupportModal from "../../components/Support/AddSupportModal";
import DeleteConfirmationModal from "../../components/Common/DeleteConfirmationModal";

function Support() {
  const [openModal, setOpenModal] = useState(false);
  const [supports, setSupports] = useState([]);
  const [selectedSupport, setSelectedSupport] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);


  const openTickets = supports.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const inProgressTickets = supports.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const resolvedTickets = supports.filter(
    (ticket) => ticket.status === "Closed"
  ).length;

  const highPriorityTickets = supports.filter(
    (ticket) => ticket.priority === "High"
  ).length;

  const [customers, setCustomers] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");



  const getSupports = async () => {

    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/supports`
      );

      const data = await response.json();

      setSupports(data);

    } catch (error) {

      console.log(error);

    }

  };




  const getCustomers = async () => {

    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/customers`
      );

      const data = await response.json();

      setCustomers(data);

    } catch (error) {

      console.log(error);

    }

  };



  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
  };


  const deleteSupport = async () => {

    try {

      await fetch(
        `${import.meta.env.VITE_API_URL}/api/supports/${selectedSupport._id}`,
        {
          method: "DELETE",
        }
      );

      toast.success("Support Ticket Deleted Successfully.");

      getSupports();

      setOpenDeleteModal(false);

      setSelectedSupport(null);

    } catch (error) {

      console.log(error);

      toast.error("Something went wrong.");

    }

  };



  const filteredSupports = supports.filter((support) => {

    const matchSearch =
      support.subject?.toLowerCase().includes(search.toLowerCase()) ||
      support.customer?.name?.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" || support.status === statusFilter;

    const matchPriority =
      priorityFilter === "All" || support.priority === priorityFilter;

    return matchSearch && matchStatus && matchPriority;

  });




  useEffect(() => {

    getSupports();

    getCustomers();

  }, []);

  return (
    <div className="space-y-8">

      {/* Hero Section */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 p-8 shadow-xl">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.35em] text-emerald-100">
              Support Management
            </p>

            <h1 className="mt-2 text-5xl font-black text-white">
              Support Tickets
            </h1>

            <p className="mt-3 text-emerald-100">
              Track customer complaints, engineer visits and service requests.
            </p>

          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="rounded-2xl bg-white px-6 py-3 font-bold text-emerald-600 shadow-lg transition-all duration-300 hover:scale-105"
          >
            + Add Ticket
          </button>

        </div>

      </div>

      {/* Stats Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div
          className="
      group
      rounded-3xl
      bg-white
      p-6
      shadow-lg
      border border-slate-200
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-2xl
      hover:border-red-400
      cursor-pointer
    "
        >
          <p className="text-slate-500 font-medium">
            Open Tickets
          </p>

          <h2 className="mt-3 text-5xl font-black text-red-500 transition-transform duration-300 group-hover:scale-110">
            {openTickets}
          </h2>

          <div className="mt-4 h-2 rounded-full bg-red-100 overflow-hidden">
            <div className="h-full w-3/4 rounded-full bg-red-500 transition-all duration-500 group-hover:w-full"></div>
          </div>
        </div>

        <div
          className="
      group
      rounded-3xl
       bg-white
      p-6
      shadow-lg
      border border-slate-200
      transition-all
      duration-300hover:-translate-y-2
      hover:shadow-2xl
      hover:border-yellow-400
      cursor-pointer
    "
        >
          <p className="text-slate-500 font-medium">
            In Progress
          </p>

          <h2 className="mt-3 text-5xl font-black text-yellow-500 transition-transform duration-300 group-hover:scale-110">
            {inProgressTickets}
          </h2>

          <div className="mt-4 h-2 rounded-full bg-yellow-100 overflow-hidden">
            <div className="h-full w-2/3 rounded-full bg-yellow-500 transition-all duration-500 group-hover:w-full"></div>
          </div>
        </div>

        <div
          className="
      group
      rounded-3xl
      bg-white
      p-6
      shadow-lg
      border border-slate-200
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-2xl
      hover:border-emerald-400
      cursor-pointer
    "
        >
          <p className="text-slate-500 font-medium">
            Resolved
          </p>

          <h2 className="mt-3 text-5xl font-black text-emerald-500 transition-transform duration-300 group-hover:scale-110">
            {resolvedTickets}
          </h2>

          <div className="mt-4 h-2 rounded-full bg-emerald-100 overflow-hidden">
            <div className="h-full w-4/5 rounded-full bg-emerald-500 transition-all duration-500 group-hover:w-full"></div>
          </div>
        </div>

        <div
          className="
      group
      rounded-3xl
      bg-white
      p-6
      shadow-lg
      border border-slate-200
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-2xl
      hover:border-orange-400
      cursor-pointer
    "
        >
          <p className="text-slate-500 font-medium">
            High Priority
          </p>

          <h2 className="mt-3 text-5xl font-black text-orange-500 transition-transform duration-300 group-hover:scale-110">
            {highPriorityTickets}
          </h2>

          <div className="mt-4 h-2 rounded-full bg-orange-100 overflow-hidden">
            <div className="h-full w-1/2 rounded-full bg-orange-500 transition-all duration-500 group-hover:w-full"></div>
          </div>
        </div>

      </div>


      {/* Search & Filters */}

      <div className="rounded-3xl bg-white p-6 shadow-lg">

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Search */}

          <input
            type="text"
            placeholder="🔍 Search Customer, Ticket..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 p-4 outline-none focus:border-emerald-500"
          />

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 p-4 outline-none focus:border-emerald-500"
          >
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>

          {/* Priority */}

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 p-4 outline-none focus:border-emerald-500"
          >
            <option value="All">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <button
            onClick={clearFilters}
            className="rounded-2xl border border-red-300 bg-red-50 px-6 py-4 font-semibold text-red-600 transition-all duration-300 hover:bg-red-500 hover:text-white"
          >
            Clear Filters
          </button>

        </div>

      </div>


      <SupportTable
        supports={filteredSupports}
        setOpenModal={setOpenModal}
        setSelectedSupport={setSelectedSupport}
        setOpenDeleteModal={setOpenDeleteModal}
      />






      {/* Modal */}

      {openModal && (
        <AddSupportModal
          setOpenModal={setOpenModal}
          getSupports={getSupports}
          customers={customers}
          selectedSupport={selectedSupport}
          setSelectedSupport={setSelectedSupport}
        />
      )}

      <DeleteConfirmationModal
        open={openDeleteModal}
        title="Delete Support Ticket"
        message={`Are you sure you want to delete "${selectedSupport?.subject}" ?`}
        onClose={() => {
          setOpenDeleteModal(false);
          setSelectedSupport(null);
        }}
        onDelete={deleteSupport}
      />

    </div>
  );
}

export default Support;
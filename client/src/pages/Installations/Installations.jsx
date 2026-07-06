import { useEffect, useState } from "react";
import Select from "react-select";
import InstallationStats from "../../components/Installations/InstallationStats";
import InstallationTable from "../../components/Installations/InstallationTable";
import AddInstallationModal from "../../components/Installations/AddInstallationModal";
import DeleteConfirmationModal from "../../components/Common/DeleteConfirmationModal";

function Installations() {

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [installations, setInstallations] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedInstallation, setSelectedInstallation] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [customerFilter, setCustomerFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [search, setSearch] = useState("");
  const totalInstallations = installations.length;

  const pendingInstallations = installations.filter(
    (i) => i.status === "Pending"
  ).length;

  const completedInstallations = installations.filter(
    (i) => i.status === "Completed"
  ).length;

  const cancelledInstallations = installations.filter(
    (i) => i.status === "Cancelled"
  ).length;

  // ================= Installations =================

  const getInstallations = () => {

    fetch(`${import.meta.env.VITE_API_URL}/installations`)
      .then((res) => res.json())
      .then((data) => {

        console.log("Installations :", data);

        setInstallations(data);

      });

  };




  const handleDelete = async () => {

    try {

      await fetch(

        `${import.meta.env.VITE_API_URL}/installations/${selectedInstallation._id}`,

        {

          method: "DELETE",

        }

      );

      getInstallations();

      setOpenDeleteModal(false);

      setSelectedInstallation(null);

    }

    catch (error) {

      console.log(error);

    }

  };



  // ================= Customers =================

  const getCustomers = () => {

    fetch(`${import.meta.env.VITE_API_URL}/customers`)
      .then((res) => res.json())
      .then((data) => {

        console.log("Customers :", data);

        setCustomers(data);

      });

  };

  // ================= Products =================

  const getProducts = () => {

    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {

        console.log("Products :", data);

        setProducts(data);

      });

  };

  useEffect(() => {

    getInstallations();

    getCustomers();

    getProducts();

  }, []);

  const filteredInstallations = installations.filter((installation) => {

    const searchText = search.toLowerCase();

    const matchSearch =

      installation.customer?.name?.toLowerCase().includes(searchText) ||

      installation.product?.name?.toLowerCase().includes(searchText) ||

      installation.engineer?.toLowerCase().includes(searchText) ||

      installation.location?.toLowerCase().includes(searchText);

    const matchCustomer =

      customerFilter === "" ||

      installation.customer?.name === customerFilter;


    const matchStatus =

      statusFilter === "" ||

      installation.status === statusFilter;

    return matchSearch && matchCustomer && matchStatus;
  });
  return (

    <div className="p-8 bg-slate-50 min-h-screen">

      {/* Header */}

      <div className="mb-10 flex items-center justify-between">

        <div>

          <p className="uppercase tracking-[5px] text-sm font-bold text-emerald-600">
            Installation Management
          </p>

          <h1 className="mt-2 text-5xl font-extrabold text-slate-800">
            Installations
          </h1>

          <p className="mt-3 text-lg text-slate-500">
            Manage all customer installations, engineers and installation status.
          </p>

        </div>

        <button
          onClick={() => {
            setSelectedInstallation(null);
            setOpenModal(true);
          }}
          className="
        rounded-2xl
        bg-gradient-to-r
        from-emerald-500
        to-green-600
        px-8
        py-4
        font-bold
        text-white
        shadow-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:scale-105
    "
        >
          + Add Installation
        </button>

      </div>

      {/* Stats */}


      <InstallationStats
        totalInstallations={totalInstallations}
        pendingInstallations={pendingInstallations}
        completedInstallations={completedInstallations}
        cancelledInstallations={cancelledInstallations}
      />


      {/* Search & Filters */}

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">

        <div className="grid gap-5 lg:grid-cols-3">

          <input
            type="text"
            placeholder="🔍 Search Customer, Product, Engineer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
        rounded-2xl
        border
        border-slate-300
        px-5
        py-4
        outline-none
        transition
        focus:border-emerald-500
    "
          />

          <Select
            options={[
              {
                value: "",
                label: "All Customers",
              },
              ...customers.map((customer) => ({
                value: customer.name,
                label: customer.name,
              })),
            ]}
            value={
              [
                {
                  value: "",
                  label: "All Customers",
                },
                ...customers.map((customer) => ({
                  value: customer.name,
                  label: customer.name,
                })),
              ].find((option) => option.value === customerFilter)
            }
            onChange={(selectedOption) =>
              setCustomerFilter(selectedOption?.value || "")
            }
            placeholder="All Customers"
            isSearchable
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="
        rounded-2xl
        border
        border-slate-300
        px-5
    "
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

        </div>

      </div>



      <div className="mt-6 flex items-center justify-between">

        <h2 className="text-lg font-bold text-slate-700">

          Showing {filteredInstallations.length} of {installations.length} Installations

        </h2>

        {(search || customerFilter || statusFilter) && (

          <button
            onClick={() => {

              setSearch("");

              setCustomerFilter("");

              setStatusFilter("");

            }}
            className="
                rounded-xl
                bg-slate-200
                px-5
                py-2
                font-semibold
                hover:bg-slate-300
                duration-300
            "
          >
            Clear Filters
          </button>

        )}

      </div>



      <InstallationTable
        installations={filteredInstallations}
        setOpenModal={setOpenModal}
        setSelectedInstallation={setSelectedInstallation}
        setOpenDeleteModal={setOpenDeleteModal}
      />
      {openModal && (
        <AddInstallationModal
          setOpenModal={setOpenModal}
          customers={customers}
          products={products}
          getInstallations={getInstallations}
          selectedInstallation={selectedInstallation}
        />
      )}

      <DeleteConfirmationModal
        open={openDeleteModal}
        title="Delete Installation?"
        message={`Are you sure you want to delete this installation for "${selectedInstallation?.customer?.name}"?`}
        onClose={() => {

          setOpenDeleteModal(false);

          setSelectedInstallation(null);

        }}
        onDelete={handleDelete}
      />


    </div>

  );
}

export default Installations;
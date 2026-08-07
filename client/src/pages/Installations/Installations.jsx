import { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import toast from "react-hot-toast";
import Select from "react-select";
import InstallationStats from "../../components/Installations/InstallationStats";
import InstallationTable from "../../components/Installations/InstallationTable";
import AddInstallationModal from "../../components/Installations/AddInstallationModal";
import DeleteConfirmationModal from "../../components/Common/DeleteConfirmationModal";
import exportInstallationsExcel from "../../utils/exportInstallationsExcel";

function Installations() {

  const [customers, setCustomers] = useState([]);
  const [dealerCustomers, setDealerCustomers] = useState([]);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [wbFilter, setWbFilter] = useState("ALL");
  const [products, setProducts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [installations, setInstallations] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedInstallation, setSelectedInstallation] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [customerFilter, setCustomerFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
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

    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_URL}/api/installations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {

        console.log("Installations :", data);

        setInstallations(data);

      });

  };




  const handleDelete = async () => {
    if (!selectedInstallation) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/installations/${selectedInstallation._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to delete installation");
        return;
      }

      toast.success("Installation deleted successfully");

      getInstallations();

      setOpenDeleteModal(false);
      setSelectedInstallation(null);

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };



  // ================= Customers =================

  const getCustomers = () => {

    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_URL}/api/customers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {

        console.log("Customers :", data);

        setCustomers(Array.isArray(data) ? data : []);

      });

  };


  // ================= Dealer Customers =================

  const getDealerCustomers = () => {

    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_URL}/api/dealer-customers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {

        console.log("Dealer Customers :", data);

        setDealerCustomers(Array.isArray(data) ? data : []);

      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to load dealer customers");
      });

  };
  // ================= Products =================

  const getProducts = () => {

    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_URL}/api/leads`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {

        console.log("Products :", data);

        setProducts(data);

      });

  };


  const getEmployees = () => {

    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_URL}/api/employees`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {

        console.log("Employees :", data);

        setEmployees(data);

      });

  };

  useEffect(() => {

    getInstallations();

    getCustomers();

    getDealerCustomers();

    getProducts();

    getEmployees();

  }, []);

  const filteredInstallations = installations.filter((installation) => {

    const searchText = search.toLowerCase();

    const matchSearch =

      installation.customer?.name?.toLowerCase().includes(searchText) ||

      installation.product?.name?.toLowerCase().includes(searchText) ||

      installation.engineer?.toLowerCase().includes(searchText) ||

      installation.location?.toLowerCase().includes(searchText) ||

      installation.siteName?.toLowerCase().includes(searchText) ||

      installation.wbCode?.toLowerCase().includes(searchText);


    const matchCustomer =

      customerFilter === "" ||

      installation.customer?.name === customerFilter;


    const matchStatus =
      statusFilter === "All"
        ? true
        : installation.status === statusFilter;

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

        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />


      {/* Search & Filters */}
      <div className="mt-6 flex items-center justify-between">

        <h2 className="text-lg font-bold text-slate-700">
          Showing {filteredInstallations.length} of {installations.length} Installations
        </h2>

        <div className="flex items-center gap-3 relative">

          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="rounded-2xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 transition"
          >
            Export Excel
          </button>

          {showExportMenu && (
            <div className="absolute right-0 top-14 w-64 rounded-2xl border border-slate-200 bg-white shadow-2xl z-50 overflow-hidden">

              <button
                onClick={() => {
                  exportInstallationsExcel(filteredInstallations);
                  setShowExportMenu(false);
                }}
                className="w-full px-5 py-3 text-left hover:bg-emerald-50"
              >
                📄 All Installations
              </button>

              {[...new Set(installations.map((i) => i.wbCode))].map((wb) => (

                <button
                  key={wb}
                  onClick={() => {
                    exportInstallationsExcel(
                      filteredInstallations.filter(
                        (i) => i.wbCode === wb
                      )
                    );

                    setShowExportMenu(false);
                  }}
                  className="w-full px-5 py-3 text-left hover:bg-emerald-50"
                >
                  📦 {wb}
                </button>

              ))}

            </div>
          )}

          {(search || customerFilter || statusFilter !== "All") && (

            <button
              onClick={() => {
                setSearch("");
                setCustomerFilter("");
                setStatusFilter("All");
              }}
              className="rounded-2xl bg-slate-200 px-6 py-3 font-semibold hover:bg-slate-300 transition"
            >
              Clear Filters
            </button>

          )}

        </div>

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
          dealerCustomers={dealerCustomers}
          products={products}
          employees={employees}
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
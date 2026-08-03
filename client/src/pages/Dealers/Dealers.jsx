import React, { useEffect, useState } from "react";
import AddDealerModal from "../../components/Dealers/AddDealerModal";
import DeleteConfirmationModal from "../../components/Common/DeleteConfirmationModal";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DealerDetailsModal from "../../components/Dealers/DealerDetailsModal";
import DealerCustomerTable from "../../components/Dealers/DealerCustomerTable";
import AddDealerCustomerModal from "../../components/Dealers/AddDealerCustomerModal";
import exportDealerCustomersExcel from "../../utils/exportDealerCustomersExcel";
function Dealers() {
    const [dealers, setDealers] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");
    const [search, setSearch] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [selectedDealer, setSelectedDealer] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [openCustomerModal, setOpenCustomerModal] = useState(false);
    const [dealerFilter, setDealerFilter] = useState("");
    const navigate = useNavigate();

    const getDealers = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/dealers`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();
            setDealers(data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteDealer = async (id) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/dealers/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || "Failed to delete dealer");
                return;
            }

            toast.success("Dealer deleted successfully");

            setOpenDetails(false);

            getDealers();

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const deleteDealerCustomer = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/dealer-customers/${selectedCustomer._id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || "Failed to delete customer");
                return;
            }

            toast.success("Dealer Customer deleted successfully");

            setIsDeleteModalOpen(false);
            setSelectedCustomer(null);

            getAllCustomers();

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const getCustomers = async (dealerId) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/dealer-customers/${dealerId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            setCustomers(Array.isArray(data) ? data : []);

        } catch (error) {
            console.log(error);
        }
    };
    const filteredCustomers = customers.filter((customer) => {

        const matchesSearch =
            customer.name?.toLowerCase().includes(search.toLowerCase()) ||
            customer.company?.toLowerCase().includes(search.toLowerCase()) ||
            customer.wbCode?.toLowerCase().includes(search.toLowerCase()) ||
            customer.phone?.includes(search);

        const matchesStatus =
            statusFilter === "" || customer.status === statusFilter;

        return matchesSearch && matchesStatus;
    });
    const getAllCustomers = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/dealer-customers`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            setCustomers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getDealers();
        getAllCustomers();
    }, []);


    return (
        <div className="p-6">

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Dealers</h1>
                    <p className="text-gray-500 mt-1">
                        Total Dealers : {dealers.length}
                    </p>
                </div>

                <button
                    onClick={() => {
                        setSelectedDealer(null);
                        setOpenModal(true);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl font-semibold"
                >
                    + Add Dealer
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {dealers.map((dealer) => (
                    <div
                        key={dealer._id}
                        onClick={() => {
                            setSelectedDealer(dealer);
                            setOpenDetails(true);
                        }}
                        className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer p-5"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">
                                    {dealer.name
                                        ?.split(" ")
                                        .map(
                                            (word) =>
                                                word.charAt(0).toUpperCase() +
                                                word.slice(1).toLowerCase()
                                        )
                                        .join(" ")}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    {dealer.city}
                                </p>
                            </div>
                        </div>

                        <div className="border-t pt-3">
                            <p className="text-gray-600 font-medium">
                                📞 {dealer.phone}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">




                <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                                Dealer Customer Management
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-slate-800">
                                Dealer Customers
                            </h2>

                            <p className="mt-2 text-slate-500">
                                Manage all customers of the selected dealer.
                            </p>
                        </div>

                        <button
                            onClick={() => {
                                setSelectedCustomer(null);
                                setSelectedDealer(null);
                                setOpenCustomerModal(true);
                            }}
                            className="rounded-2xl bg-emerald-500 px-7 py-3 font-semibold text-white hover:bg-emerald-600"
                        >
                            + Add Customer
                        </button>
                    </div>

                </div>

                <div className="mt-6 mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        <input
                            type="text"
                            placeholder="🔍 Search Customer..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-emerald-500"
                        />

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="rounded-2xl border border-slate-200 px-5 py-4"
                        >
                            <option value="">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>

                        <select
                            value={dealerFilter}
                            onChange={(e) => {
                                const value = e.target.value;

                                setDealerFilter(value);

                                if (value === "") {
                                    getAllCustomers();
                                } else {
                                    getCustomers(value);
                                }
                            }}
                            className="rounded-2xl border border-slate-200 px-5 py-4"
                        >
                            <option value="">All Dealers</option>

                            {dealers.map((dealer) => (
                                <option key={dealer._id} value={dealer._id}>
                                    {dealer.name}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={() => {
                                setSearch("");
                                setStatusFilter("");
                                setDealerFilter("");
                                getAllCustomers();
                            }}
                            className="rounded-2xl bg-slate-200 px-5 py-4 font-semibold hover:bg-slate-300"
                        >
                            Clear Filters
                        </button>

                        <button
                            onClick={() => {

                                const dealerName =
                                    dealerFilter === ""
                                        ? "All Dealers"
                                        : dealers.find((d) => d._id === dealerFilter)?.name || "Dealer";

                                exportDealerCustomersExcel(
                                    filteredCustomers,
                                    dealerName
                                );

                            }}
                            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg active:scale-95"
                        >
                            <span className="text-lg">📥</span>

                            <span>Download Excel</span>
                        </button>
                    </div>

                </div>

            </div>


            <DealerCustomerTable
                customers={filteredCustomers}
                setSelectedCustomer={setSelectedCustomer}
                setOpenModal={setOpenCustomerModal}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
            />



            <AddDealerModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                getDealers={getDealers}
                selectedDealer={selectedDealer}
            />

            {openCustomerModal && (
                <AddDealerCustomerModal
                    dealerId={selectedDealer?._id}
                    setOpenModal={setOpenCustomerModal}
                    selectedCustomer={selectedCustomer}
                    setSelectedCustomer={setSelectedCustomer}
                    getCustomers={getCustomers}
                    getAllCustomers={getAllCustomers}
                />
            )}

            <DealerDetailsModal
                open={openDetails}
                dealer={selectedDealer}
                onClose={() => setOpenDetails(false)}
                onDelete={deleteDealer}
                onEdit={() => {
                    setOpenDetails(false);
                    setOpenModal(true);
                }}
            />

            <DeleteConfirmationModal
                open={isDeleteModalOpen}
                title="Delete Dealer Customer"
                message="Are you sure you want to delete this customer?"
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={deleteDealerCustomer}
            />

        </div>
    );
}

export default Dealers;
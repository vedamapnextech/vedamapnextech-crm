import { useEffect, useState } from "react";
import exportCustomersExcel from "../../utils/exportCustomersExcel";
import ExportCustomersModal from "../../components/Customers/ExportCustomersModal";

import CustomerTable from "../../components/Customers/CustomerTable";
import AddCustomerModal from "../../components/Customers/AddCustomerModal";
import DeleteConfirmationModal from "../../components/Common/DeleteConfirmationModal";
import StatCard from "../../components/Dashboard/StatCard";
import { useNavigate } from "react-router-dom";
import {
    MdPeople,
    MdEngineering,
    MdBuild,
    MdSupportAgent,
} from "react-icons/md";

function CustomersList() {

    const [search, setSearch] = useState("");
    const [openExportModal, setOpenExportModal] = useState(false);
    const [status, setStatus] = useState("");
    const [city, setCity] = useState("");
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const getCustomers = (
        searchText = "",
        statusText = "",
        cityText = ""
    ) => {

        fetch(
            `${import.meta.env.VITE_API_URL}/customers?search=${searchText}&status=${statusText}&city=${cityText}`
        )
            .then((res) => res.json())
            .then((data) => {

                setCustomers(data);

            });

    };



    const handleDeleteCustomer = async () => {

        if (!selectedCustomer) return;

        try {

            const response = await fetch(

                `${import.meta.env.VITE_API_URL}/customers/${selectedCustomer._id}`,

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

    }, []);



    const activeCustomers = customers.filter(
        (customer) => customer.status === "Active"
    );

    const inactiveCustomers = customers.filter(
        (customer) => customer.status === "Inactive"
    );

    const cities = [...new Set(customers.map((customer) => customer.city))]
        .filter(Boolean)
        .sort();

    return (



        <div className="space-y-8">
            <div className="mb-6">

                <button
                    onClick={() => navigate("/customers")}
                    className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white"
                >
                    ← Back To Leads
                </button>

            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

                <div className="flex items-center justify-between">

                    <div>

                        <p className="uppercase text-sm font-semibold tracking-wider text-emerald-600">
                            Customer Management
                        </p>

                        <h1 className="mt-2 text-4xl font-bold">
                            Customers
                        </h1>

                        <p className="mt-3 text-slate-500">
                            Manage all converted customers from one place.
                        </p>

                    </div>

                    <div className="flex items-center gap-4">

                        <button
                            onClick={() => setOpenExportModal(true)}
                            className="rounded-2xl border border-emerald-500 bg-white px-7 py-3 font-semibold text-emerald-600 transition hover:bg-emerald-500 hover:text-white"
                        >
                            📥 Download Excel
                        </button>

                        <button
                            onClick={() => {

                                setSelectedCustomer(null);

                                setOpenModal(true);

                            }}
                            className="rounded-2xl bg-emerald-500 px-7 py-3 font-semibold text-white"
                        >
                            + Add Customer
                        </button>

                    </div>

                </div>

            </div>

            <div className="grid gap-6 xl:grid-cols-4 sm:grid-cols-2">

                <StatCard
                    title="Total Customers"
                    value={customers.length}
                    icon={<MdPeople />}
                    color="bg-blue-500"
                />

                <StatCard
                    title="Active Customers"
                    value={activeCustomers.length}
                    icon={<MdEngineering />}
                    color="bg-emerald-500"
                />

                <StatCard
                    title="Installations"
                    value="0"
                    icon={<MdBuild />}
                    color="bg-orange-500"
                />

                <StatCard
                    title="Support"
                    value="0"
                    icon={<MdSupportAgent />}
                    color="bg-red-500"
                />

            </div>



            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                    {/* Search */}

                    <input
                        type="text"
                        placeholder="🔍 Search WB Code, Name, Company..."
                        value={search}
                        onChange={(e) => {

                            setSearch(e.target.value);

                            getCustomers(
                                e.target.value,
                                status,
                                city
                            );

                        }}
                        className="rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-emerald-500"
                    />

                    {/* Status */}

                    <select
                        value={status}
                        onChange={(e) => {

                            setStatus(e.target.value);

                            getCustomers(
                                search,
                                e.target.value,
                                city
                            );

                        }}
                        className="rounded-2xl border border-slate-200 px-5 py-4"
                    >

                        <option value="">All Status</option>

                        <option value="Active">
                            Active
                        </option>

                        <option value="Inactive">
                            Inactive
                        </option>

                    </select>

                    {/* City */}

                    <select
                        value={city}
                        onChange={(e) => {

                            setCity(e.target.value);

                            getCustomers(
                                search,
                                status,
                                e.target.value
                            );

                        }}
                        className="rounded-2xl border border-slate-200 px-5 py-4"
                    >

                        <option value="">
                            All Cities
                        </option>

                        {cities.map((cityName) => (

                            <option
                                key={cityName}
                                value={cityName}
                            >
                                {cityName}
                            </option>

                        ))}

                    </select>

                    {/* Clear */}

                    <button
                        onClick={() => {

                            setSearch("");

                            setStatus("");

                            setCity("");

                            getCustomers();

                        }}
                        className="rounded-2xl bg-slate-200 px-5 py-4 font-semibold transition hover:bg-slate-300"
                    >

                        Clear Filters

                    </button>

                </div>

            </div>



            <CustomerTable
                customers={customers}
                setSelectedCustomer={setSelectedCustomer}
                setOpenModal={setOpenModal}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
            />

            {openModal && (

                <AddCustomerModal
                    setOpenModal={setOpenModal}
                    customers={customers}
                    setCustomers={setCustomers}
                    selectedCustomer={selectedCustomer}
                    setSelectedCustomer={setSelectedCustomer}
                    getCustomers={getCustomers}
                />

            )}
            
            <ExportCustomersModal
                open={openExportModal}
                onClose={() => setOpenExportModal(false)}
                customers={customers}
            />

            <DeleteConfirmationModal
                open={isDeleteModalOpen}
                title="Delete Customer"
                message={`Are you sure you want to delete "${selectedCustomer?.name}"?`}
                onClose={() => {

                    setIsDeleteModalOpen(false);

                    setSelectedCustomer(null);

                }}
                onDelete={handleDeleteCustomer}
            />

        </div>

    );

}

export default CustomersList;
import { useNavigate } from "react-router-dom";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

function DealerCustomerTable({
    customers,
    setSelectedCustomer,
    setOpenModal,
    setIsDeleteModalOpen,
}) {
    const navigate = useNavigate();

    return (
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-gradient-to-r from-slate-50 to-emerald-50">

                        <tr className="border-b border-slate-200 text-left text-sm font-semibold uppercase tracking-wider text-slate-500">

                            <th className="px-6 py-5">WB Code</th>

                            <th className="px-6 py-5">Customer</th>

                            <th className="px-8 py-5">Dealer</th>

                            <th className="px-6 py-5">Company</th>

                            <th className="px-6 py-5">Phone</th>

                            <th className="px-6 py-5">City</th>

                            <th className="px-6 py-5">GST No.</th>

                            <th className="px-6 py-5">Status</th>

                            <th className="px-6 py-5 text-center">Action</th>

                        </tr>

                    </thead>

                    <tbody>
                        {customers.length > 0 ? (
                            customers.map((customer) => (
                                <tr
                                    key={customer._id}
                                    className="border-b border-slate-100 transition-all duration-300 hover:bg-emerald-50"
                                >
                                    <td className="px-6 py-5">
                                        <span className="rounded-lg bg-emerald-100 px-3 py-1 font-bold text-emerald-700">
                                            {customer.wbCode || "-"}
                                        </span>
                                    </td>

                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">


                                            <div>
                                                <h3 className="font-semibold text-slate-800">
                                                    {customer.name}
                                                </h3>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Dealer */}
                                    <td className="px-8 py-5 min-w-[220px]">
                                        <span className="inline-flex whitespace-nowrap rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold text-blue-700">
                                            {customer.dealerName || customer.dealer?.name || "-"}
                                        </span>
                                    </td>

                                    <td className="px-6 py-5">
                                        {customer.company || "-"}
                                    </td>

                                    <td className="px-6 py-5">
                                        {customer.phone}
                                    </td>

                                    <td className="px-6 py-5">
                                        {customer.city || "-"}
                                    </td>

                                    <td className="px-6 py-5">
                                        {customer.gstNumber || "-"}
                                    </td>

                                    <td className="px-6 py-5">
                                        <span
                                            className={`rounded-full px-4 py-2 text-sm font-semibold ${customer.status === "Active"
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {customer.status}
                                        </span>
                                    </td>

                                    <td className="px-6 py-5">
                                        <div className="flex justify-center gap-3">
                                            <button
                                                onClick={() => navigate(`/dealer/${customer._id}/customers`)}
                                                className="rounded-xl bg-blue-100 p-3 text-blue-600 transition-all duration-300 hover:scale-110 hover:bg-blue-600 hover:text-white"
                                            >
                                                <FiEye />
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setSelectedCustomer(customer);
                                                    setOpenModal(true);
                                                }}
                                                className="rounded-xl bg-emerald-100 p-3 text-emerald-600 transition-all duration-300 hover:scale-110 hover:bg-emerald-600 hover:text-white"
                                            >
                                                <FiEdit2 />
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setSelectedCustomer(customer);
                                                    setIsDeleteModalOpen(true);
                                                }}
                                                className="rounded-xl bg-red-100 p-3 text-red-600 transition-all duration-300 hover:scale-110 hover:bg-red-600 hover:text-white"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="9"
                                    className="py-12 text-center text-slate-500"
                                >
                                    No Customers Found
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default DealerCustomerTable;
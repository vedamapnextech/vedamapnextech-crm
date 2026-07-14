import { useNavigate } from "react-router-dom";
import {
    FiEye,
    FiEdit2,
    FiTrash2,
} from "react-icons/fi";

function LeadTable({
    customers,
    setSelectedCustomer,
    setOpenModal,
    setIsDeleteModalOpen,
}) {

    const navigate = useNavigate();

    return (

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-slate-50 border-b border-slate-200">

                        <tr className="text-left text-slate-500 uppercase text-sm tracking-wider">

                            <th className="px-6 py-6">Lead</th>
                            <th className="px-6 py-6">Company</th>
                            <th className="px-6 py-6">Phone</th>
                            <th className="px-6 py-6">City</th>
                            <th className="px-6 py-6">Interest</th>
                            <th className="px-6 py-6">Priority</th>
                            <th className="px-6 py-6">
                                Follow-up
                            </th>
                            <th className="px-6 py-6">Status</th>
                            <th className="px-6 py-6">Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {customers.map((customer) => (

                            <tr
                                key={customer._id}
                                className="border-t border-slate-200 hover:bg-slate-50 transition-all duration-200"                >

                                <td className="px-6 py-5">

                                    <div className="flex items-center gap-3">

                                       

                                        <div>

                                            <h3 className="font-semibold text-slate-800 text-lg">
                                                {customer.name}
                                            </h3>

                                            

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

                                <td className="px-6 py-5 max-w-[180px]">

                                    <span className="inline-block rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">

                                        {customer.interest || customer.product || "-"}

                                    </span>

                                </td>


                                <td className="px-6 py-5">

                                    <span
                                        className={`rounded-full px-4 py-2 text-sm font-semibold
        ${customer.priority === "High"
                                                ? "bg-red-100 text-red-700"
                                                : customer.priority === "Medium"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-green-100 text-green-700"
                                            }`}
                                    >
                                        {customer.priority}
                                    </span>

                                </td>



                                <td className="px-6 py-5">

                                    <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">

                                        {customer.followUpDate
                                            ? new Date(customer.followUpDate).toLocaleDateString("en-IN")
                                            : "Not Scheduled"}

                                    </span>



                                </td>

                                <td className="px-6 py-5">

                                    <span
                                        className={`rounded-full px-4 py-2 text-sm font-semibold
    ${customer.status === "New"
                                                ? "bg-blue-100 text-blue-700"
                                                : customer.status === "Follow-up"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : customer.status === "Qualified"
                                                        ? "bg-emerald-100 text-emerald-700"
                                                        : customer.status === "Converted"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {customer.status}
                                    </span>
                                </td>

                                <td className="px-6 py-5">

                                    <div className="flex justify-center gap-3">

                                        <button
                                            onClick={() => navigate(`/leads/${customer._id}`)}
                                            className="rounded-xl bg-blue-100 p-3 text-blue-600 transition duration-300 hover:bg-blue-600 hover:text-white"
                                        >
                                            <FiEye />
                                        </button>

                                        <button
                                            onClick={() => {

                                                setSelectedCustomer(customer);

                                                setOpenModal(true);

                                            }}
                                            className="rounded-xl bg-emerald-100 p-3 text-emerald-600 transition duration-300 hover:bg-emerald-600 hover:text-white"
                                        >
                                            <FiEdit2 />
                                        </button>

                                        <button
                                            onClick={() => {

                                                setSelectedCustomer(customer);

                                                setIsDeleteModalOpen(true);

                                            }}
                                            className="rounded-xl bg-red-100 p-3 text-red-600 transition duration-300 hover:bg-red-600 hover:text-white"
                                        >
                                            <FiTrash2 />
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default LeadTable;





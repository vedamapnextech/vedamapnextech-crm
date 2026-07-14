import {
    FiEye,
    FiEdit2,
    FiTrash2,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function SupportTable({
    supports,
    setOpenModal,
    setSelectedSupport,
    setOpenDeleteModal,
}) {
    const navigate = useNavigate();
    return (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr className="text-left">

                            <th className="px-6 py-5">Ticket</th>
                            <th className="px-6 py-5">Customer</th>
                            <th className="px-6 py-5">WB Code</th>
                            <th className="px-6 py-5">Complaint</th>
                            <th className="px-6 py-5">Subject</th>

                            <th className="px-6 py-5">Priority</th>
                            <th className="px-6 py-5">Status</th>
                            <th className="px-6 py-5">Engineer</th>
                            <th className="px-6 py-5 text-center">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {supports.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="9"
                                    className="py-12 text-center text-slate-500"
                                >
                                    No Support Tickets Found.
                                </td>

                            </tr>

                        ) : (

                            supports.map((support, index) => (

                                <tr
                                    key={support._id}
                                    className="border-t hover:bg-emerald-50 duration-300"
                                >

                                    <td className="px-6 py-5 font-bold">
                                        🎫 SUP-{String(index + 1).padStart(4, "0")}
                                    </td>

                                    <td className="px-6 py-5 font-semibold text-emerald-600">
                                        {support.wbCode || "-"}
                                    </td>

                                    <td className="px-6 py-5">
                                        {support.customer?.name || "-"}
                                    </td>

                                    <td className="px-6 py-5">
                                        {support.complaintType || "-"}
                                    </td>

                                    <td className="px-6 py-5">
                                        {support.subject}
                                    </td>

                                    <td className="px-6 py-5">

                                        <span
                                            className={`rounded-full px-4 py-2 text-sm font-semibold
            ${support.priority === "High"
                                                    ? "bg-red-100 text-red-700"
                                                    : support.priority === "Medium"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-emerald-100 text-emerald-700"
                                                }`}
                                        >
                                            {support.priority}
                                        </span>

                                    </td>

                                    <td className="px-6 py-5">

                                        <span
                                            className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold
    ${support.status === "Open"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : support.status === "In Progress"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-emerald-100 text-emerald-700"
                                                }`}
                                        >
                                            {support.status}
                                        </span>

                                    </td>

                                    <td className="px-6 py-5">
                                        {support.engineer || "-"}
                                    </td>

                                    <td className="px-6 py-5">

                                        <div className="flex justify-center gap-3">

                                            <button
                                                onClick={() => navigate(`/support/${support._id}`)}
                                                className="rounded-xl bg-blue-100 p-3 text-blue-600 hover:bg-blue-600 hover:text-white duration-300"
                                            >                                                <FiEye />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedSupport(support);
                                                    setOpenModal(true);
                                                }}
                                                className="rounded-xl bg-emerald-100 p-3 text-emerald-600 hover:bg-emerald-600 hover:text-white duration-300"
                                            >
                                                <FiEdit2 />
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setSelectedSupport(support);
                                                    setOpenDeleteModal(true);
                                                }}
                                                className="rounded-xl bg-red-100 p-3 text-red-600 hover:bg-red-600 hover:text-white duration-300"
                                            >
                                                <FiTrash2 />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default SupportTable;
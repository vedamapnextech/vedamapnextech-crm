import {
    FiEye,
    FiEdit2,
    FiTrash2,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatters";
function InstallationTable({
    installations,
    setOpenModal,
    setSelectedInstallation,
    setOpenDeleteModal,
}) {
    const navigate = useNavigate();

    return (

        <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-xl">
            <table className="min-w-[1100px] w-full">

                <thead className="bg-slate-100">

                    <tr>

                        <th className="px-6 py-5 text-left">Customer</th>

                        <th className="px-6 py-5 text-left">WB Code</th>

                      
                        <th className="px-6 py-5 text-left">Site</th>

                        <th className="px-6 py-5 text-left">Type</th>

                        <th className="px-6 py-5 text-left">Product</th>

                        <th className="px-6 py-5 text-left">Engineer</th>

                        <th className="px-6 py-5 text-left">Date</th>

                        <th className="px-6 py-5 text-left">Status</th>


                        <th className="w-52 px-6 py-5 text-center whitespace-nowrap">
                            Action
                        </th>


                    </tr>

                </thead>

                <tbody>

                    {installations.length === 0 ? (

                        <tr>
                            <td colSpan="7" className="py-24 text-center">

                                <div className="text-7xl">
                                    🔍
                                </div>

                                <h2 className="mt-6 text-3xl font-bold text-slate-700">
                                    No Installation Found
                                </h2>

                                <p className="mt-3 text-slate-500">
                                    Try another search keyword or clear filters.
                                </p>

                                <p className="mt-3 text-slate-500">
                                    Click "Add Installation" to create your first installation.
                                </p>

                            </td>

                        </tr>

                    ) : (

                        installations.map((installation) => (

                            <tr key={installation._id} className="border-t hover:bg-emerald-50">

                                <td className="w-52 px-6 py-5">
                                    {installation.customer?.name}
                                </td>

                                <td className="px-6 py-5 font-semibold text-emerald-600">
                                    {installation.wbCode || "-"}
                                </td>

                               

                                <td className="px-6 py-5">
                                    {installation.location || "-"}
                                </td>

                                <td className="px-6 py-5">
                                    {installation.installationType || "-"}
                                </td>

                                <td className="px-6 py-5">
                                    {installation.product?.name}
                                </td>

                                <td className="px-6 py-5">
                                    {installation.engineer}
                                </td>

                                <td className="px-6 py-5">
                                    {formatDate(installation.installationDate)}
                                </td>

                                <td className="px-6 py-5">
                                    <span
                                        className={`rounded-full px-4 py-2 text-sm font-semibold
                                       ${installation.status === "Completed"
                                                ? "bg-emerald-100 text-emerald-700"
                                                : installation.status === "Pending"
                                                    ? "bg-orange-100 text-orange-700"
                                                    : installation.status === "In Progress"
                                                        ? "bg-blue-100 text-blue-700" : installation.status === "On Hold"
                                                            ? "bg-purple-100 text-purple-700"
                                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {installation.status}
                                    </span>




                                </td>

                                <td className="px-6 py-5">

                                    <div className="flex items-center justify-center gap-3 whitespace-nowrap">
                                        <button
                                            onClick={() => navigate(`/installations/${installation._id}`)}
                                            className="rounded-xl bg-blue-100 p-3 text-blue-600 hover:bg-blue-600 hover:text-white duration-300"
                                        >
                                            <FiEye />
                                        </button>

                                        <button
                                            onClick={() => {

                                                setSelectedInstallation(installation);

                                                setOpenModal(true);

                                            }}
                                            className="rounded-xl bg-emerald-100 p-3 text-emerald-600 hover:bg-emerald-600 hover:text-white duration-300"
                                        >
                                            <FiEdit2 />
                                        </button>

                                        <button
                                            onClick={() => {

                                                setSelectedInstallation(installation);

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

    );

}

export default InstallationTable;
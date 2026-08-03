import {
    FiEye,
    FiEdit2,
    FiTrash2,
    FiSearch,
    FiX,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { formatDate } from "../../utils/formatters";
function InstallationTable({
    installations,
    setOpenModal,
    setSelectedInstallation,
    setOpenDeleteModal,
}) {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [selectedEngineer, setSelectedEngineer] = useState("");

    const engineers = useMemo(() => {

        return [...new Set(

            installations
                .map(i => i.engineer)
                .filter(Boolean)

        )];

    }, [installations]);

    const filteredInstallations = useMemo(() => {

        return installations.filter((installation) => {

            const keyword = search.toLowerCase();

            const matchSearch =

                installation.customer?.name?.toLowerCase().includes(keyword) ||

                installation.wbCode?.toLowerCase().includes(keyword) ||

                installation.product?.name?.toLowerCase().includes(keyword) ||

                installation.location?.toLowerCase().includes(keyword) ||

                installation.engineer?.toLowerCase().includes(keyword);

            const matchEngineer =

                !selectedEngineer ||

                installation.engineer === selectedEngineer;

            return matchSearch && matchEngineer;

        });

    }, [installations, search, selectedEngineer]);

    return (
        <>

            <div className="mb-6 flex flex-wrap items-center gap-4">

                <div className="relative w-80">

                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                        type="text"
                        placeholder="Search Installation..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none focus:border-emerald-500"
                    />

                </div>

                <select
                    value={selectedEngineer}
                    onChange={(e) => setSelectedEngineer(e.target.value)}
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
                >

                    <option value="">All Engineers</option>

                    {engineers.map((engineer) => (

                        <option key={engineer} value={engineer}>
                            {engineer}
                        </option>

                    ))}

                </select>

                <button
                    onClick={() => {

                        setSearch("");
                        setSelectedEngineer("");

                    }}
                    className="
flex items-center
gap-2
rounded-2xl
border
border-red-200
bg-white
px-5
py-3
font-semibold
text-red-600
shadow-sm
transition-all
duration-300
hover:-translate-y-1
hover:bg-red-50
hover:border-red-400
"                >

                    <FiX />

                    Clear Filters

                </button>

            </div>

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

                        {filteredInstallations.length === 0 ? (

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

                            filteredInstallations.map((installation) => (
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
        </>

    );

}

export default InstallationTable;
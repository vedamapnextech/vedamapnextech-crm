import {
    FiEye,
    FiEdit2,
    FiTrash2,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatters";

function EmployeeTable({
    employees,
    setOpenModal,
    setSelectedEmployee,
    setOpenDeleteModal,
}) {

    const navigate = useNavigate();

    return (

        <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-xl">

            <table className="min-w-[1200px] w-full">

                <thead className="bg-slate-100">

                    <tr>

                        <th className="px-6 py-5 text-left">Employee ID</th>

                        <th className="px-6 py-5 text-left">Name</th>

                        <th className="px-6 py-5 text-left">Mobile</th>

                        <th className="px-6 py-5 text-left">Department</th>

                        <th className="px-6 py-5 text-left">Designation</th>

                        <th className="px-6 py-5 text-left">Role</th>

                        <th className="px-6 py-5 text-left">Joining Date</th>

                        <th className="px-6 py-5 text-left">Status</th>

                        <th className="w-52 px-6 py-5 text-center">
                            Action
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {employees.length === 0 ? (

                        <tr>

                            <td colSpan="9" className="py-24 text-center">

                                <div className="text-7xl">
                                    👨‍💼
                                </div>

                                <h2 className="mt-6 text-3xl font-bold text-slate-700">

                                    No Employees Found

                                </h2>

                                <p className="mt-3 text-slate-500">

                                    Try another search keyword or clear filters.

                                </p>

                                <p className="mt-3 text-slate-500">

                                    Click "Add Employee" to create your first employee.

                                </p>

                            </td>

                        </tr>

                    ) : (

                        employees.map((employee) => (

                            <tr
                                key={employee._id}
                                className="border-t hover:bg-emerald-50"
                            >

                                <td className="px-6 py-5 font-semibold text-emerald-600">

                                    {employee.employeeId}
                                </td>







                                <td className="px-6 py-5">

                                    <div className="flex items-center gap-3">

                                        <img
                                            src={
                                                employee.profilePhoto
                                                    ? employee.profilePhoto.startsWith("http")
                                                        ? employee.profilePhoto
                                                        : `${import.meta.env.VITE_API_URL.replace("/api", "")}${employee.profilePhoto}`
                                                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.fullName)}&background=10B981&color=fff`
                                            }
                                            alt={employee.fullName}
                                            className="h-14 w-14 min-h-14 min-w-14 rounded-full border-2 border-emerald-500 bg-slate-100 object-cover shadow-md"
                                        />

                                        <div>

                                            <p className="font-semibold text-slate-800">
                                                {employee.fullName}
                                            </p>

                                            <p className="text-xs text-slate-500">
                                                {employee.email}
                                            </p>

                                        </div>

                                    </div>

                                </td>








                                <td className="px-6 py-5">

                                    {employee.mobileNumber}

                                </td>

                                <td className="px-6 py-5">

                                    {employee.department}

                                </td>

                                <td className="px-6 py-5">

                                    {employee.designation}

                                </td>

                                <td className="px-6 py-5">

                                    {employee.role}

                                </td>

                                <td className="px-6 py-5">

                                    {formatDate(employee.joiningDate)}

                                </td>

                                <td className="px-6 py-5">

                                    <span
                                        className={`rounded-full px-4 py-2 text-sm font-semibold ${employee.status === "Active"
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >

                                        {employee.status}

                                    </span>

                                </td>

                                <td className="px-6 py-5">

                                    <div className="flex justify-center gap-3">

                                        <button
                                            onClick={() =>
                                                navigate(`/employees/${employee._id}`)
                                            }
                                            className="rounded-xl bg-blue-100 p-3 text-blue-600 hover:bg-blue-600 hover:text-white duration-300"
                                        >
                                            <FiEye />
                                        </button>

                                        <button
                                            onClick={() => {

                                                setSelectedEmployee(employee);

                                                setOpenModal(true);

                                            }}
                                            className="rounded-xl bg-emerald-100 p-3 text-emerald-600 hover:bg-emerald-600 hover:text-white duration-300"
                                        >
                                            <FiEdit2 />
                                        </button>

                                        <button
                                            onClick={() => {

                                                setSelectedEmployee(employee);

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

export default EmployeeTable;
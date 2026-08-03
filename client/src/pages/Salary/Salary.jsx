import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FiEdit2, FiMessageSquare, FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import AddSalaryModal from "../../components/Salary/AddSalaryModal";
import exportSalaryPDF from "../../utils/exportSalaryPDF";
import RemarkModal from "../../components/Salary/RemarkModal";
import DeleteConfirmationModal from "../../components/Common/DeleteConfirmationModal";


function Salary() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [employee, setEmployee] = useState(null);
    const [salaries, setSalaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    const [openRemark, setOpenRemark] = useState(false);

    const [editMode, setEditMode] = useState(false);
    const [selectedSalary, setSelectedSalary] = useState(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [search, setSearch] = useState("");
    const filteredSalaries = salaries.filter((salary) => {

        const searchText = search.toLowerCase();

        return (

            salary.month.toLowerCase().includes(searchText) ||

            String(salary.year).includes(searchText) ||

            String(salary.basicSalary).includes(searchText) ||

            String(salary.incentive).includes(searchText) ||

            String(salary.netSalary).includes(searchText) ||

            String(salary.paidAmount).includes(searchText) ||

            String(salary.pendingAmount).includes(searchText) ||

            salary.status.toLowerCase().includes(searchText)

        );

    });


    const totalSalary = salaries.reduce(
        (sum, item) => sum + Number(item.netSalary),
        0
    );

    const paidSalary = salaries.reduce(
        (sum, item) => sum + Number(item.paidAmount),
        0
    );

    const pendingSalary = salaries.reduce(
        (sum, item) => sum + Number(item.pendingAmount),
        0
    );

    const totalIncentive = salaries.reduce(
        (sum, item) => sum + Number(item.incentive),
        0
    );


    const getEmployee = async () => {

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/employees/${id}`
            );

            const data = await response.json();

            setEmployee(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };



    const getSalaries = async () => {

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/salary/${id}`
            );

            const data = await response.json();

            setSalaries(data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleDeleteSalary = async () => {

        try {

            const response = await fetch(

                `${import.meta.env.VITE_API_URL}/salary/${selectedSalary._id}`,

                {
                    method: "DELETE",
                }

            );

            const data = await response.json();

            if (!response.ok) {

                toast.error(data.message);
                return;

            }

            toast.success(data.message);

            setOpenDeleteModal(false);

            setSelectedSalary(null);

            getSalaries();

        } catch (error) {

            console.log(error);

            toast.error("Server Error");

        }

    };


    useEffect(() => {

        getEmployee();
        getSalaries();

    }, [id]);

    if (loading) {

        return (

            <div className="flex h-screen items-center justify-center">

                <h2 className="text-3xl font-bold text-slate-500">
                    Loading Employee...
                </h2>

            </div>

        );

    }

    if (!employee) {

        return (

            <div className="flex h-screen items-center justify-center">

                <h2 className="text-3xl font-bold text-red-500">
                    Employee Not Found
                </h2>

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-slate-50 p-8">

            {/* Header */}

            <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                <div>

                    <p className="text-sm font-bold uppercase tracking-[4px] text-emerald-600">
                        Employee Salary
                    </p>

                    <h1 className="mt-2 text-5xl font-extrabold text-slate-800">
                        {employee.fullName}
                    </h1>

                    <div className="mt-3 flex flex-wrap gap-5 text-slate-500">

                        <span>
                            Employee ID :
                            <b className="ml-2">
                                {employee.employeeId}
                            </b>
                        </span>

                        <span>
                            Department :
                            <b className="ml-2">
                                {employee.department}
                            </b>
                        </span>

                        <span>
                            Role :
                            <b className="ml-2">
                                {employee.role}
                            </b>
                        </span>

                    </div>

                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">

                    <button
                        onClick={() => setOpenModal(true)}
                        className="w-full rounded-2xl bg-emerald-500 px-6 py-3 font-bold text-white shadow transition hover:bg-emerald-600 sm:w-auto"
                    >
                        + Add Salary
                    </button>

                    <button
                        onClick={() =>
                            exportSalaryPDF({
                                employee,
                                salaries,
                                totalSalary,
                                paidSalary,
                                pendingSalary,
                                totalIncentive,
                            })
                        }
                        className="w-full rounded-2xl bg-red-500 px-6 py-3 font-bold text-white shadow transition hover:bg-red-600 sm:w-auto"
                    >
                        📄 Export PDF
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="w-full rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold shadow transition hover:bg-slate-100 sm:w-auto"
                    >
                        ← Back
                    </button>

                </div>

            </div>

            {/* Small Summary Cards */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    title="Total Salary"
                    value={`₹${totalSalary.toLocaleString("en-IN")}`}
                    color="emerald"
                />

                <StatCard
                    title="Paid Salary"
                    value={`₹${paidSalary.toLocaleString("en-IN")}`}
                    color="blue"
                />

                <StatCard
                    title="Pending Salary"
                    value={`₹${pendingSalary.toLocaleString("en-IN")}`}
                    color="red"
                />

                <StatCard
                    title="Total Incentive"
                    value={`₹${totalIncentive.toLocaleString("en-IN")}`}
                    color="amber"
                />

            </div>

            {/* Search */}

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow">

                <div className="flex flex-col gap-4 md:flex-row">

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search Month..."
                        className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
                    />

                    <button
                        className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600"
                    >
                        Search
                    </button>

                </div>

            </div>






            {/* Salary Table */}

            <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow">

                <table className="min-w-[1200px] w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="whitespace-nowrap px-5 py-4 text-left">Month</th>
                            <th className=" whitespace-nowrap px-5 py-4 text-left">Basic Salary</th>
                            <th className="whitespace-nowrap px-5 py-4 text-left">Incentive</th>
                            <th className="whitespace-nowrap px-5 py-4 text-left">Paid</th>
                            <th className="whitespace-nowrap px-5 py-4 text-left">Pending</th>
                            <th className="whitespace-nowrap px-5 py-4 text-left">Net Salary</th>
                            <th className="whitespace-nowrap px-5 py-4 text-left">Status</th>
                            <th className="whitespace-nowrap px-5 py-4 text-center">Action</th>

                        </tr>

                    </thead>
                    <tbody>

                        {salaries.length === 0 ? (

                            <tr>
                                <td colSpan={7} className="py-20 text-center text-slate-500">
                                    No Salary Records Found
                                </td>
                            </tr>

                        ) : (

                            filteredSalaries.map((salary) => (

                                <tr key={salary._id} className="border-t hover:bg-slate-50">

                                    <td className="px-5 py-4">
                                        {salary.month} {salary.year}
                                    </td>

                                    <td className="px-5 py-4">
                                        ₹{salary.basicSalary}
                                    </td>

                                    <td className="px-5 py-4">
                                        ₹{salary.incentive}
                                    </td>

                                    <td className="px-5 py-4 text-emerald-600 font-semibold">
                                        ₹{salary.paidAmount}
                                    </td>

                                    <td className="px-5 py-4 font-semibold text-red-600">
                                        ₹{salary.pendingAmount}
                                    </td>

                                    <td className="px-5 py-4 font-semibold">
                                        ₹{salary.netSalary}
                                    </td>

                                    <td className="px-5 py-4">
                                        {salary.status}
                                    </td>

                                    <td className="px-5 py-4 text-center">

                                        <div className="flex items-center justify-center gap-2">

                                            <button
                                                onClick={() => {
                                                    setSelectedSalary(salary);
                                                    setEditMode(true);
                                                    setOpenModal(true);
                                                }}
                                                className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
                                                title="Edit Salary"
                                            >
                                                <FiEdit2 size={18} />
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setSelectedSalary(salary);
                                                    setOpenRemark(true);
                                                }}
                                                className="rounded-lg bg-amber-100 p-2 text-amber-600 transition hover:bg-amber-200"
                                                title="Remarks"
                                            >
                                                <FiMessageSquare size={18} />
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setSelectedSalary(salary);
                                                    setOpenDeleteModal(true);
                                                }}
                                                className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
                                                title="Delete"
                                            >
                                                <FiTrash2 size={18} />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

            <AddSalaryModal
                open={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setEditMode(false);
                    setSelectedSalary(null);
                }}
                employee={employee}
                refreshData={getSalaries}
                editMode={editMode}
                salary={selectedSalary}
            />

            <RemarkModal
                open={openRemark}
                onClose={() => setOpenRemark(false)}
                salary={selectedSalary}
            />

            <DeleteConfirmationModal
                open={openDeleteModal}
                title="Delete Salary"
                message="Are you sure you want to delete this salary record?"
                onClose={() => {
                    setOpenDeleteModal(false);
                    setSelectedSalary(null);
                }}
                onDelete={handleDeleteSalary}
            />

        </div>

    );

}



function StatCard({ title, value, color }) {

    const colors = {
        emerald: "bg-emerald-100 text-emerald-700",
        blue: "bg-blue-100 text-blue-700",
        red: "bg-red-100 text-red-700",
        amber: "bg-amber-100 text-amber-700",
    };

    return (

        <div className="min-h-[140px] rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div
                className={`inline-flex rounded-lg px-3 py-1 text-xs font-bold ${colors[color]}`}
            >
                {title}
            </div>
            <h2 className="mt-4 break-all text-2xl font-extrabold leading-tight text-slate-800 xl:text-3xl">
                {value}
            </h2>




        </div>


    );

}

export default Salary;
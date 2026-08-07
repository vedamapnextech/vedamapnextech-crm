// ==================== TODO ====================
// Improve Mobile Responsiveness
// =============================================
import AddEmployeeModal from "../../components/Employees/AddEmployeeModal";
import DeleteConfirmationModal from "../../components/Common/DeleteConfirmationModal";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FilePreviewModal from "../../components/Common/FilePreviewModal";
import toast from "react-hot-toast";
import exportEmployeePDF from "../../utils/exportEmployeePDF";

import EmployeeTimeline from "../../components/Employees/EmployeeTimeline";

function EmployeeDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);

    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);
    const [previewFile, setPreviewFile] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");




    const getEmployee = async () => {

        try {

            const response = await fetch(

                `${import.meta.env.VITE_API_URL}/api/employees/${id}`

            );

            const data = await response.json();

            setEmployee(data);


        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        getEmployee();

    }, [id]);


    const handleDelete = async () => {

        try {

            const response = await fetch(

                `${import.meta.env.VITE_API_URL}/api/employees/${employee._id}`,

                {
                    method: "DELETE",
                }

            );

            const data = await response.json();

            if (!response.ok) {

                toast.error(data.message || "Failed to delete employee.");

                return;

            }

            toast.success("Employee deleted successfully.");

            setTimeout(() => {
                navigate("/employees");
            }, 400);



        }

        catch (error) {

            console.log(error);

            toast.error("Something went wrong.");

        }

    };




    if (loading) {

        return (

            <div className="flex h-[70vh] items-center justify-center">

                <h2 className="text-3xl font-bold text-slate-500">

                    Loading Employee...

                </h2>

            </div>

        );

    }

    if (!employee) {

        return (

            <div className="flex h-[70vh] items-center justify-center">

                <h2 className="text-3xl font-bold text-red-500">

                    Employee Not Found

                </h2>

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-slate-50 p-8">

            {/* Header */}

            <div className="mb-8 flex items-center justify-between">

                <div className="flex items-center gap-8">

                    <div className="relative">

                        <img
                            src={
                                employee.profilePhoto
                                    ? employee.profilePhoto.startsWith("http")
                                        ? employee.profilePhoto
                                        : `${import.meta.env.VITE_API_URL.replace("/api", "")}${employee.profilePhoto}`
                                    : "https://ui-avatars.com/api/?name=Employee&background=10B981&color=fff"
                            }
                            alt={employee.fullName}
                            className="h-36 w-36 rounded-full border-4 border-emerald-500 object-cover object-center shadow-xl cursor-pointer transition hover:scale-105 bg-slate-100"
                            onClick={() => {

                                if (!employee.profilePhoto) return;

                                setPreviewTitle("Profile Photo");

                                setPreviewFile(
                                    employee.profilePhoto.startsWith("http")
                                        ? employee.profilePhoto
                                        : `${import.meta.env.VITE_API_URL.replace("/api", "")}${employee.profilePhoto}`
                                );

                                setOpenPreview(true);

                            }}
                        />

                    </div>

                    <div>

                        <p className="text-sm font-bold uppercase tracking-[5px] text-emerald-600">

                            Employee Details

                        </p>

                        <h1 className="mt-2 text-5xl font-extrabold text-slate-800">

                            {employee.fullName}

                        </h1>

                        <p className="mt-3 text-lg text-slate-500">

                            Employee ID : {employee.employeeId}

                        </p>

                    </div>

                </div>

                <div className="flex items-center gap-4">

                    <button
                        onClick={() => navigate(`/employees/${employee._id}/salary`)}
                        className="
        mb-8
        rounded-2xl
        bg-emerald-500
        px-6
        py-3
        font-semibold
        text-white
        shadow-md
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-emerald-600"
                    >
                        💰 Salary
                    </button>

                    <button
                        onClick={() => navigate("/employees")}
                        className="
        mb-8
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-slate-300
        bg-white
        px-6
        py-3
        font-semibold
        shadow-md
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-emerald-500
        hover:text-white"
                    >
                        ← Back
                    </button>

                </div>

            </div>





            <div className="flex flex-col gap-8">
                {/* Employee Information */}

                <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
                    <h2 className="mb-8 text-3xl font-bold text-slate-800">

                        Employee Information

                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">

                        <InfoCard
                            title="Employee ID"
                            value={employee.employeeId}
                        />

                        <InfoCard
                            title="Full Name"
                            value={employee.fullName}
                        />

                        <InfoCard
                            title="Mobile Number"
                            value={employee.mobileNumber}
                        />

                        <InfoCard
                            title="Email"
                            value={employee.email}
                        />

                        <InfoCard
                            title="Department"
                            value={employee.department}
                        />

                        <InfoCard
                            title="Designation"
                            value={employee.designation}
                        />

                        <InfoCard
                            title="Role"
                            value={employee.role}
                        />

                        <InfoCard
                            title="Joining Date"
                            value={new Date(employee.joiningDate).toLocaleDateString()}
                        />








                        <InfoCard
                            title="Date of Birth"
                            value={
                                employee.dateOfBirth
                                    ? new Date(employee.dateOfBirth).toLocaleDateString()
                                    : "-"
                            }
                        />

                        <InfoCard
                            title="Emergency Mobile"
                            value={employee.emergencyContactMobile || "-"}
                        />

                        <InfoCard
                            title="Created Date"
                            value={
                                employee.createdAt
                                    ? new Date(employee.createdAt).toLocaleString("en-GB")
                                    : "-"
                            }
                        />

                        <InfoCard
                            title="Last Updated"
                            value={
                                employee.updatedAt
                                    ? new Date(employee.updatedAt).toLocaleString("en-GB")
                                    : "-"
                            }
                        />


                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                            <p className="text-xs font-semibold uppercase tracking-[2px] text-slate-500">
                                Status
                            </p>

                            <div className="mt-3">

                                <span
                                    className={`rounded-full px-4 py-2 text-sm font-bold
            ${employee.status === "Active"
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {employee.status}
                                </span>

                            </div>

                        </div>



                        <InfoCard
                            title="Address"
                            value={employee.address || "-"}
                        />

                    </div>

                    <div className="mt-8">

                        <h3 className="mb-3 text-xl font-bold text-slate-800">

                            Remarks

                        </h3>

                        <div className="rounded-2xl bg-slate-100 p-5 text-slate-600">

                            {employee.remarks || "No remarks available."}

                        </div>

                    </div>

                </div>

                {/* Timeline */}

                <div className="grid gap-8 lg:grid-cols-3">

                    {/* Documents */}

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">

                        <h2 className="mb-5 text-2xl font-bold text-slate-800">
                            Documents
                        </h2>

                        {employee.aadhaarDocument ? (

                            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">

                                <p className="text-lg font-semibold text-slate-800">
                                    Aadhaar Card
                                </p>
                                <div className="mt-4 flex flex-col gap-3">
                                    <button
                                        onClick={() => {
                                            setPreviewTitle("Aadhaar Card");
                                            setPreviewFile(
                                                employee.aadhaarDocument.startsWith("http")
                                                    ? employee.aadhaarDocument
                                                    : `${import.meta.env.VITE_API_URL.replace("/api", "")}${employee.aadhaarDocument}`
                                            );

                                            setOpenPreview(true);
                                        }}
                                        className=" w-full rounded-xl bg-blue-500 py-3 font-semibold text-white font-semibold text-white hover:bg-blue-600"
                                    >
                                        👁 View
                                    </button>

                                    <button
                                        onClick={async () => {
                                            const fileUrl =
                                                employee.aadhaarDocument.startsWith("http")
                                                    ? employee.aadhaarDocument
                                                    : `${import.meta.env.VITE_API_URL.replace("/api", "")}${employee.aadhaarDocument}`;
                                            const response = await fetch(fileUrl);

                                            const blob = await response.blob();

                                            const url = window.URL.createObjectURL(blob);

                                            const link = document.createElement("a");

                                            link.href = url;

                                            link.download = employee.aadhaarDocument.split("/").pop();

                                            document.body.appendChild(link);

                                            link.click();

                                            link.remove();

                                            window.URL.revokeObjectURL(url);
                                        }}
                                        className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-white font-semibold text-white hover:bg-emerald-600"
                                    >
                                        ⬇ Download
                                    </button>

                                </div>

                            </div>

                        ) : (

                            <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-slate-500">
                                No Aadhaar Uploaded
                            </div>

                        )}

                    </div>

                    {/* Timeline */}

                    <div className="lg:col-span-2">
                        <EmployeeTimeline employee={employee} />
                    </div>

                </div>





            </div>

            <div className="mt-12 flex justify-end gap-4">

                <button
                    onClick={() => setOpenModal(true)}
                    className="rounded-2xl bg-emerald-500 px-6 py-3 font-bold text-white transition hover:bg-emerald-600"
                >
                    ✏ Edit Employee
                </button>

                <button onClick={() => setOpenDeleteModal(true)}
                    className="rounded-2xl bg-red-500 px-6 py-3 font-bold text-white transition hover:bg-red-600"
                >
                    🗑 Delete Employee
                </button>

                <button
                    onClick={() => exportEmployeePDF(employee)}
                    className="rounded-2xl bg-blue-500 px-6 py-3 font-bold text-white transition hover:bg-blue-600"
                >
                    📄 Export PDF
                </button>

            </div>


            {openModal && (

                <AddEmployeeModal

                    setOpenModal={setOpenModal}

                    selectedEmployee={employee}

                    onSuccess={getEmployee}

                />

            )}


            {openDeleteModal && (
                <DeleteConfirmationModal
                    open={openDeleteModal}
                    title="Delete Employee?"
                    message={`Are you sure you want to delete "${employee.fullName}"?`}
                    onClose={() => setOpenDeleteModal(false)}
                    onDelete={handleDelete}
                />
            )}

            <FilePreviewModal
                open={openPreview}
                fileUrl={previewFile}
                title={previewTitle}
                onClose={() => setOpenPreview(false)}
            />

        </div>


    );

}
function InfoCard({ title, value }) {

    return (

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition duration-300 hover:shadow-md">

            <p className="text-xs font-semibold uppercase tracking-[2px] text-slate-500">

                {title}

            </p>

            <h3 className="mt-2 text-lg font-bold break-words text-slate-800">

                {value || "-"}

            </h3>





        </div>

    );

}

export default EmployeeDetails;
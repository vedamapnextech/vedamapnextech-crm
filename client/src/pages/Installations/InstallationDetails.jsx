
import AddInstallationModal from "../../components/Installations/AddInstallationModal";

import DeleteConfirmationModal from "../../components/Common/DeleteConfirmationModal";
import SkeletonCard from "../../components/Common/SkeletonCard";
import InstallationTimeline from "../../components/Installations/InstallationTimeline";
import toast from "react-hot-toast";

import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import {
    FiArrowLeft,
    FiUser,
    FiPackage,
    FiMapPin,
    FiTool,
    FiCalendar,
    FiClock,
    FiFileText,
    FiCheckCircle,
    FiEdit2,
    FiTrash2,
} from "react-icons/fi";

function InstallationDetails() {
    const [employees, setEmployees] = useState([]);
    const { id } = useParams();

    const navigate = useNavigate();


    const [openModal, setOpenModal] = useState(false);
    const [otherInstallations, setOtherInstallations] = useState([]);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const [installation, setInstallation] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);

    const handleDelete = async () => {
        try {
            await fetch(
                `${import.meta.env.VITE_API_URL}/installations/${installation._id}`,
                {
                    method: "DELETE",
                }
            );

            setOpenDeleteModal(false);

            toast.success("Installation deleted successfully.");

            setTimeout(() => {
                navigate("/installations");
            }, 500);

        } catch (error) {
            console.log(error);
        }
    };



    const getCustomers = () => {
        fetch(`${import.meta.env.VITE_API_URL}/customers`)
            .then((res) => res.json())
            .then((data) => setCustomers(data));
    };

    const getProducts = () => {
        fetch(`${import.meta.env.VITE_API_URL}/products`)
            .then((res) => res.json())
            .then((data) => setProducts(data));
    };



    const getEmployees = () => {
        fetch(`${import.meta.env.VITE_API_URL}/employees`)
            .then((res) => res.json())
            .then((data) => {
                setEmployees(data);
            });
    };




    const getOtherInstallations = async (wbCode) => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/installations/wb/${wbCode}`
            );

            const data = await res.json();

            setOtherInstallations(
                data.filter((item) => item._id !== id)
            );

        } catch (error) {

            console.log(error);

        }
    };



    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/installations/${id}`)
            .then((res) => res.json())
            .then((data) => {

                console.log(data);

                setInstallation(data);

                getOtherInstallations(data.wbCode);

                console.log("WB Code :", data.wbCode);

            });

        getEmployees();
        getCustomers();
        getProducts();

    }, [id]);

    if (!installation) {
        return (
            <div className="min-h-screen bg-slate-100 p-8">

                <div className="grid gap-8 lg:grid-cols-2">

                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />

                </div>

            </div>
        );
    }
    console.log("Other Installations :", otherInstallations);

    const statusColor =
        installation.status === "Completed"
            ? "bg-emerald-100 text-emerald-700"
            : installation.status === "Pending"
                ? "bg-orange-100 text-orange-700"
                : "bg-red-100 text-red-700";

    const InfoCard = ({ icon, title, value, subTitle, iconBg }) => (
        <div
            className="
      group
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-6
      shadow-lg
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-2xl
      hover:border-emerald-400
    "
        >
            <div className="flex items-center gap-5">
                <div
                    className={`h-20 w-20 rounded-3xl ${iconBg} flex items-center justify-center text-4xl transition-all duration-300 group-hover:rotate-12`}
                >
                    {icon}
                </div>

                <div>
                    <p className="text-lg text-slate-500">{title}</p>

                    <h2 className="text-4xl font-extrabold text-slate-800">
                        {value || "-"}
                    </h2>

                    <p className="mt-1 text-slate-500">{subTitle}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-100 p-8">
            {/* Back */}

            <button
               onClick={() => navigate("/installations")}
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
        hover:text-white
      "
            >
                <FiArrowLeft />
                Back
            </button>

            {/* Hero */}

            <div
                className="
        rounded-[40px]
        bg-gradient-to-r
        from-emerald-600
        via-green-500
        to-teal-500
        p-12
        text-white
        shadow-2xl
      "
            >
                <div className="flex flex-wrap items-center justify-between gap-8">
                    <div>
                        <p className="uppercase tracking-[8px] text-sm opacity-80">
                            Installation Management
                        </p>

                        <h1 className="mt-3 text-6xl font-black">
                            Installation Details
                        </h1>

                        <p className="mt-4 text-xl opacity-90">
                            Complete installation information for Vedamap Nextech.
                        </p>
                    </div>

                    <span
                        className={`rounded-2xl px-8 py-5 text-3xl font-bold ${statusColor}`}
                    >
                        {installation.status}
                    </span>
                </div>
            </div>

            {/* Cards */}

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
                <InfoCard
                    icon={<FiUser className="text-blue-600" />}
                    title="Customer"
                    value={installation.customer?.name}
                    subTitle={installation.customer?.city}
                    iconBg="bg-blue-100"
                />

                <InfoCard
                    icon={<FiCheckCircle className="text-emerald-600" />}
                    title="WB Code"
                    value={installation.wbCode}
                    subTitle="Weighbridge Code"
                    iconBg="bg-emerald-100"
                />

                <InfoCard
                    icon={<FiPackage className="text-violet-600" />}
                    title="Product"
                    value={installation.product?.name}
                    subTitle={installation.product?.category}
                    iconBg="bg-violet-100"
                />



                <InfoCard
                    icon={<FiMapPin className="text-orange-600" />}
                    title="Installation Location"
                    value={installation.location}
                    subTitle="Factory / Gate / Weighbridge Position"
                    iconBg="bg-orange-100"
                />


                <InfoCard
                    icon={<FiMapPin className="text-pink-600" />}
                    title="Installation Site"
                    value={installation.siteName}
                    subTitle="Customer Plant / Site Name"
                    iconBg="bg-pink-100"
                />

                <InfoCard

                    icon={<FiTool className="text-sky-600" />}
                    title="Assigned Engineer"
                    value={installation.engineer}
                    subTitle="Installation Engineer"
                    iconBg="bg-sky-100"
                />


                <InfoCard
                    icon={<FiTool className="text-cyan-600" />}
                    title="Installation Type"
                    value={installation.installationType}
                    subTitle="Installation Category"
                    iconBg="bg-cyan-100"
                />

                <InfoCard
                    icon={<FiCalendar className="text-emerald-600" />}
                    title="Installation Date"
                    value={new Date(
                        installation.installationDate
                    ).toLocaleDateString()}
                    subTitle="Scheduled Date"
                    iconBg="bg-emerald-100"
                />


                <InfoCard
                    icon={<FiCalendar className="text-green-600" />}
                    title="Commissioning Date"
                    value={
                        installation.commissioningDate
                            ? new Date(installation.commissioningDate).toLocaleDateString()
                            : "-"
                    }
                    subTitle="Go Live Date"
                    iconBg="bg-green-100"
                />


                <InfoCard
                    icon={<FiClock className="text-slate-600" />}
                    title="Created At"
                    value={new Date(
                        installation.createdAt
                    ).toLocaleDateString()}
                    subTitle={`Last Updated : ${new Date(
                        installation.updatedAt
                    ).toLocaleDateString()}`}
                    iconBg="bg-slate-100"
                />
            </div>

            {/* Remarks */}

            <div
                className="
        mt-10
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-xl
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
      "
            >
                <div className="mb-6 flex items-center gap-4">
                    <div className="rounded-2xl bg-emerald-100 p-5 text-3xl text-emerald-600">
                        <FiFileText />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-slate-800">
                            Installation Remarks
                        </h2>

                        <p className="text-slate-500">
                            Additional notes shared by engineer.
                        </p>
                    </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-6 text-lg leading-8 text-slate-700">
                    {installation.remarks || "No remarks available."}
                </div>
            </div>


            <div className="mt-10 grid grid-cols-1 xl:grid-cols-2 gap-8">

                <InstallationTimeline installation={installation} />

                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">

                    <h2 className="text-3xl font-bold text-slate-800">
                        Other Installations ({installation.wbCode})
                    </h2>

                    <div className="mt-6 space-y-3">

                        {otherInstallations.map((item) => (

                            <div
                                key={item._id}
                                className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 hover:bg-slate-50"
                            >

                                <div>

                                    <p className="font-semibold">
                                        📦 {item.product?.name}
                                    </p>

                                    <p className="text-sm text-slate-500">
                                        {new Date(item.installationDate).toLocaleDateString()}
                                    </p>

                                </div>

                                <div className="flex items-center gap-4">

                                    <span className="text-sm font-semibold">
                                        {item.status}
                                    </span>

                                    <button
                                        onClick={() => navigate(`/installations/${item._id}`)}
                                        className="rounded-lg bg-emerald-500 px-3 py-1 text-white hover:bg-emerald-600"
                                    >
                                        View
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>



            {/* Action Buttons */}

            <div className="mt-10 flex flex-wrap justify-end gap-5">
                <button
                    onClick={() => setOpenModal(true)}
                    className="
    flex
    items-center
    gap-3
    rounded-2xl
    bg-emerald-500
    px-8
    py-4
    text-lg
    font-bold
    text-white
    shadow-xl
    transition-all
    duration-300
    hover:-translate-y-1
    hover:scale-105
">
                    <FiEdit2 />
                    Edit Installation
                </button>

                <button
                    onClick={() => setOpenDeleteModal(true)}
                    className="
    flex
    items-center
    gap-3
    rounded-2xl
    bg-red-500
    px-8
    py-4
    text-lg
    font-bold
    text-white
    shadow-xl
    transition-all
    duration-300
    hover:-translate-y-1
    hover:scale-105
">
                    <FiTrash2 />
                    Delete Installation
                </button>
            </div>


            {openModal && (
                <AddInstallationModal
                    setOpenModal={setOpenModal}
                    customers={customers}
                    products={products}
                    employees={employees}

                    getInstallations={async () => {
                        const res = await fetch(
                            `${import.meta.env.VITE_API_URL}/installations/${id}`
                        );

                        const data = await res.json();

                        setInstallation(data);
                    }}
                    selectedInstallation={installation}
                />
            )}
            <DeleteConfirmationModal
                open={openDeleteModal}
                title="Delete Installation?"
                message={`Are you sure you want to delete "${installation.customer?.name}" installation?`}
                onClose={() => setOpenDeleteModal(false)}
                onDelete={handleDelete}
            />


        </div>






    );
}

export default InstallationDetails;
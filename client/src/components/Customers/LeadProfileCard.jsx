import {
    FiEdit2,
    FiTrash2,
    FiArrowRightCircle,
    FiPhone,
    FiMapPin,
    FiBriefcase,
} from "react-icons/fi";

function LeadProfileCard({ lead,

    setOpenModal,

    setSelectedCustomer,

    setIsDeleteModalOpen,
    onConvertCustomer,
}) {

    return (

        <div className="space-y-8">

            {/* Hero Card */}

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                <div className="h-36 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600"></div>

                <div className="-mt-16 px-8 pb-8">

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

                        {/* Left */}

                        <div className="flex items-end gap-6">

                            <img
                                src={`https://ui-avatars.com/api/?name=${lead.name}&background=ffffff&color=059669&size=200`}
                                alt={lead.name}
                                className="h-32 w-32 rounded-3xl border-4 border-white shadow-xl"
                            />

                            <div className="pb-2">

                                <h1 className="text-4xl font-bold text-slate-800">

                                    {lead.name}

                                </h1>

                                <div className="mt-3 flex flex-wrap items-center gap-5 text-slate-500">

                                    <span className="flex items-center gap-2">

                                        <FiBriefcase />

                                        {lead.company || "No Company"}

                                    </span>

                                    <span className="flex items-center gap-2">

                                        <FiPhone />

                                        {lead.phone}

                                    </span>

                                    <span className="flex items-center gap-2">

                                        <FiMapPin />

                                        {lead.city || "-"}

                                    </span>

                                </div>

                            </div>

                        </div>

                        {/* Right */}

                        <div className="flex flex-wrap gap-3">

                            <span
                                className={`rounded-full px-5 py-2 text-sm font-semibold
                                ${lead.status === "Converted"
                                        ? "bg-emerald-100 text-emerald-700"
                                        : lead.status === "Qualified"
                                            ? "bg-blue-100 text-blue-700"
                                            : lead.status === "Follow-up"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : lead.status === "Lost"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-slate-100 text-slate-700"
                                    }`}
                            >

                                {lead.status}

                            </span>

                            <span className="rounded-full bg-sky-100 px-5 py-2 text-sm font-semibold text-sky-700">

                                {lead.interest || "-"}

                            </span>

                        </div>

                    </div>

                </div>

            </div>

            {/* Quick Actions */}

            <div className="grid gap-5 md:grid-cols-3">

                <button
                    onClick={() => {

                        setSelectedCustomer(lead);

                        setOpenModal(true);

                    }}
                    className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-emerald-500 hover:shadow-lg"
                >

                    <FiEdit2 className="text-3xl text-emerald-600" />

                    <h3 className="mt-5 text-xl font-bold">

                        Edit Lead

                    </h3>

                    <p className="mt-2 text-sm text-slate-500">

                        Update lead information.

                    </p>

                </button>

                <button
                    onClick={() => {

                        setSelectedCustomer(lead);

                        setIsDeleteModalOpen(true);

                    }}
                    className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-red-500 hover:shadow-lg"
                >

                    <FiTrash2 className="text-3xl text-red-600" />

                    <h3 className="mt-5 text-xl font-bold">

                        Delete Lead

                    </h3>

                    <p className="mt-2 text-sm text-slate-500">

                        Remove this lead permanently.

                    </p>

                </button>

                <button onClick={onConvertCustomer}
                    className="rounded-2xl border border-slate-200 bg-gradient-to-r from-emerald-500 to-teal-600 p-5 text-left text-white shadow-lg transition hover:-translate-y-1"
                >

                    <FiArrowRightCircle className="text-3xl" />

                    <h3 className="mt-5 text-xl font-bold">

                        Convert To Customer

                    </h3>

                    <p className="mt-2 text-sm text-emerald-50">

                        Create customer after successful deal.

                    </p>

                </button>

            </div>


            {/* Lead Information */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Lead Details */}

                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

                    <h2 className="text-2xl font-bold text-slate-800">

                        Lead Information

                    </h2>

                    <div className="mt-8 space-y-6">

                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">

                            <span className="text-slate-500">

                                Interest

                            </span>

                            <span className="font-semibold text-slate-800">

                                {lead.interest || "-"}

                            </span>

                        </div>

                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">

                            <span className="text-slate-500">

                                Status

                            </span>

                            <span className="font-semibold text-emerald-600">

                                {lead.status}

                            </span>

                        </div>

                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">

                            <span className="text-slate-500">

                                Next Follow-up

                            </span>

                            <span className="font-semibold text-slate-800">

                                {lead.followUpDate
                                    ? new Date(lead.followUpDate).toLocaleDateString("en-IN")
                                    : "-"}

                            </span>

                        </div>

                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">

                            <span className="text-slate-500">

                                Created

                            </span>

                            <span className="font-semibold text-slate-800">

                                {new Date(lead.createdAt).toLocaleDateString("en-IN")}

                            </span>

                        </div>

                        <div className="flex items-center justify-between">

                            <span className="text-slate-500">

                                Last Updated

                            </span>

                            <span className="font-semibold text-slate-800">

                                {new Date(lead.updatedAt).toLocaleDateString("en-IN")}

                            </span>

                        </div>

                    </div>

                </div>

                {/* Address */}

                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

                    <h2 className="text-2xl font-bold text-slate-800">

                        Address

                    </h2>

                    <div className="mt-6 rounded-2xl bg-slate-50 p-6">

                        <p className="leading-8 text-slate-600">

                            {lead.address || "No address available."}

                        </p>

                    </div>

                </div>

            </div>

            {/* Remarks */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

                <h2 className="text-2xl font-bold text-slate-800">

                    Remarks

                </h2>

                <div className="mt-6 rounded-2xl bg-slate-50 p-6 min-h-[180px]">

                    <p className="leading-8 text-slate-600 whitespace-pre-wrap">

                        {lead.remarks || "No remarks available."}

                    </p>

                </div>

            </div>






            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                <h2 className="mb-6 text-2xl font-bold text-slate-800">
                    Lead Timeline
                </h2>

                <div className="space-y-6">

                    <div className="flex items-start gap-4">

                        <div className="mt-1 h-4 w-4 rounded-full bg-blue-500"></div>

                        <div>

                            <h3 className="font-semibold text-slate-800">
                                Lead Created
                            </h3>

                            <p className="text-slate-500">
                                {lead.createdAt
                                    ? new Date(lead.createdAt).toLocaleString("en-IN")
                                    : "-"}
                            </p>

                        </div>

                    </div>

                    <div className="flex items-start gap-4">

                        <div className="mt-1 h-4 w-4 rounded-full bg-yellow-500"></div>

                        <div>

                            <h3 className="font-semibold text-slate-800">
                                Next Follow-up
                            </h3>

                            <p className="text-slate-500">
                                {lead.followUpDate
                                    ? new Date(lead.followUpDate).toLocaleDateString("en-IN")
                                    : "Not Scheduled"}
                            </p>

                        </div>

                    </div>

                    <div className="flex items-start gap-4">

                        <div className="mt-1 h-4 w-4 rounded-full bg-emerald-500"></div>

                        <div>

                            <h3 className="font-semibold text-slate-800">
                                Current Status
                            </h3>

                            <p className="text-slate-500">
                                {lead.status}
                            </p>

                        </div>

                    </div>

                </div>

            </div>




        </div>

    );

}

export default LeadProfileCard;
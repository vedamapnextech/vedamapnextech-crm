import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function SupportDetails() {

    const { id } = useParams();
    const [support, setSupport] = useState(null);


    const getSupport = async () => {

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/supports/${id}`
            );

            const data = await response.json();

            setSupport(data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        getSupport();

    }, [id]);



    const navigate = useNavigate();
    if (!support) {
        return (
            <div className="p-10 text-xl font-semibold">
                Loading...
            </div>
        );
    }

    return (

        <div className="space-y-8">

            <button
                onClick={() => navigate("/support")}
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold hover:bg-emerald-500 hover:text-white transition"
            >
                ← Back to Support
            </button>



            <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl">

                {/* Hero */}

                <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 p-10">

                    <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>

                    <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

                        <div>

                            <p className="text-xs font-bold uppercase tracking-[0.4em] text-cyan-100">
                                Vedamap Nextech CRM
                            </p>

                            <h1 className="mt-4 text-5xl font-black text-white">
                                🎧 Support Ticket
                            </h1>

                            <p className="mt-3 max-w-2xl text-cyan-100 text-lg">
                                View complete ticket information, customer details,
                                engineer assignment and issue progress.
                            </p>

                        </div>
                        <div className="flex flex-wrap gap-4">

                            <span
                                className={`rounded-full px-6 py-3 font-bold text-white backdrop-blur border
        ${support.priority === "High"
                                        ? "border-red-300 bg-red-500/20"
                                        : support.priority === "Medium"
                                            ? "border-yellow-300 bg-yellow-500/20"
                                            : "border-emerald-300 bg-emerald-500/20"
                                    }`}
                            >
                                {support.priority === "High"
                                    ? "🔴 High Priority"
                                    : support.priority === "Medium"
                                        ? "🟡 Medium Priority"
                                        : "🟢 Low Priority"}
                            </span>

                            <span
                                className={`rounded-full px-6 py-3 font-bold text-white backdrop-blur border
        ${support.status === "Open"
                                        ? "border-yellow-300 bg-yellow-500/20"
                                        : support.status === "In Progress"
                                            ? "border-blue-300 bg-blue-500/20"
                                            : "border-emerald-300 bg-emerald-500/20"
                                    }`}
                            >
                                {support.status === "Open"
                                    ? "🟡 Open"
                                    : support.status === "In Progress"
                                        ? "🔵 In Progress"
                                        : "🟢 Closed"}
                            </span>

                        </div>

                    </div>

                </div>

                {/* Quick Stats */}

                <div className="grid gap-6 p-8 md:grid-cols-2 xl:grid-cols-4">

                    <div className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:bg-white hover:shadow-xl">

                        <p className="text-sm text-slate-500">
                            Ticket Number
                        </p>

                        <h2 className="mt-3 text-3xl font-black text-slate-800">
                            SUP-{support._id.slice(-6).toUpperCase()}
                        </h2>

                    </div>

                    <div className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-400 hover:bg-white hover:shadow-xl">

                        <p className="text-sm text-slate-500">
                            Created Date
                        </p>

                        <h2 className="mt-3 text-2xl font-black text-slate-800">
                            {new Date(support.createdAt).toLocaleDateString("en-GB")}
                        </h2>

                    </div>

                    <div className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-orange-400 hover:bg-white hover:shadow-xl">

                        <p className="text-sm text-slate-500">
                            Engineer
                        </p>

                        <h2 className="mt-3 text-2xl font-black text-slate-800">
                            {support.engineer || "Not Assigned"}
                        </h2>

                    </div>

                    <div className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-blue-400 hover:bg-white hover:shadow-xl">

                        <p className="text-sm text-slate-500">
                            Customer
                        </p>

                        <h2 className="mt-3 text-2xl font-black text-slate-800">
                            {support.customer?.name}
                        </h2>

                    </div>

                </div>

            </div>




            {/* Customer + Ticket Information */}

            <div className="grid gap-8 lg:grid-cols-2">

                {/* Customer Card */}

                <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-emerald-400 hover:shadow-2xl">

                    <div className="mb-8 flex items-center justify-between">

                        <div>

                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">
                                Customer
                            </p>

                            <h2 className="mt-2 text-3xl font-black text-slate-800">
                                Customer Information
                            </h2>

                        </div>

                        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-4xl shadow-md">
                            👤
                        </div>

                    </div>

                    <div className="space-y-6">

                        <div className="flex justify-between border-b border-slate-100 pb-4">
                            <span className="text-slate-500">Customer Name</span>
                            <span className="font-bold text-slate-800">
                                {support.customer?.name}
                            </span>
                        </div>

                        <div className="flex justify-between border-b border-slate-100 pb-4">
                            <span className="text-slate-500">Phone</span>
                            <span className="font-semibold">
                                {support.customer?.phone}
                            </span>
                        </div>

                        <div className="flex justify-between border-b border-slate-100 pb-4">
                            <span className="text-slate-500">City</span>
                            <span className="font-semibold">
                                {support.customer?.city}
                            </span>
                        </div>

                        <div className="flex justify-between border-b border-slate-100 pb-4">
                            <span className="text-slate-500">Email</span>
                            <span className="font-semibold">
                                {support.customer?.email}
                            </span>
                        </div>
                        <div className="flex items-center justify-between border-b border-slate-100 py-4">
                            <span className="text-slate-500">
                                Customer Status
                            </span>

                            <span className="rounded-full bg-emerald-100 px-4 py-2 font-semibold text-emerald-700">
                                {support.customer?.status}
                            </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-slate-100 py-4">
                            <span className="text-slate-500">
                                WB Code
                            </span>

                            <span className="font-semibold">
                                {support.wbCode}
                            </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-slate-100 py-4">
                            <span className="text-slate-500">
                                Site Name
                            </span>

                            <span className="font-semibold">
                                {support.siteName}
                            </span>
                        </div>



                        <div className="flex items-center justify-between border-b border-slate-100 py-4">

                            <span className="text-slate-500">
                                Contact Person
                            </span>

                            <span className="font-semibold">
                                {support.contactPerson}
                            </span>

                        </div>

                       


                    </div>

                </div>

                {/* Ticket Card */}

                <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-sky-400 hover:shadow-2xl">

                    <div className="mb-8 flex items-center justify-between">

                        <div>

                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">
                                Ticket
                            </p>

                            <h2 className="mt-2 text-3xl font-black text-slate-800">
                                Ticket Information
                            </h2>

                        </div>

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-3xl">
                            🎫
                        </div>

                    </div>

                    <div className="space-y-6">



                        <div className="flex justify-between border-b border-slate-100 pb-4">

                            <span className="text-slate-500">
                                Complaint Type
                            </span>

                            <span className="font-semibold">
                                {support.complaintType}
                            </span>

                        </div>


                        <div className="flex justify-between border-b border-slate-100 pb-4">

                            <span className="text-slate-500">
                                Ticket Source
                            </span>

                            <span className="font-semibold">
                                {support.ticketSource}
                            </span>

                        </div>



                        <div className="flex justify-between border-b border-slate-100 pb-4">
                            <span className="text-slate-500">Subject</span>
                            <span className="font-bold text-slate-800">
                                {support.subject}
                            </span>
                        </div>

                        <div className="flex justify-between border-b border-slate-100 pb-4">

                            <span className="text-slate-500">
                                Priority
                            </span>

                            <span className="rounded-full bg-red-100 px-4 py-2 font-semibold text-red-700">
                                {support.priority}
                            </span>

                        </div>

                        <div className="flex justify-between border-b border-slate-100 pb-4">

                            <span className="text-slate-500">
                                Status
                            </span>

                            <span className="rounded-full bg-yellow-100 px-4 py-2 font-semibold text-yellow-700">
                                {support.status}
                            </span>

                        </div>

                        <div className="flex justify-between border-b border-slate-100 pb-4">

                            <span className="text-slate-500">
                                Engineer
                            </span>

                            <span className="font-semibold">
                                {support.engineer || "Not Assigned"}
                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span className="text-slate-500">
                                Last Updated
                            </span>

                            <span className="font-semibold">
                                {new Date(support.updatedAt).toLocaleDateString("en-GB")}
                            </span>

                        </div>

                        <div className="flex items-center justify-between py-4">
                            <span className="text-slate-500">
                                Location
                            </span>

                            <span className="font-semibold">
                                {support.location}
                            </span>
                        </div>


                        <div className="flex items-center justify-between py-4">

                            <span className="text-slate-500">
                                Mobile Number
                            </span>

                            <span className="font-semibold">
                                {support.mobileNumber}
                            </span>

                        </div>


                    </div>

                </div>







            </div>

            {/* Description */}

            <div className="group mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-violet-400 hover:shadow-2xl">

                <div className="mb-6 flex items-center justify-between">

                    <div>

                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-500">
                            Description
                        </p>

                        <h2 className="mt-2 text-3xl font-black text-slate-800">
                            📝 Issue Description
                        </h2>

                    </div>

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-3xl">
                        📝
                    </div>

                </div>

                <div className="rounded-2xl bg-slate-50 p-6 leading-8 text-slate-600">

                    {support.description}

                </div>

            </div>




            <div className="group mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">

                <div className="mb-6">

                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">
                        Resolution
                    </p>

                    <h2 className="mt-2 text-3xl font-black text-slate-800">
                        Resolution Notes
                    </h2>

                </div>

                <div className="rounded-2xl bg-slate-50 p-6 leading-8">

                    {support.resolutionNotes
                        ? support.resolutionNotes
                        : "No Resolution Added Yet"}

                </div>

            </div>




            {/* Action Buttons */}

            <div className="mt-8 flex flex-wrap justify-end gap-5">

                <button
                    className="
            rounded-2xl
            bg-emerald-500
            px-8
            py-4
            font-bold
            text-white
            shadow-xl
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-emerald-600
            hover:shadow-2xl
        "
                >
                    ✏️ Edit Ticket
                </button>

                <button
                    className="
            rounded-2xl
            bg-red-500
            px-8
            py-4
            font-bold
            text-white
            shadow-xl
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-red-600
            hover:shadow-2xl
        "
                >
                    🗑 Delete Ticket
                </button>

            </div>



        </div>



    );

}

export default SupportDetails;
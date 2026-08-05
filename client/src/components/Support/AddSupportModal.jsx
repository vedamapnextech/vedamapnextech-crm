import Select from "react-select";
import { FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";

function AddSupportModal({
    setOpenModal,
    getSupports,
    customers,
    selectedSupport,
    setSelectedSupport,
}) {


    const [supportData, setSupportData] = useState({
        customer: "",
        wbCode: "",
        siteName: "",
        location: "",
        complaintType: "RFID",
        subject: "",
        description: "",
        priority: "Medium",
        status: "Open",
        engineer: "",
        resolutionNotes: "",
        contactPerson: "",
        mobileNumber: "",
        ticketSource: "Phone Call",
    });
    const subjectRef = useRef(null);


    useEffect(() => {

        if (selectedSupport) {

            setSupportData({
                customer: selectedSupport.customer?._id || "",
                subject: selectedSupport.subject || "",
                description: selectedSupport.description || "",
                priority: selectedSupport.priority || "Medium",
                status: selectedSupport.status || "Open",
                wbCode: selectedSupport.wbCode || "",
                engineer: selectedSupport.engineer || "",
                siteName: selectedSupport.siteName || "",
                location: selectedSupport.location || "",
                complaintType: selectedSupport?.complaintType || "RFID",
                resolutionNotes: selectedSupport.resolutionNotes || "",
                contactPerson: selectedSupport?.contactPerson || "",
                mobileNumber: selectedSupport?.mobileNumber || "",
                ticketSource: selectedSupport.ticketSource || "Phone Call",
            });

        }

        setTimeout(() => {
            subjectRef.current?.focus();
        }, 100);

    }, [selectedSupport]);


    const handleChange = (e) => {
        setSupportData({
            ...supportData,
            [e.target.name]: e.target.value,
        });
    };



    const handleSubmit = async () => {

        if (
            !supportData.customer ||
            !supportData.wbCode.trim() ||
            !supportData.siteName.trim() ||
            !supportData.location.trim() ||
            !supportData.contactPerson.trim() ||
            !supportData.mobileNumber.trim() ||
            !supportData.ticketSource.trim() ||
            !supportData.complaintType.trim() ||
            !supportData.subject.trim() ||
            !supportData.description.trim()
        ) {
            toast.error("Please fill all required fields.");
            return;
        }

        if (!/^[6-9]\d{9}$/.test(supportData.mobileNumber)) {
            toast.error("Enter a valid mobile number.");
            return;
        }

        try {

            const response = await fetch(
                selectedSupport
                    ? `${import.meta.env.VITE_API_URL}/api/supports/${selectedSupport._id}`
                    : `${import.meta.env.VITE_API_URL}/api/supports`,
                {
                    method: selectedSupport ? "PUT" : "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify(supportData),
                }
            );

            const data = await response.json();

            console.log(data);

            toast.success(
                selectedSupport
                    ? "Support Ticket Updated Successfully."
                    : "Support Ticket Created Successfully."
            );

            getSupports();
            setSelectedSupport(null);
            setOpenModal(false);

        } catch (error) {

            console.log(error);
            toast.error("Something went wrong.");

        }

    };




    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <div className="
    w-full
    max-w-5xl
    max-h-[90vh]
    overflow-y-auto
    rounded-3xl
    bg-white
    p-8
    shadow-2xl
">

                {/* Header */}

                <div className="mb-8 flex items-center justify-between">

                    <div>

                        <h2 className="text-3xl font-black text-slate-800">
                            {selectedSupport ? "Edit Support Ticket" : "Add Support Ticket"}
                        </h2>

                        <p className="mt-2 text-slate-500">
                            {selectedSupport
                                ? "Update customer support ticket."
                                : "Create a new customer support request."}
                        </p>

                    </div>

                    <button
                        onClick={() => setOpenModal(false)}
                        className="rounded-xl bg-slate-100 p-3 hover:bg-red-500 hover:text-white transition"
                    >
                        <FiX size={22} />
                    </button>

                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                        {/* Customer */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Customer
                            </label>
                            <Select
                                options={customers.map((customer) => ({
                                    value: customer._id,
                                    label: `${customer.name} (${customer.city})`,
                                }))}

                                value={
                                    customers
                                        .map((customer) => ({
                                            value: customer._id,
                                            label: `${customer.name} (${customer.city})`,
                                        }))
                                        .find(
                                            (option) => option.value === supportData.customer
                                        ) || null
                                }

                                onChange={(selectedOption) =>
                                    setSupportData({
                                        ...supportData,
                                        customer: selectedOption?.value || "",
                                    })
                                }

                                placeholder="Select Customer"

                                isSearchable

                                className="text-sm"
                            />

                        </div>






                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                WB Code
                            </label>

                            <input
                                type="text"
                                name="wbCode"

                                value={supportData.wbCode}
                                onChange={handleChange}
                                placeholder="Enter WB Code"
                                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-emerald-500"
                            />

                        </div>




                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Site Name
                            </label>

                            <input
                                type="text"
                                name="siteName"
                                value={supportData.siteName}
                                onChange={handleChange}
                                placeholder="Enter Site Name"
                                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-emerald-500"
                            />

                        </div>





                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                value={supportData.location}
                                onChange={handleChange}
                                placeholder="Enter Location"
                                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-emerald-500"
                            />

                            <input
                                type="text"
                                name="contactPerson"
                                value={supportData.contactPerson}
                                onChange={handleChange}
                                placeholder="Enter Contact Person"
                            />


                            <input
                                type="tel"
                                name="mobileNumber"
                                value={supportData.mobileNumber}
                                onChange={handleChange}
                                placeholder="Enter Mobile Number"
                            />


                        </div>






                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Ticket Source
                            </label>

                            <select
                                name="ticketSource"
                                value={supportData.ticketSource}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-emerald-500"
                            >
                                <option value="Phone Call">Phone Call</option>
                                <option value="WhatsApp">WhatsApp</option>
                                <option value="Email">Email</option>
                                <option value="Website">Website</option>
                                <option value="Walk-In">Walk-In</option>
                                <option value="Other">Other</option>
                            </select>

                        </div>




                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Complaint Type
                            </label>

                            <select
                                name="complaintType"
                                value={supportData.complaintType}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-emerald-500"
                            >
                                <option value="RFID">RFID</option>
                                <option value="Indicator">Indicator</option>
                                <option value="Load Cell">Load Cell</option>
                                <option value="Printer">Printer</option>
                                <option value="Camera">Camera</option>
                                <option value="Software">Software</option>
                                <option value="Network">Network</option>
                                <option value="Power Supply">Power Supply</option>
                                <option value="Boom Barrier">Boom Barrier</option>
                                <option value="Traffic Signal">Traffic Signal</option>
                                <option value="Display Board">Display Board</option>
                                <option value="Calibration">Calibration</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>


                        {/* Subject */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Subject
                            </label>

                            <input
                                ref={subjectRef}
                                type="text"
                                name="subject"
                                value={supportData.subject}
                                onChange={handleChange}
                                placeholder="Enter Subject"
                                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-emerald-500"
                            />

                        </div>

                        {/* Priority */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Priority
                            </label>

                            <select
                                name="priority"
                                value={supportData.priority}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-emerald-500"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>

                        </div>

                        {/* Status */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Status
                            </label>

                            <select
                                name="status"
                                value={supportData.status}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-emerald-500"
                            >
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Closed">Closed</option>
                            </select>

                        </div>
                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Assign Engineer
                            </label>

                            <select
                                name="engineer"
                                value={supportData.engineer}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-emerald-500"
                            >
                                <option value="">Not Assigned</option>
                                <option value="Ajith Saini">Ajith Saini</option>
                                <option value="Rahul Sharma">Rahul Sharma</option>
                                <option value="Manoj Kumar">Manoj Kumar</option>
                            </select>

                        </div>

                    </div>

                    {/* Description */}

                    <div className="mt-6">

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Description
                        </label>

                        <textarea
                            rows={5}
                            name="description"
                            value={supportData.description}
                            onChange={handleChange}
                            placeholder="Describe customer issue..."
                            className="w-full resize-none rounded-xl border border-slate-300 p-3 outline-none focus:border-emerald-500"
                        />

                    </div>

                    <div className="mt-6">

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Resolution Notes
                        </label>

                        <textarea
                            rows={4}
                            name="resolutionNotes"
                            value={supportData.resolutionNotes}
                            onChange={handleChange}
                            placeholder="Engineer Resolution..."
                            className="w-full resize-none rounded-xl border border-slate-300 p-3 outline-none focus:border-emerald-500"
                        />

                    </div>



                    {/* Buttons */}

                    <div className="mt-8 flex justify-end gap-4">

                        <button
                            type="button"
                            onClick={() => setOpenModal(false)}
                            className="rounded-xl border border-slate-300 px-6 py-3 font-semibold"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600"
                        >
                            {selectedSupport ? "Update Ticket" : "Save Ticket"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddSupportModal;
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
function AddLeadModal({
    setOpenModal,
    customers,
    setCustomers,
    selectedCustomer,
    setSelectedCustomer,
    getCustomers,
}) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        company: "",
        city: "",
        interest: "",
        status: "New",

        priority: "Medium",

        expectedValue: "",

        followUpDate: "",

        address: "",

        remarks: "",
    });
    useEffect(() => {
        if (selectedCustomer) {
            setFormData(selectedCustomer);
        }
    }, [selectedCustomer]);


    const handleChange = (e) => {

        let { name, value } = e.target;

        // Phone Validation
        if (name === "phone") {
            value = value.replace(/\D/g, "").slice(0, 10);
        }

        // Auto Capitalize
        if (
            name === "name" ||
            name === "company" ||
            name === "city" ||
            name === "interest"
        ) {
            value = value
                .toLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase());
        }

        setFormData({
            ...formData,
            [name]: value,
        });

    };

    const handleSubmit = () => {

        if (
            !formData.name.trim() ||
            !formData.phone.trim() ||
            !formData.company.trim() ||
            !formData.city.trim() ||
            !formData.interest.trim()
        ) {

            toast.error("Please fill all required fields.");

            return;

        }

        if (formData.phone.length !== 10) {

            toast.error("Phone Number must be 10 digits.");

            return;

        }

        const url = selectedCustomer
            ? `${import.meta.env.VITE_API_URL}/leads/${selectedCustomer._id}`
            : `${import.meta.env.VITE_API_URL}/leads`;

        const method = selectedCustomer ? "PUT" : "POST";

        fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then(() => {

                toast.success(
                    selectedCustomer
                        ? "Lead updated successfully."
                        : "Lead added successfully."
                );

                getCustomers();

                setFormData({
                    name: "",
                    phone: "",
                    company: "",
                    city: "",
                    interest: "",
                    status: "New",

                    priority: "Medium",

                    expectedValue: "",

                    followUpDate: "",

                    address: "",

                    remarks: "",
                });

                setSelectedCustomer(null);

                setOpenModal(false);

            })
            .catch(() => {

                toast.error("Something went wrong.");

            });

    };




    return (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl p-6"> <div

                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSubmit();
                    }
                }}
            >

            </div>
                {/* Header */}

                <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-6">

                    <div>

                        <h2 className="text-3xl font-bold text-slate-800">
                            {selectedCustomer ? "Edit Lead" : "Add Lead"}
                        </h2>
                        <p className="mt-1 text-sm text-slate-400">
                            Fields marked with * are required.
                        </p>

                        <p className="mt-2 text-slate-500">
                            Capture and manage lead information.
                        </p>

                    </div>

                    <button

                        onClick={() => {

                            setSelectedCustomer(null);

                            setOpenModal(false);

                        }}

                        className="rounded-xl bg-red-100 px-4 py-2 font-bold text-red-600 transition hover:bg-red-600 hover:text-white"

                    >

                        ✕

                    </button>

                </div>







                <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4">

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Lead Name <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter lead name"
                            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Phone Number <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Company Name <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Enter company name"
                            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            City <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Enter city"
                            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                        />

                    </div>





                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Interest <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="text"
                            name="interest"
                            value={formData.interest}
                            onChange={handleChange}
                            placeholder="Enter lead interest"
                            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                        />
                    </div>
















                    <div>

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                          Lead Status <span className="text-red-500">*</span>
                        </label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                        >
                            <option value="New">New</option>
                            <option value="Follow-up">Follow-up</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Converted">Converted</option>
                            <option value="Lost">Lost</option>
                        </select>

                    </div>




                    <div>

                        <label className="mb-2 block text-sm font-semibold text-slate-700">

                            Priority

                        </label>

                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                        >

                            <option value="High">High</option>

                            <option value="Medium">Medium</option>

                            <option value="Low">Low</option>

                        </select>

                    </div>

                    


                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Next Follow-up
                        </label>

                        <input
                            type="date"
                            name="followUpDate"
                            value={formData.followUpDate}
                            onChange={handleChange}
                            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                        />
                    </div>

                </div>



                <div className="mt-4 md:col-span-2">

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Address
                    </label>

                    <textarea
                        name="address"
                        placeholder="Enter lead address"
                        value={formData.address}
                        onChange={handleChange}
                        maxLength={1000}
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 h-28 resize-none outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                    />

                    <div className="mt-2 text-right text-sm text-slate-500">

                        {formData.address.length}/1000

                    </div>

                </div>




                <div className="mt-5">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Remarks
                    </label>

                    <textarea
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        rows={4}
                        maxLength={1000}
                        placeholder="Write follow-up notes..."
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                    />
                </div>



                <div className="flex justify-end gap-4 mt-5">

                    <button onClick={() => {
                        setSelectedCustomer(null);
                        setOpenModal(false);
                    }}
                        className="px-6 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition"
                    >
                        {selectedCustomer ? "Update Lead" : "Save Lead"}
                    </button>

                </div>

            </div>

        </div>

    );
}

export default AddLeadModal;
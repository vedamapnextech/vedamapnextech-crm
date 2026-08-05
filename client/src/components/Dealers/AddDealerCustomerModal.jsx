import { useEffect, useState } from "react";
import toast from "react-hot-toast";


function AddDealerCustomerModal({
    dealerId,
    setOpenModal,
    selectedCustomer,
    setSelectedCustomer,
    getCustomers,
    getAllCustomers,
}) {
    const [dealers, setDealers] = useState([]);

    const [formData, setFormData] = useState({

        wbCode: "",

        name: "",

        company: "",

        contactPerson: "",

        phone: "",

        email: "",

        gstNumber: "",

        city: "",

        dealer: "",

        address: "",

        status: "Active",



    });

    useEffect(() => {

        if (selectedCustomer) {

            setFormData({

                wbCode: selectedCustomer.wbCode || "",

                name: selectedCustomer.name || "",

                company: selectedCustomer.company || "",

                contactPerson:
                    selectedCustomer.contactPerson || "",

                phone: selectedCustomer.phone || "",

                email: selectedCustomer.email || "",

                dealer: selectedCustomer?.dealer || "",

                gstNumber:
                    selectedCustomer.gstNumber || "",

                city: selectedCustomer.city || "",

                address: selectedCustomer.address || "",

                status:
                    selectedCustomer.status || "Active",



            });

        }

    }, [selectedCustomer]);

    useEffect(() => {
        getDealers();
    }, []);

    const getDealers = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/dealers`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            setDealers(data);

        } catch (error) {
            console.log(error);
            toast.error("Failed to load dealers");
        }
    };

    const handleChange = (e) => {

        let { name, value } = e.target;

        if (name === "phone") {

            value = value
                .replace(/\D/g, "")
                .slice(0, 10);

        }

        if (

            name === "name" ||

            name === "company" ||

            name === "contactPerson" ||

            name === "city"

        ) {

            value = value

                .toLowerCase()

                .replace(

                    /\b\w/g,

                    (char) => char.toUpperCase()

                );

        }

        if (name === "gstNumber") {

            value = value.toUpperCase();

        }

        setFormData({

            ...formData,

            [name]: value,

        });

    };



    const handleSubmit = async () => {


        if (
            !formData.dealer ||
            !formData.wbCode.trim() ||
            !formData.name.trim() ||
            !formData.company.trim() ||
            !formData.phone.trim() ||
            !formData.city.trim()
        ) {
            toast.error("Please fill all required fields.");
            return;
        }

        if (formData.phone.length !== 10) {

            toast.error("Phone Number must be 10 digits.");

            return;

        }

        console.log(formData);
        const url = selectedCustomer
            ? `${import.meta.env.VITE_API_URL}/api/dealer-customers/${selectedCustomer._id}`
            : `${import.meta.env.VITE_API_URL}/api/dealer-customers`;

        const method =

            selectedCustomer

                ? "PUT"

                : "POST";

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(url, {

                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message);
                return;
            }

            toast.success(
                selectedCustomer
                    ? "Dealer Customer Updated Successfully"
                    : "Dealer Customer Added Successfully"
            );

            getAllCustomers();
            setSelectedCustomer(null);
            setOpenModal(false);

        } catch (error) {

            toast.error("Something went wrong.");

        }

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">

                {/* Header */}

                <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-5">

                    <div>

                        <h2 className="text-3xl font-bold text-slate-800">

                            {selectedCustomer
                                ? "Edit Dealer Customer"
                                : "Add Dealer Customer"}

                        </h2>

                        <p className="mt-2 text-slate-500">

                            Fill dealer customer information below.
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



                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    {/* Dealer */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold">
                            Dealer *
                        </label>

                        <select
                            name="dealer"
                            value={formData.dealer}
                            onChange={handleChange}
                            className="w-full rounded-2xl border px-4 py-3"
                        >
                            <option value="">Select Dealer</option>
                            {dealers.map((dealer) => (
                                <option key={dealer._id} value={dealer._id}>
                                    {dealer.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* WB Code */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold">

                            WB Code

                        </label>

                        <input
                            type="text"
                            name="wbCode"
                            value={formData.wbCode}
                            onChange={handleChange}
                            placeholder="Enter WB Code"
                            className="w-full rounded-2xl border px-4 py-3"
                        />

                    </div>



                    {/* Customer Name */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold">

                            Customer Name *

                        </label>

                        <input

                            type="text"

                            name="name"

                            value={formData.name}

                            onChange={handleChange}

                            className="w-full rounded-2xl border px-4 py-3"

                        />

                    </div>



                    {/* Company */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold">

                            Company *

                        </label>

                        <input

                            type="text"

                            name="company"

                            value={formData.company}

                            onChange={handleChange}

                            className="w-full rounded-2xl border px-4 py-3"

                        />

                    </div>



                    {/* Contact Person */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold">

                            Contact Person

                        </label>

                        <input

                            type="text"

                            name="contactPerson"

                            value={formData.contactPerson}

                            onChange={handleChange}

                            className="w-full rounded-2xl border px-4 py-3"

                        />

                    </div>



                    {/* Phone */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold">

                            Phone *

                        </label>

                        <input

                            type="text"

                            name="phone"

                            value={formData.phone}

                            onChange={handleChange}

                            className="w-full rounded-2xl border px-4 py-3"

                        />

                    </div>



                    {/* Email */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold">

                            Email

                        </label>

                        <input

                            type="email"

                            name="email"

                            value={formData.email}

                            onChange={handleChange}

                            className="w-full rounded-2xl border px-4 py-3"

                        />

                    </div>



                    {/* GST */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold">

                            GST Number

                        </label>

                        <input

                            type="text"

                            name="gstNumber"

                            value={formData.gstNumber}

                            onChange={handleChange}

                            className="w-full rounded-2xl border px-4 py-3 uppercase"

                        />

                    </div>



                    {/* City */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold">

                            City *

                        </label>

                        <input

                            type="text"

                            name="city"

                            value={formData.city}

                            onChange={handleChange}

                            className="w-full rounded-2xl border px-4 py-3"

                        />

                    </div>



                    {/* Status */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold">

                            Status

                        </label>

                        <select

                            name="status"

                            value={formData.status}

                            onChange={handleChange}

                            className="w-full rounded-2xl border px-4 py-3"

                        >

                            <option value="Active">

                                Active

                            </option>

                            <option value="Inactive">

                                Inactive

                            </option>

                        </select>

                    </div>

                </div>



                {/* Address */}

                <div className="mt-6">

                    <label className="mb-2 block text-sm font-semibold">

                        Address

                    </label>

                    <textarea

                        name="address"

                        rows={3}

                        value={formData.address}

                        onChange={handleChange}

                        className="w-full rounded-2xl border px-4 py-3"

                    />

                </div>




                {/* Footer */}

                <div className="mt-8 flex justify-end gap-4 border-t border-slate-200 pt-6">

                    <button
                        onClick={() => {
                            setSelectedCustomer(null);
                            setOpenModal(false);
                        }}
                        className="rounded-xl border border-slate-300 px-6 py-3 font-semibold transition hover:bg-slate-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="rounded-xl bg-emerald-500 px-8 py-3 font-semibold text-white transition hover:bg-emerald-600"
                    >
                        {selectedCustomer
                            ? "Update Dealer Customer"
                            : "Save Dealer Customer"}
                    </button>

                </div>

            </div>

        </div>

    );

}

export default AddDealerCustomerModal;
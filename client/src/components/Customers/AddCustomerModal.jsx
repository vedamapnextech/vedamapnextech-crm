import { useState, useEffect } from "react";
function AddCustomerModal({ setOpenModal, customers,
    setCustomers, selectedCustomer, setSelectedCustomer, }) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        company: "",
        city: "",
        email: "",
        product: "",
        address: "",
    });
    useEffect(() => {
        if (selectedCustomer) {
            setFormData(selectedCustomer);
        }
    }, [selectedCustomer]);
    const handleChange = (e) => {

        setFormData({
            ...formData,

            [e.target.name]: e.target.value,

        });

    };
    const handleSubmit = () => {
        if (
            formData.name.trim() === "" ||
            formData.phone.trim() === ""
        ) {
            alert("Customer Name and Phone are required.");
            return;
        }
        if (selectedCustomer) {
            setCustomers(
                customers.map((customer) => {
                    if (customer.id === selectedCustomer.id) {
                        return {
                            ...customer,
                            ...formData,
                        };
                    }

                    return customer;
                })
            );
            setOpenModal(false);
            setSelectedCustomer(null);
            return;
        }
        const newCustomer = {
            id: customers.length + 1,
            ...formData,
            status: "Active",
        };
        setCustomers([...customers, newCustomer]);
        setFormData({
            name: "",
            phone: "",
            company: "",
            city: "",
            email: "",
            product: "",
            address: "",
        });
        setSelectedCustomer(null);
        setOpenModal(false);
    };
    return (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6">
                <h2 className="text-2xl font-bold text-slate-800 leading-tight">
                    {selectedCustomer ? "Edit Customer" : "Add New Customer"}
                </h2>

                <p className="text-slate-500 mt-2">
                    Fill customer details below.
                </p>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-5">

                    <input
                        type="text"
                        placeholder="Customer Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                    <input
                        type="text"
                        name="company"
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={handleChange}
                        className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                        type="text"
                        name="product"
                        placeholder="Product"
                        value={formData.product}
                        onChange={handleChange}
                        className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>


                <textarea
                    name="address"
                    placeholder="Customer Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full mt-5 border border-slate-300 rounded-xl px-4 py-3 h-24 outline-none focus:ring-2 focus:ring-emerald-500"
                />
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
                        {selectedCustomer ? "Update Customer" : "Save Customer"}
                    </button>

                </div>

            </div>

        </div>

    );
}

export default AddCustomerModal;
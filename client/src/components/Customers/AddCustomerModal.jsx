import { useState, useEffect } from "react";
function AddCustomerModal({
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
        email: "",
        product: "",
        address: "",

        quantity: 1,
        unitPrice: "",
        totalAmount: "",
        paidAmount: "",
        pendingAmount: "",
        paymentStatus: "Pending",
        customerSince: new Date().toISOString().split("T")[0],
    });
    useEffect(() => {
        if (selectedCustomer) {
            setFormData(selectedCustomer);
        }
    }, [selectedCustomer]);


    const handleChange = (e) => {
        const { name, value } = e.target;

        const updatedData = {
            ...formData,
            [name]: value,
        };

        const quantity = Number(updatedData.quantity) || 0;
        const unitPrice = Number(updatedData.unitPrice) || 0;
        const paidAmount = Number(updatedData.paidAmount) || 0;

        updatedData.totalAmount = quantity * unitPrice;
        updatedData.pendingAmount = Math.max(
            updatedData.totalAmount - paidAmount,
            0
        );
        if (updatedData.pendingAmount === 0) {
            updatedData.paymentStatus = "Paid";
        } else if (paidAmount > 0) {
            updatedData.paymentStatus = "Partial";
        } else {
            updatedData.paymentStatus = "Pending";
        }
        setFormData(updatedData);
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

            fetch(`${import.meta.env.VITE_API_URL}/customers/${selectedCustomer._id}`, {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(formData),
            })
                .then((res) => res.json())
                .then((data) => {

                    console.log(data);

                    getCustomers();

                    setFormData({
                        name: "",
                        phone: "",
                        company: "",
                        city: "",
                        email: "",
                        product: "",
                        address: "",


                        quantity: 1,
                        unitPrice: "",
                        totalAmount: "",
                        paidAmount: "",
                        pendingAmount: "",
                        paymentStatus: "Pending",
                        customerSince: new Date().toISOString().split("T")[0],
                    });

                    setSelectedCustomer(null);

                    setOpenModal(false);

                });

            return;
        }
        // const newCustomer = {
        //     id: customers.length + 1,
        //     ...formData,
        //     status: "Active",
        // };
        // setCustomers([...customers, newCustomer]);
        // setFormData({
        //     name: "",
        //     phone: "",
        //     company: "",
        //     city: "",
        //     email: "",
        //     product: "",
        //     address: "",
        // });
        // setSelectedCustomer(null);
        // setOpenModal(false);

        fetch(`${import.meta.env.VITE_API_URL}/customers`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

                getCustomers();

                setFormData({
                    name: "",
                    phone: "",
                    company: "",
                    city: "",
                    email: "",
                    product: "",
                    address: "",

                    quantity: 1,
                    unitPrice: "",
                    totalAmount: "",
                    paidAmount: "",
                    pendingAmount: "",
                    paymentStatus: "Pending",
                    customerSince: new Date().toISOString().split("T")[0],

                });

                setSelectedCustomer(null);

                setOpenModal(false);
            });

    };
    return (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl p-6"> <div
                className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl p-6"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSubmit();
                    }
                }}
            ></div>               
            <h2 className="text-2xl font-bold text-slate-800 leading-tight">
                    {selectedCustomer ? "Edit Customer" : "Add New Customer"}
                </h2>

                <p className="text-slate-500 mt-2">
                    Fill customer details below.
                </p>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4">

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


                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                    <input
                        type="number"
                        name="unitPrice"
                        placeholder="Unit Price"
                        value={formData.unitPrice}
                        onChange={handleChange}
                        className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                    <input
                        type="number"
                        name="paidAmount"
                        placeholder="Paid Amount"
                        value={formData.paidAmount}
                        onChange={handleChange}
                        className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                    <input
                        type="number"
                        value={formData.totalAmount}
                        readOnly
                        placeholder="Total Amount"
                        className="border border-slate-300 rounded-xl px-4 py-3 bg-slate-100"
                    />

                    <input
                        type="number"
                        value={formData.pendingAmount}
                        readOnly
                        placeholder="Pending Amount"
                        className="border border-slate-300 rounded-xl px-4 py-3 bg-slate-100"
                    />

                    <select
                        name="paymentStatus"
                        value={formData.paymentStatus}
                        onChange={handleChange}
                        className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Partial">Partial</option>
                        <option value="Paid">Paid</option>
                    </select>




                </div>


                <textarea
                    name="address"
                    placeholder="Customer Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full mt-4 border border-slate-300 rounded-xl px-4 py-3 h-20 resize-none outline-none focus:ring-2 focus:ring-emerald-500" />
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
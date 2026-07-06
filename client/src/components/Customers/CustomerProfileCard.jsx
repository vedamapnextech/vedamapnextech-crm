function CustomerProfileCard({
    customer,
    setOpenModal,
    setSelectedCustomer,
    setOpenProductModal,
}) {
    console.log(customer);
    return (
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">

            {/* Top Gradient */}
            <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500"></div>

            <div className="p-8">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                    {/* Left Side */}

                    <div className="flex items-center gap-6">

                        <div className="relative group">

                            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-5xl font-bold shadow-2xl shadow-emerald-500/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 cursor-pointer">

                                {customer.name.charAt(0)}

                            </div>

                            <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-green-500 border-4 border-white animate-pulse"></div>

                        </div>

                        <div>

                            <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
                                {customer.name}
                            </h1>

                            <p className="text-slate-500 mt-2">
                                {customer.company}
                            </p>

                            <div className="flex gap-3 mt-5">

                                <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-sm">
                                    🟢 Active Customer
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* Right Side */}

                    <div className="flex flex-wrap gap-4">

                        <button onClick={() => window.open(`tel:${customer.phone}`)}
                            className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 hover:-translate-y-1 hover:scale-105 transition-all duration-300 text-white font-semibold shadow-lg shadow-emerald-500/30">

                            📞 Call

                        </button>

                        <button onClick={() =>
                            window.open(`https://wa.me/91${customer.phone}`, "_blank")
                        } className="px-6 py-3 rounded-2xl bg-green-500 hover:bg-green-600 hover:-translate-y-1 hover:scale-105 transition-all duration-300 text-white font-semibold shadow-lg shadow-green-500/30">

                            💬 WhatsApp

                        </button>

                        <button
                            onClick={() => {
                                setSelectedCustomer(customer);
                                setOpenModal(true);
                            }}
                            className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-black hover:-translate-y-1 hover:scale-105 transition-all duration-300 text-white font-semibold shadow-lg"
                        >
                            ✏ Edit
                        </button>

                    </div>

                </div>




                {/* Customer Information */}

                <div className="mt-10 border-t border-slate-200 pt-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                        <div className="rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

                            <p className="text-sm text-slate-500">
                                📞 Phone Number
                            </p>

                            <h3 className="mt-2 text-lg font-bold text-slate-800">
                                +91 {customer.phone}
                            </h3>

                        </div>

                        <div className="rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

                            <p className="text-sm text-slate-500">
                                📧 Email
                            </p>

                            <h3 className="mt-2 text-lg font-bold text-slate-800 break-all">
                                {customer.email}
                            </h3>

                        </div>

                        <div className="rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

                            <p className="text-sm text-slate-500">
                                🏢 Company
                            </p>

                            <h3 className="mt-2 text-lg font-bold text-slate-800">
                                {customer.company}
                            </h3>

                        </div>

                        <div className="rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

                            <p className="text-sm text-slate-500">
                                📍 City
                            </p>

                            <h3 className="mt-2 text-lg font-bold text-slate-800">
                                {customer.city}
                            </h3>

                            <div className="rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

                                <p className="text-sm text-slate-500">
                                    🏠 Address
                                </p>

                                <h3 className="mt-2 text-lg font-bold text-slate-800">
                                    {customer.address}
                                </h3>

                            </div>


                        </div>


                    </div>

                </div>
                {/* Quick Statistics */}

                <div className="mt-10 border-t border-slate-200 pt-8">

                    <h2 className="text-xl font-bold text-slate-800 mb-6">
                        Customer Overview
                    </h2>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

                        <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

                            <p className="text-sm text-slate-500">
                                Installations
                            </p>

                            <h2 className="text-3xl font-bold text-emerald-600 mt-2">
                                08
                            </h2>

                        </div>

                        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-200 p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

                            <p className="text-sm text-slate-500">
                                Support Tickets
                            </p>

                            <h2 className="text-3xl font-bold text-blue-600 mt-2">
                                02
                            </h2>

                        </div>

                        <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-white border border-orange-200 p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

                            <p className="text-sm text-slate-500">
                                Follow Ups
                            </p>

                            <h2 className="text-3xl font-bold text-orange-500 mt-2">
                                04
                            </h2>

                        </div>

                        <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-200 p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

                            <p className="text-sm text-slate-500">
                                Customer Since
                            </p>

                            <h2 className="text-2xl font-bold text-purple-600 mt-2">
                                2024
                            </h2>

                        </div>

                    </div>

                </div>




                {/* Billing Information */}

                {/* Customer Products */}

                <div className="mt-12 border-t border-slate-200 pt-8">

                    <div className="flex items-center justify-between mb-6">

                        <h2 className="text-2xl font-bold text-slate-800">
                            📦 Customer Products
                        </h2>

                        <button
                            onClick={() => setOpenProductModal(true)}
                            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition"
                        >
                            + Add Product
                        </button>

                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200">

                        <table className="w-full">

                            <thead className="bg-slate-100">

                                <tr className="border-b border-slate-200 bg-slate-50">
                                    <th className="text-left px-6 py-4">Date</th>
                                    <th className="text-left px-6 py-4">Product</th>
                                    <th className="text-center px-6 py-4">Qty</th>
                                    <th className="text-center px-6 py-4">Unit Price</th>
                                    <th className="text-center px-6 py-4">Total</th>
                                    <th className="text-center px-6 py-4">Paid</th>
                                    <th className="text-center px-6 py-4">Pending</th>
                                    <th className="text-center px-6 py-4">Status</th>
                                </tr>

                            </thead>

                            <tbody>

                                <tr className="border-b border-slate-100 hover:bg-slate-50">

                                    <td className="px-6 py-4">
                                        {customer.customerSince}
                                    </td>

                                    <td className="px-6 py-4 font-medium">
                                        {customer.product}
                                    </td>

                                    <td className="text-center">
                                        {customer.quantity}
                                    </td>

                                    <td className="text-center">
                                        ₹ {customer.unitPrice}
                                    </td>

                                    <td className="text-center font-semibold text-blue-600">
                                        ₹ {customer.totalAmount}
                                    </td>

                                    <td className="text-center font-semibold text-green-600">
                                        ₹ {customer.paidAmount}
                                    </td>

                                    <td className="text-center font-semibold text-red-600">
                                        ₹ {customer.pendingAmount}
                                    </td>

                                    <td className="text-center">
                                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
                                            {customer.paymentStatus}
                                        </span>
                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>



                {/* Payment Summary */}

                <div className="mt-10">

                    <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-8">

                        <h2 className="text-2xl font-bold text-slate-800 mb-6">
                            💳 Payment Summary
                        </h2>

                        <div className="space-y-4">

                            <div className="flex justify-between">

                                <span>Total Bill</span>

                                <span className="font-bold">
                                    ₹ {customer.totalAmount?.toLocaleString()}
                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span>Paid Amount</span>

                                <span className="font-bold text-green-600">
                                    ₹ {customer.paidAmount?.toLocaleString()}
                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span>Pending Amount</span>

                                <span className="font-bold text-red-600">
                                    ₹ {customer.pendingAmount?.toLocaleString()}
                                </span>

                            </div>

                            <hr />

                            <div className="flex justify-between items-center">

                                <span className="font-semibold">
                                    Payment Status
                                </span>

                                <span
                                    className={`px-4 py-2 rounded-full text-sm font-bold ${customer.paymentStatus === "Paid"
                                        ? "bg-green-100 text-green-700"
                                        : customer.paymentStatus === "Partial"
                                            ? "bg-orange-100 text-orange-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {customer.paymentStatus}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>


            </div>

        </div>

    );
}

export default CustomerProfileCard;
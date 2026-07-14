import exportCustomerPDF from "../../utils/exportCustomerPDF";
function CustomerProfileCard({
    customer,
    products,
    getProducts,
    setOpenModal,
    setSelectedCustomer,
    setOpenProductModal,
    setIsDeleteModalOpen,
    selectedProduct,
    setSelectedProduct,
    installations,
}) {

    console.log(customer);

    // Payment Summary
    const totalAmount = products.reduce(
        (sum, product) => sum + Number(product.totalAmount || 0),
        0
    );

    const paidAmount = products.reduce(
        (sum, product) => sum + Number(product.paidAmount || 0),
        0
    );

    const pendingAmount = products.reduce(
        (sum, product) => sum + Number(product.pendingAmount || 0),
        0
    );

    const paymentStatus =
        pendingAmount === 0
            ? "Paid"
            : paidAmount === 0
                ? "Pending"
                : "Partial";


    const customerSince = new Date(
        customer.customerSince
    ).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });


    const totalProducts = products.length;
    const totalBusiness = totalAmount;
    const totalInstallations = installations.length;


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

                                <span
                                    className={`px-4 py-1.5 rounded-full font-semibold text-sm ${customer.status === "Active"
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {customer.status}
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

                        <button
                            onClick={() => exportCustomerPDF(customer, products)}
                            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 hover:scale-105 transition-all duration-300 text-white font-semibold shadow-lg"
                        >
                            📄 PDF
                        </button>

                        <button
                            onClick={() => {
                                setSelectedCustomer(customer);
                                setIsDeleteModalOpen(true);
                            }}
                            className="px-6 py-3 rounded-2xl bg-red-500 hover:bg-red-600 hover:-translate-y-1 hover:scale-105 transition-all duration-300 text-white font-semibold shadow-lg shadow-red-500/30"
                        >
                            🗑 Delete
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
                                Products
                            </p>

                            <h2 className="text-3xl font-bold text-emerald-600 mt-2">
                                {totalProducts}
                            </h2>

                        </div>

                        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-200 p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

                            <p className="text-sm text-slate-500">
                                Total Business
                            </p>

                            <h2 className="text-3xl font-bold text-blue-600 mt-2">
                                ₹ {totalBusiness.toLocaleString()}
                            </h2>

                        </div>

                        <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-white border border-orange-200 p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

                            <p className="text-sm text-slate-500">
                                Total Installations
                            </p>

                            <h2 className="text-3xl font-bold text-orange-500 mt-2">
                                {totalInstallations}
                            </h2>

                        </div>

                        <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-200 p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

                            <p className="text-sm text-slate-500">
                                Customer Since
                            </p>

                            <h2 className="text-xl font-bold text-purple-600 mt-2">
                                {customerSince}
                            </h2>
                        </div>

                    </div>

                </div>





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
                                    <th className="text-center px-6 py-4">Total</th>
                                    <th className="text-center px-6 py-4">Paid</th>
                                    <th className="text-center px-6 py-4">Pending</th>
                                    <th className="text-center px-6 py-4">Status</th>
                                    <th className="text-center px-6 py-4">Action</th>
                                </tr>

                            </thead>

                            <tbody>

                                {products.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            className="py-8 text-center text-slate-500"
                                        >

                                            No Products Added Yet

                                        </td>

                                    </tr>

                                ) : (

                                    products.map((product) => (

                                        <tr
                                            key={product._id}
                                            className="border-b hover:bg-slate-50"
                                        >

                                            <td className="px-6 py-4">

                                                {new Date(product.createdAt).toLocaleDateString()}

                                            </td>

                                            <td className="px-6 py-4">

                                                <p className="font-semibold">

                                                    {product.productName}

                                                </p>


                                            </td>

                                            <td className="text-center font-semibold text-blue-600">

                                                ₹ {product.totalAmount}

                                            </td>

                                            <td className="text-center font-semibold text-green-600">

                                                ₹ {product.paidAmount}

                                            </td>

                                            <td className="text-center font-semibold text-red-600">

                                                ₹ {product.pendingAmount}

                                            </td>

                                            <td className="text-center">

                                                <span
                                                    className={`rounded-full px-3 py-1 text-sm font-semibold ${product.paymentStatus === "Paid"
                                                        ? "bg-green-100 text-green-700"
                                                        : product.paymentStatus === "Partial"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-700"
                                                        }`}
                                                >

                                                    {product.paymentStatus}

                                                </span>

                                            </td>

                                            <td>

                                                <div className="flex justify-center gap-3">

                                                    <button
                                                        onClick={() => {

                                                            setSelectedProduct(product);

                                                            setOpenProductModal(true);

                                                        }}
                                                        className="rounded-xl bg-emerald-100 p-2 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                                                    >

                                                        ✏

                                                    </button>

                                                    <button
                                                        onClick={() => {

                                                            setSelectedProduct(product);

                                                            setIsDeleteModalOpen(true);

                                                        }}
                                                        className="rounded-xl bg-red-100 p-2 text-red-600 hover:bg-red-600 hover:text-white"
                                                    >
                                                        🗑
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                )}

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
                                    ₹ {totalAmount.toLocaleString()}
                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span>Paid Amount</span>

                                <span className="font-bold text-green-600">
                                    ₹ {paidAmount.toLocaleString()}
                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span>Pending Amount</span>

                                <span className="font-bold text-red-600">
                                    ₹ {pendingAmount.toLocaleString()}
                                </span>

                            </div>

                            <hr />

                            <div className="flex justify-between items-center">

                                <span className="font-semibold">
                                    Payment Status
                                </span>

                                <span
                                    className={`px-4 py-2 rounded-full text-sm font-bold ${paymentStatus === "Paid"
                                        ? "bg-green-100 text-green-700"
                                        : paymentStatus === "Partial"
                                            ? "bg-orange-100 text-orange-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {paymentStatus}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>


                {/* Product Remarks */}

                <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8">

                    <h2 className="mb-6 text-2xl font-bold text-slate-800">

                        📝 Product Remarks

                    </h2>

                    {products.length === 0 ? (

                        <p className="text-slate-500">

                            No Remarks Available

                        </p>

                    ) : (

                        <div className="space-y-5">

                            {products.map((product) => (

                                <div
                                    key={product._id}
                                    className="rounded-2xl border border-slate-200 p-5"
                                >

                                    <h3 className="font-bold text-emerald-600">

                                        {product.productName}

                                    </h3>

                                    <p className="mt-2 text-slate-600">

                                        {product.remarks || "No Remarks"}

                                    </p>

                                </div>

                            ))}

                        </div>

                    )}

                </div>


            </div>

        </div>

    );
}
export default CustomerProfileCard;
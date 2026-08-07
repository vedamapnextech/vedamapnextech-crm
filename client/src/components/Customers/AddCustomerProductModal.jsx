import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function AddCustomerProductModal({

    customer,
    setOpenModal,
    selectedProduct,
    setSelectedProduct,
    getProducts,

}) {

    const [formData, setFormData] = useState({

        customerId: customer?._id || "",

        productName: "",

        totalAmount: "",

        paidAmount: "",

        pendingAmount: "",

        paymentStatus: "Pending",

        remarks: "",

    });

    useEffect(() => {

        if (selectedProduct) {

            setFormData({

                customerId: customer?._id,

                productName:
                    selectedProduct.productName || "",

                totalAmount:
                    selectedProduct.totalAmount || "",

                paidAmount:
                    selectedProduct.paidAmount || "",

                pendingAmount:
                    selectedProduct.pendingAmount || "",

                paymentStatus:
                    selectedProduct.paymentStatus || "Pending",

                remarks:
                    selectedProduct.remarks || "",

            });

        }

    }, [selectedProduct, customer]);



    const handleChange = (e) => {

        const { name, value } = e.target;

        let updated = {

            ...formData,

            [name]: value,

        };

        // Product Name ko Uppercase me convert karega
        if (name === "productName") {

            updated.productName = value.toUpperCase();

        }

        // Pending Amount aur Payment Status Auto Calculate
        if (
            name === "totalAmount" ||
            name === "paidAmount"
        ) {

            const total = Number(
                name === "totalAmount"
                    ? value
                    : updated.totalAmount
            );

            const paid = Number(
                name === "paidAmount"
                    ? value
                    : updated.paidAmount
            );

            updated.pendingAmount = Math.max(total - paid, 0);

            if (paid <= 0) {

                updated.paymentStatus = "Pending";

            } else if (paid >= total) {

                updated.paymentStatus = "Paid";

            } else {

                updated.paymentStatus = "Partial";

            }

        }

        setFormData(updated);

    };


    const handleSubmit = async () => {

        if (

            !formData.productName ||

            !formData.totalAmount

        ) {

            toast.error(

                "Please fill required fields."

            );

            return;

        }

        const url = selectedProduct

            ? `${import.meta.env.VITE_API_URL}/api/customer-products/${selectedProduct._id}`

            : `${import.meta.env.VITE_API_URL}/`;

        const method =

            selectedProduct

                ? "PUT"

                : "POST";

        try {

            const response = await fetch(

                url,

                {

                    method,

                    headers: {

                        "Content-Type": "application/json",

                    },

                    body: JSON.stringify(formData),

                }

            );

            if (!response.ok) {

                throw new Error();

            }

            toast.success(

                selectedProduct

                    ? "Product Updated"

                    : "Product Added"

            );

            getProducts();

            setSelectedProduct(null);

            setOpenModal(false);

        } catch (error) {

            toast.error(

                "Something went wrong."

            );

        }

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">
                {/* Header */}

                <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-5">

                    <div>

                        <h2 className="text-3xl font-bold text-slate-800">

                            {selectedProduct ? "Edit Product" : "Add Product"}

                        </h2>

                        <p className="mt-2 text-slate-500">

                            Add product for <span className="font-semibold">{customer?.name}</span>

                        </p>

                    </div>

                    <button

                        onClick={() => {

                            setSelectedProduct(null);

                            setOpenModal(false);

                        }}

                        className="rounded-xl bg-red-100 px-4 py-2 font-bold text-red-600 hover:bg-red-600 hover:text-white"

                    >

                        ✕

                    </button>

                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    {/* Product */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold">

                            Product Name *

                        </label>

                        <input

                            type="text"

                            name="productName"

                            value={formData.productName}

                            onChange={handleChange}

                            className="w-full rounded-2xl border px-4 py-3"

                        />

                    </div>

                    {/* Total */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold">

                            Total Amount *

                        </label>

                        <input

                            type="number"

                            name="totalAmount"

                            value={formData.totalAmount}

                            onChange={handleChange}

                            className="w-full rounded-2xl border px-4 py-3"

                        />

                    </div>

                    {/* Paid */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold">

                            Paid Amount

                        </label>

                        <input

                            type="number"

                            name="paidAmount"

                            value={formData.paidAmount}

                            onChange={handleChange}

                            className="w-full rounded-2xl border px-4 py-3"

                        />

                    </div>

                    {/* Pending */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold">

                            Pending Amount

                        </label>

                        <input

                            type="number"

                            value={formData.pendingAmount}

                            readOnly

                            className="w-full rounded-2xl border bg-slate-100 px-4 py-3"

                        />

                    </div>

                    {/* Payment Status */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold">

                            Payment Status

                        </label>

                        <input

                            type="text"

                            value={formData.paymentStatus}

                            readOnly

                            className="w-full rounded-2xl border bg-slate-100 px-4 py-3"

                        />

                    </div>

                </div>

                {/* Remarks */}

                <div className="mt-6">

                    <label className="mb-2 block text-sm font-semibold">

                        Remarks

                    </label>

                    <textarea

                        name="remarks"

                        rows={4}

                        value={formData.remarks}

                        onChange={handleChange}

                        className="w-full rounded-2xl border px-4 py-3"

                    />

                </div>

                {/* Footer */}

                <div className="mt-8 flex justify-end gap-4 border-t border-slate-200 pt-6">

                    <button
                        type="button"
                        onClick={() => {

                            setSelectedProduct(null);

                            setOpenModal(false);

                        }}
                        className="rounded-xl border border-slate-300 px-6 py-3 font-semibold hover:bg-slate-100"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="rounded-xl bg-emerald-500 px-8 py-3 font-semibold text-white hover:bg-emerald-600"
                    >
                        {selectedProduct
                            ? "Update Product"
                            : "Save Product"}
                    </button>

                </div>

            </div>

        </div>

    );

}

export default AddCustomerProductModal;
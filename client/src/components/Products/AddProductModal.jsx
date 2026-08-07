import { useState, useEffect } from "react";
import toast from "react-hot-toast";
function AddProductModal({
    setOpenModal,
    getProducts,
    selectedProduct,
    setSelectedProduct,
}) {

    const [productData, setProductData] = useState({
        name: selectedProduct?.name || "",
        brand: selectedProduct?.brand || "",
        model: selectedProduct?.model || "",
        price: selectedProduct?.price || "",
        stock: selectedProduct?.stock || "",
        gst: selectedProduct?.gst || "",
        warranty: selectedProduct?.warranty || "",
        status: selectedProduct?.status || "Active",
        description: selectedProduct?.description || "",
    });

    useEffect(() => {
        setProductData({
            name: selectedProduct?.name || "",
            brand: selectedProduct?.brand || "",
            model: selectedProduct?.model || "",
            price: selectedProduct?.price || "",
            stock: selectedProduct?.stock || "",
            gst: selectedProduct?.gst || "",
            warranty: selectedProduct?.warranty || "",
            status: selectedProduct?.status || "Active",
            description: selectedProduct?.description || "",
        });
    }, [selectedProduct]);

    const handleChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value,
        });
    };



    const handleSubmit = () => {

        if (
            !productData.name ||
            !productData.price ||
            !productData.gst ||
            !productData.warranty
        ) {
            toast.error("Please fill all required fields");
            return;
        }

        fetch(
            selectedProduct
                ? `${import.meta.env.VITE_API_URL}/api/products/${selectedProduct._id}`
                : `${import.meta.env.VITE_API_URL}/api/products`,
            {
                method: selectedProduct ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            }
        )
            .then((res) => res.json())
            .then((data) => {

                console.log(data);

                if (data._id) {

                    toast.success(
                        selectedProduct
                            ? "Product Updated Successfully"
                            : "Product Added Successfully"
                    );

                    getProducts();

                    setSelectedProduct(null);

                    setOpenModal(false);

                } else {

                    toast.error(data.message || "Product Save Failed");

                }

            })
            .catch((err) => console.log(err));

    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6">
            <div className=" w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl  bg-white  p-8  shadow-2xl  " >


                <div className="flex items-center justify-between">

                    <div>

                        <h2 className="text-3xl font-bold text-slate-800">
                            {selectedProduct ? "Edit Product" : "Add Product"}
                        </h2>

                        <p className="mt-2 text-slate-500">
                            {selectedProduct
                                ? "Update product information."
                                : "Create a new product for Vedamap Nextech CRM."}
                        </p>

                    </div>

                    <button
                        onClick={() => {



                            setOpenModal(false);

                        }}
                        className="h-12 w-12 rounded-xl bg-slate-100 text-2xl hover:bg-red-500 hover:text-white duration-300"
                    >
                        ✕
                    </button>

                </div>


                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >


                    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">

                        {/* Product Name */}

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Product Name <span className="text-red-500">*</span>
                            </label>


                            <input
                                type="text"
                                name="name"
                                value={productData.name}
                                onChange={handleChange}
                                placeholder="Enter Product Name"
                                className="w-full rounded-xl border border-slate-300 p-3 focus:border-emerald-500 focus:outline-none"
                            />
                        </div>





                        {/* Price */}

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Price<span className="text-red-500">*</span>
                            </label>

                            <input
                                type="number"
                                name="price"
                                value={productData.price}
                                onChange={handleChange}
                                placeholder="Enter Price"
                                className="w-full rounded-xl border border-slate-300 p-3 focus:border-emerald-500 focus:outline-none"
                            />
                        </div>

                        {/* Stock */}

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Stock
                            </label>

                            <input
                                type="number"
                                name="stock"
                                value={productData.stock}
                                onChange={handleChange}
                                placeholder="Enter Stock"
                                className="w-full rounded-xl border border-slate-300 p-3 focus:border-emerald-500 focus:outline-none"
                            />
                        </div>

                        {/* Brand */}

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Brand
                            </label>

                            <input
                                type="text"
                                name="brand"
                                value={productData.brand}
                                onChange={handleChange}
                                placeholder="Enter Brand"
                                className="w-full rounded-xl border border-slate-300 p-3 focus:border-emerald-500 focus:outline-none"
                            />
                        </div>

                        {/* Model */}

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Model
                            </label>

                            <input
                                type="text"
                                name="model"
                                value={productData.model}
                                onChange={handleChange}
                                placeholder="Enter Model"
                                className="w-full rounded-xl border border-slate-300 p-3 focus:border-emerald-500 focus:outline-none"
                            />
                        </div>

                        {/* GST */}

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                GST (%) <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="number"
                                name="gst"
                                value={productData.gst}
                                onChange={handleChange}
                                placeholder="Enter GST"
                                className="w-full rounded-xl border border-slate-300 p-3 focus:border-emerald-500 focus:outline-none"
                            />
                        </div>

                        {/* Warranty */}

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Warranty <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="text"
                                name="warranty"
                                value={productData.warranty}
                                onChange={handleChange}
                                placeholder="Enter Warranty"
                                className="w-full rounded-xl border border-slate-300 p-3 focus:border-emerald-500 focus:outline-none"
                            />
                        </div>

                        {/* Status */}

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Status
                            </label>

                            <select
                                name="status"
                                value={productData.status}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 p-3 focus:border-emerald-500 focus:outline-none"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        {/* Description */}

                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Product Description
                            </label>

                            <textarea
                                name="description"
                                value={productData.description}
                                onChange={handleChange}
                                placeholder="Write product description..."
                                rows={4}
                                className="w-full rounded-xl border border-slate-300 p-4 resize-none focus:border-emerald-500 focus:outline-none"
                            />
                        </div>

                    </div>



                    <div className="mt-8 flex justify-end gap-4  pt-6">

                        <button
                            type="button"
                            onClick={() => {



                                setOpenModal(false);

                            }}
                            className="rounded-xl border px-6 py-3"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-xl bg-emerald-500 px-6 py-3 text-white hover:bg-emerald-600"
                        >
                            {selectedProduct ? "Update Product" : "Save Product"}
                        </button>


                    </div>
                </form>

            </div>

        </div>
    );

}

export default AddProductModal;
import { useEffect, useState } from "react";
import ProductInfoCard from "../../components/Products/ProductInfoCard";
import { useNavigate, useParams } from "react-router-dom";
import AddProductModal from "../../components/Products/AddProductModal";
import DeleteConfirmationModal from "../../components/Common/DeleteConfirmationModal";
function ProductDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const getProduct = () => {

        fetch(`${import.meta.env.VITE_API_URL}/products/${id}`)
            .then((res) => res.json())
            .then((data) => {

                console.log(data);

                setProduct(data);

            });

    };

    useEffect(() => {
        getInstallation();
    }, [id]);

    if (!product) {
        return <h1 className="p-10 text-2xl">Loading...</h1>;
    }

    return (
        <div className="p-2">

            <button
                onClick={() => navigate("/products")}
                className="mb-10 flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white hover:shadow-xl"
            >
                ← Back to Products
            </button>

            <div className="overflow-hidden rounded-[35px] bg-white shadow-2xl">

                {/* Header */}

                <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 p-10">

                    <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>

                    <div className="flex items-center gap-8 relative z-10">

                        <div className="flex h-32 w-32 items-center justify-center rounded-[30px] bg-white/20 text-6xl backdrop-blur-md transition-all duration-500 hover:rotate-6 hover:scale-110">

                            📦

                        </div>

                        <div>

                            <h1 className="text-5xl font-extrabold text-white">

                                {product.name}

                            </h1>

                            <p className="mt-3 text-xl text-emerald-100">

                                {product.category}

                            </p>

                            <span className="mt-5 inline-flex rounded-full bg-white/20 px-5 py-2 text-white backdrop-blur-md">

                                {product.status}

                            </span>

                        </div>

                    </div>

                </div>

                {/* Body */}

                <div className="grid gap-8 p-10 lg:grid-cols-3">

                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

                        <p className="text-slate-500">
                            Unit Price
                        </p>

                        <h2 className="mt-3 text-4xl font-bold text-emerald-600">

                            ₹ {product.price}

                        </h2>

                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

                        <p className="text-slate-500">
                            Current Stock
                        </p>

                        <h2
                            className={`mt-3 inline-flex rounded-full px-5 py-2 text-3xl font-bold ${product.stock <= 5
                                ? "bg-orange-100 text-orange-600"
                                : "bg-emerald-100 text-emerald-600"
                                }`}
                        >
                            {product.stock}
                        </h2>



                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

                        <p className="text-slate-500">
                            Created On
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-slate-800">
                            {new Date(product.createdAt).toLocaleDateString("en-GB")}
                        </h2>

                        <p className="mt-3 text-slate-500">
                            Product Created Date
                        </p>
                    </div>

                </div>

                {/* Extra Details */}

                <div className="grid gap-8 border-t border-slate-200 p-10 lg:grid-cols-2">

                    <div>

                        <h3 className="mb-8 flex items-center gap-3 text-3xl font-bold text-slate-800">
                            📋 Product Information
                        </h3>


                        <div className="space-y-5">

                            <ProductInfoCard
                                icon="🏢"
                                title="Brand"
                                value={product.brand || "-"}
                            />

                            <ProductInfoCard
                                icon="📦"
                                title="Model"
                                value={product.model || "-"}
                            />

                            <ProductInfoCard
                                icon="🛡️"
                                title="Warranty"
                                value={product.warranty || "-"}
                            />

                            <ProductInfoCard
                                icon="🧾"
                                title="GST"
                                value={product.gst ? `${product.gst}%` : "-"}
                            />

                            <ProductInfoCard
                                icon="💰"
                                title="Total Value"
                                value={`₹ ${(
                                    Number(product.price || 0) *
                                    Number(product.stock || 0)
                                ).toLocaleString("en-IN")}`}
                            />

                        </div>


                    </div>










                    <div
                        className="
    rounded-3xl
    border
    border-slate-200
    bg-white
    p-6
    shadow-sm
    transition-all
    duration-300
    hover:-translate-y-1
    hover:border-emerald-400
    hover:shadow-xl
    min-h-[340px]
"
                    >

                        <div className="flex items-center gap-4 border-b border-slate-200 pb-5">

                            <div
                                className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-emerald-100
            text-2xl
            transition-all
            duration-300
            hover:bg-emerald-500
            hover:text-white
        "
                            >
                                📝
                            </div>

                            <div>

                                <h3 className="text-xl font-bold text-slate-800">

                                    Product Description

                                </h3>

                                <p className="text-sm text-slate-500">

                                    Complete details about this product

                                </p>

                            </div>

                        </div>

                        <div className="mt-6">

                            {product.description ? (

                                <p className="leading-8 text-[16px] text-slate-600">

                                    {product.description}

                                </p>

                            ) : (

                                <div
                                    className="
                flex
                h-[180px]
                flex-col
                items-center
                justify-center
                rounded-2xl
                border-2
                border-dashed
                border-slate-200
                bg-slate-50
            "
                                >

                                    <div className="text-6xl">

                                        📄

                                    </div>

                                    <h3 className="mt-4 text-lg font-bold text-slate-700">

                                        No Description Added

                                    </h3>

                                    <p className="mt-2 text-sm text-slate-400">

                                        Add a product description while editing this product.

                                    </p>

                                </div>

                            )}

                        </div>

                    </div>








                </div>

                {/* Buttons */}

                <div className="flex justify-end gap-5 border-t border-slate-200 p-8">

                    <button
                        onClick={() => setOpenModal(true)}
                        className="rounded-2xl bg-emerald-500 px-8 py-4 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-600 hover:shadow-xl"
                    >
                        ✏ Edit Product
                    </button>

                    <button
                        onClick={() => setOpenDeleteModal(true)}
                        className="rounded-2xl bg-red-500 px-8 py-4 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-red-600 hover:shadow-xl"
                    >
                        🗑 Delete Product
                    </button>

                    {openModal && (
                        <AddProductModal
                            setOpenModal={setOpenModal}
                            getProducts={getProduct}
                            selectedProduct={product}
                            setSelectedProduct={setProduct}
                        />
                    )}

                    {openDeleteModal && (
                        <DeleteConfirmationModal
                            open={openDeleteModal}
                            title="Delete Product"
                            message={`Are you sure you want to delete "${selectedProduct?.name}"?`}
                            onClose={() => {
                                setOpenDeleteModal(false);
                                setSelectedProduct(null);
                            }}
                            onDelete={handleDeleteProduct}
                        />
                    )}

                </div>

            </div>

        </div>
    );
}

export default ProductDetails;
import {
    FiEye,
    FiEdit2,
    FiTrash2,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function ProductTable({ products, setOpenModal,
    setSelectedProduct, setOpenDeleteModal, }) {
    const navigate = useNavigate();
    return (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr className="text-left">

                            <th className="px-6 py-5">Product</th>
                            <th className="px-6 py-5">Category</th>
                            <th className="px-6 py-5">Price</th>
                            <th className="px-6 py-5">Stock</th>
                            <th className="px-6 py-5">Status</th>
                            <th className="px-6 py-5 text-center">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {products.map((product) => (

                            <tr
                                key={product._id}
                                className="border-t hover:bg-emerald-50 duration-300"
                            >

                                <td className="px-6 py-5">

                                    <div className="flex items-center gap-4">

                                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-400 flex items-center justify-center text-3xl">
                                            📦
                                        </div>
                                        <div>

                                            <h3 className="font-bold text-slate-800">
                                                {product.name}
                                            </h3>

                                            <p className="text-sm text-slate-500">
                                                Vedamap Nextech
                                            </p>

                                        </div>

                                    </div>

                                </td>

                                <td className="px-6 py-5">
                                    {product.category}
                                </td>

                                <td className="px-6 py-5 font-semibold">
                                    ₹ {product.price}
                                </td>

                                <td className="px-6 py-5">

                                    <span className="rounded-full bg-blue-100 px-4 py-2 text-blue-700">

                                        {product.stock}

                                    </span>

                                </td>

                                <td className="px-6 py-5">

                                    <span className="rounded-full bg-emerald-100 px-4 py-2 text-emerald-700">

                                        {product.status}

                                    </span>

                                </td>

                                <td className="px-6 py-5">

                                    <div className="flex justify-center gap-3">

                                        <button
                                            onClick={() => navigate(`/products/${product._id}`)}
                                            className="rounded-xl bg-blue-100 p-3 text-blue-600 hover:bg-blue-600 hover:text-white duration-300"
                                        >
                                            <FiEye />
                                        </button>
                                        <button
                                            onClick={() => {

                                                setSelectedProduct(product);

                                                setOpenModal(true);

                                            }}
                                            className="rounded-xl bg-emerald-100 p-3 text-emerald-600 hover:bg-emerald-600 hover:text-white duration-300"
                                        >

                                            <FiEdit2 />

                                        </button>

                                        <button
                                            onClick={() => {

                                                setSelectedProduct(product);

                                                setOpenDeleteModal(true);

                                            }}
                                            className="rounded-xl bg-red-100 p-3 text-red-600 hover:bg-red-600 hover:text-white duration-300"
                                        >

                                            <FiTrash2 />

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default ProductTable;
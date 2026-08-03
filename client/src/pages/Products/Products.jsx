import { useEffect, useState } from "react";
import SkeletonCard from "../../components/Common/SkeletonCard";
import ProductStats from "../../components/Products/ProductStats";
import exportProductsExcel from "../../utils/exportProductsExcel";
import ProductTable from "../../components/Products/ProductTable";
import toast from "react-hot-toast";
import AddProductModal from "../../components/Products/AddProductModal";
import DeleteConfirmationModal from "../../components/Common/DeleteConfirmationModal";

import {
  FiSearch,
  FiPackage,
  FiPlus,
  FiEdit,
  FiAlertTriangle,
  FiCheckCircle,
  FiTrash2,
  FiStar,
  FiEye,
} from "react-icons/fi";

function Products() {
  const [products, setProducts] = useState([]);


  const [loading, setLoading] = useState(true);

  const totalProducts = products.length;
  const [selectedProduct, setSelectedProduct] = useState(null);

  const activeProducts = products.filter(
    (p) => p.status === "Active"
  ).length;

  const inactiveProducts = products.filter(
    (p) => p.status === "Inactive"
  ).length;

  const inventoryValue = products.reduce(
    (sum, product) =>
      sum + Number(product.price || 0) * Number(product.stock || 0),
    0
  );

  const lowStockProducts = products.filter(
    (p) => p.stock <= 5
  ).length;


  const [openModal, setOpenModal] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const getProducts = (showLoader = true) => {

    if (showLoader) {
      setLoading(true);
    }

    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {

        setProducts(data);

        setLoading(false);

      })
      .catch((err) => {

        console.log(err);

        setLoading(false);

      });

  };



  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/products/${selectedProduct._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to delete product");
        return;
      }

      toast.success("Product deleted successfully");

      getProducts(false);

      setOpenDeleteModal(false);

      setSelectedProduct(null);

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };



  useEffect(() => {

    getProducts();


  }, []);

  const filteredProducts = products.filter((product) => {

    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All"
        ? true
        : statusFilter === "LowStock"
          ? Number(product.stock) <= 5
          : product.status === statusFilter;
    return matchSearch && matchStatus;

  });
  console.log(products);

  if (loading) {

    return (
      <div className="space-y-6 p-8">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );

  }

  return (
    <div className="p-8">

      <div className="flex items-center justify-between mb-8">

        <div>

          <p className="uppercase text-emerald-600 font-semibold tracking-widest">
            Product Management
          </p>

          <h1 className="text-5xl font-bold text-slate-800 mt-2">
            Products
          </h1>

          <p className="text-slate-500 mt-3">
            Manage all company products from one place.
          </p>

        </div>

        <button onClick={() => {

          setSelectedProduct(null);

          setOpenModal(true);

        }} className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold shadow-xl hover:scale-105 duration-300">
          + Add Product
        </button>



      </div>

      <ProductStats
        totalProducts={totalProducts}
        activeProducts={activeProducts}
        inactiveProducts={inactiveProducts}
        lowStockProducts={lowStockProducts}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200 mb-8">

        <div className="flex flex-col lg:flex-row items-center gap-5">

          <div className="flex-1 relative">

            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-slate-400" />

            <input
              type="text"
              placeholder="Search Product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 py-4 pl-14 pr-5 outline-none focus:border-emerald-500"
            />



          </div>

          <button
            onClick={() => exportProductsExcel(filteredProducts)}
            className="rounded-2xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            Export Excel
          </button>


          <button
            onClick={() => {
              setSearch("");
              setStatusFilter("All");
            }}
            disabled={search === "" && statusFilter === "All"}
            className={`rounded-2xl px-6 py-4 font-semibold transition whitespace-nowrap ${search === "" && statusFilter === "All"
              ? "cursor-not-allowed bg-slate-100 text-slate-400"
              : "bg-slate-200 hover:bg-slate-300"
              }`}
          >
            Clear Filters
          </button>
        </div>

      </div>



      <ProductTable
        products={filteredProducts}
        setOpenModal={setOpenModal}
        setSelectedProduct={setSelectedProduct}
        setOpenDeleteModal={setOpenDeleteModal}
      />

      {openModal && (
        <AddProductModal
          setOpenModal={setOpenModal}
          getProducts={getProducts}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      )}

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

    </div>
  );

}

export default Products;
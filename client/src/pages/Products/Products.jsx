import { useEffect, useState } from "react";
import ProductStats from "../../components/Products/ProductStats";
import ProductTable from "../../components/Products/ProductTable";
import AddProductModal from "../../components/Products/AddProductModal";
import DeleteProductModal from "../../components/Products/DeleteProductModal";
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


  const totalProducts = products.length;
  const [selectedProduct, setSelectedProduct] = useState(null);

  const activeProducts = products.filter(
    (p) => p.status === "Active"
  ).length;

  const featuredProducts = products.length;

  const lowStockProducts = products.filter(
    (p) => p.stock <= 5
  ).length;


  const [openModal, setOpenModal] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const getProducts = () => {

    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {

        console.log(data);

        setProducts(data);



      });

  };

  useEffect(() => {

    getProducts();

  }, []);

  const categories = [
    ...new Set(
      products.map((product) => product.category.trim())
    ),
  ];

  const filteredProducts = products.filter((product) => {

    const matchSearch =
      product.name.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      category === "All" ||
      product.category.trim().toLowerCase() ===
      category.trim().toLowerCase()

    return matchSearch && matchCategory;


  });
  console.log(products);
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


      {/* OLD PRODUCT STATS */}

      {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <div className="rounded-3xl bg-white p-6 shadow-lg hover:shadow-2xl transition duration-300 border border-slate-200">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500">
                Total Products
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {totalProducts}
              </h2>

            </div>

            <div className="h-16 w-16 rounded-2xl bg-blue-500 flex items-center justify-center text-white text-3xl">

              <FiPackage />

            </div>

          </div>

        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg hover:shadow-2xl transition duration-300 border border-slate-200">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500">
                Active Products
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {activeProducts}
              </h2>

            </div>

            <div className="h-16 w-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-white text-3xl">

              <FiCheckCircle />

            </div>

          </div>

        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg hover:shadow-2xl transition duration-300 border border-slate-200">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500">
                Low Stock
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {lowStockProducts}
              </h2>

            </div>

            <div className="h-16 w-16 rounded-2xl bg-orange-500 flex items-center justify-center text-white text-3xl">

              <FiAlertTriangle />

            </div>

          </div>

        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg hover:shadow-2xl transition duration-300 border border-slate-200">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500">
                Featured
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {featuredProducts}
              </h2>

            </div>

            <div className="h-16 w-16 rounded-2xl bg-purple-500 flex items-center justify-center text-white text-3xl">

              <FiStar />

            </div>

          </div>

        </div>

      </div> */}

      <ProductStats
        totalProducts={totalProducts}
        activeProducts={activeProducts}
        lowStockProducts={lowStockProducts}
        featuredProducts={featuredProducts}
      />

      <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200 mb-8">

        <div className="flex flex-col lg:flex-row gap-5">

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



          {/* Category */}


          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-2xl border border-slate-300 px-5"
          >

            <option value="All">
              All Categories
            </option>

            {categories.map((cat) => (

              <option
                key={cat}
                value={cat}
              >
                {cat}
              </option>

            ))}

          </select>

        </div>

      </div>

      {/* old product card   */}

      {/* <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-8"> 

        {products.map((product) => (

          <div
            key={product.id}
            className="group rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-3 duration-300"
          >

            <div
              className={`h-40 bg-gradient-to-r ${product.color} flex items-center justify-center text-7xl`}
            >
              {product.icon}
            </div>

            <div className="p-7">

              <h2 className="text-2xl font-bold text-slate-800 group-hover:text-emerald-600 duration-300">
                {product.name}
              </h2>

              <p className="text-slate-500 mt-2">
                {product.category}
              </p>

              <div className="flex justify-between items-center mt-7">

                <div>

                  <p className="text-slate-400 text-sm">
                    Price
                  </p>

                  <h3 className="text-2xl font-bold text-slate-800">
                    {product.price}
                  </h3>

                </div>

                <span className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-semibold">
                  {product.status}
                </span>

              </div>

            </div>

          </div>

        ))}

      </div> */}









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

      {openDeleteModal && (
        <DeleteProductModal
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          setOpenDeleteModal={setOpenDeleteModal}
          getProducts={getProducts}
        />
      )}

    </div>
  );

}

export default Products;
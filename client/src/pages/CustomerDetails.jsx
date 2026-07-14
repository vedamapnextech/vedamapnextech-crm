import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import AddCustomerModal from "../components/Customers/AddCustomerModal";
import CustomerProfileCard from "../components/Customers/CustomerProfileCard";
import DeleteConfirmationModal from "../components/Common/DeleteConfirmationModal";
import AddCustomerProductModal from "../components/Customers/AddCustomerProductModal";
function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [installations, setInstallations] = useState([]);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openProductModal, setOpenProductModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleDeleteProduct = async () => {

    if (!selectedProduct) return;

    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/customer-products/${selectedProduct._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {

        throw new Error(data.message);

      }

      toast.success("Product Deleted Successfully");

      getProducts();

      setSelectedProduct(null);

      setIsDeleteModalOpen(false);

    } catch (error) {

      console.log(error);

      toast.error("Unable to Delete Product");

    }

  };


  const getCustomer = () => {
    fetch(`${import.meta.env.VITE_API_URL}/customers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCustomer(data);
        setSelectedCustomer(data);
      });
  };



  const getInstallations = () => {

    fetch(
      `${import.meta.env.VITE_API_URL}/installations/customer/${id}`
    )
      .then((res) => res.json())
      .then((data) => {

        setInstallations(data);

      });

  };


  const getProducts = () => {

    fetch(
      `${import.meta.env.VITE_API_URL}/customer-products/${id}`
    )
      .then((res) => res.json())
      .then((data) => {

        setProducts(data);

      })
      .catch((err) => console.log(err));

  };

  const handleDeleteCustomer = async () => {

    if (!selectedCustomer) return;

    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/customers/${selectedCustomer._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }


      setSelectedCustomer(null);

      setIsDeleteModalOpen(false);



      navigate("/customers-list");

    } catch (error) {

      console.log(error);

    }

  };


  useEffect(() => {
    getCustomer();
    getProducts();
    getInstallations();

  }, [id]);

  if (!customer) {
    return <h1 className="p-10 text-2xl">Loading...</h1>;
  }



  return (
    <div >

      <div className="mb-6">
        <button
          onClick={() => navigate("/customers-list")}
          className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 border border-slate-200 shadow-sm hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition"
        >
          ← Back to Customers
        </button>
      </div>

      <CustomerProfileCard
        customer={customer}
        products={products}
        getProducts={getProducts}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        setOpenModal={setOpenModal}
        setSelectedCustomer={setSelectedCustomer}
        setOpenProductModal={setOpenProductModal}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        installations={installations}
      />


      {openModal && (
        <AddCustomerModal
          setOpenModal={setOpenModal}
          customers={[customer]}
          setCustomers={() => { }}
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
          getCustomers={getCustomer}
        />
      )}
      {openProductModal && (
        <AddCustomerProductModal
          customer={customer}
          setOpenModal={setOpenProductModal}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          getProducts={getProducts}
        />
      )}

      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        title={
          selectedProduct
            ? "Delete Product"
            : "Delete Customer"
        }
        message={
          selectedProduct
            ? `Are you sure you want to delete "${selectedProduct.productName}"? This action cannot be undone.`
            : `Are you sure you want to delete "${selectedCustomer?.name}"? This action cannot be undone.`
        }
        onClose={() => {

          setIsDeleteModalOpen(false);

          setSelectedProduct(null);

          setSelectedCustomer(null);

        }}
        onDelete={() => {

          if (selectedProduct) {

            handleDeleteProduct();

          } else {

            handleDeleteCustomer();

          }

        }}
      />


    </div>
  );
}

export default CustomerDetails;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import CustomerProfileCard from "../../components/Customers/CustomerProfileCard";
import DeleteConfirmationModal from "../../components/Common/DeleteConfirmationModal";
import AddCustomerProductModal from "../../components/Customers/AddCustomerProductModal";

import AddDealerCustomerModal from "../../components/Dealers/AddDealerCustomerModal";
// Product modal baad me add karenge
// import AddCustomerProductModal from "../../components/Customers/AddCustomerProductModal";

function DealerCustomersDetail() {

  const { dealerId } = useParams();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [customer, setCustomer] = useState(null);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [products, setProducts] = useState([]);

  const [installations, setInstallations] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const [openProductModal, setOpenProductModal] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const getCustomer = async () => {

    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/dealer-customers/customer/${dealerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log(data);

      setCustomer(data);

      setSelectedCustomer(data);

    } catch (error) {

      console.log(error);

      toast.error("Unable to load customer");

    }

  };

  const getProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/customer-products/${dealerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load products");
    }
  };

  const deleteCustomer = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/dealer-customers/${selectedCustomer._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Dealer Customer Deleted Successfully");

      setIsDeleteModalOpen(false);
      setSelectedCustomer(null);

      navigate("/dealers");
    } catch (error) {
      console.log(error);
      toast.error("Unable to delete customer");
    }
  };

  useEffect(() => {
    getCustomer();
    getProducts();
  }, [dealerId]);
  if (!customer) {

    return (

      <h1 className="p-10 text-2xl">

        Loading...

      </h1>

    );

  }
  return (
    <div>

      <div className="mb-6">

        <button
          onClick={() => navigate("/dealers")}
          className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 border border-slate-200 shadow-sm hover:bg-emerald-500 hover:text-white"
        >
          ← Back Dealer Customers
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

      {openProductModal && (
        <AddCustomerProductModal
          customer={customer}
          setOpenModal={setOpenProductModal}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          getProducts={getProducts}
        />
      )}

      {openModal && (
        <AddDealerCustomerModal
          dealerId={dealerId}
          setOpenModal={setOpenModal}
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
          getCustomers={getCustomer}
          getAllCustomers={getCustomer}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          open={isDeleteModalOpen}
          title="Delete Dealer Customer"
          message="Are you sure you want to delete this dealer customer?"
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedCustomer(null);
          }}
          onDelete={deleteCustomer}
        />
      )}

    </div>
  );

}

export default DealerCustomersDetail;
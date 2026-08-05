import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LeadProfileCard from "../../components/Customers/LeadProfileCard";
import AddLeadModal from "../../components/Customers/AddLeadModal";
import toast from "react-hot-toast";
import DeleteConfirmationModal from "../../components/Common/DeleteConfirmationModal";

function LeadDetails() {



    const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const token = localStorage.getItem("token");

    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { id } = useParams();

    const navigate = useNavigate();

    const [lead, setLead] = useState(null);




    const getLead = () => {

        fetch(`${import.meta.env.VITE_API_URL}/api/leads/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {

                setLead(data);

            });

    };

    const handleDeleteCustomer = async () => {
        if (!selectedCustomer) return;

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/leads/${selectedCustomer._id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || "Failed to delete lead");
                return;
            }

            toast.success("Lead deleted successfully");

            setIsDeleteModalOpen(false);
            setSelectedCustomer(null);

            setTimeout(() => {
                navigate("/customers");
            }, 800);

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };



    const handleConvertCustomer = async () => {

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/customers/convert/${lead._id}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            toast.success("Lead Converted Successfully");

            setIsConvertModalOpen(false);

            navigate("/customers");

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }

    }



    useEffect(() => {

        getLead();

    }, [id]);

    if (!lead) {

        return <h1 className="p-10 text-2xl">Loading...</h1>;

    }

    return (

        <div>

            <div className="mb-6">

                <button
                    onClick={() => navigate("/customers")}
                    className="rounded-xl border border-slate-200 bg-white px-5 py-3 hover:bg-emerald-500 hover:text-white transition"
                >

                    ← Back To Leads

                </button>

            </div>

            <LeadProfileCard
                lead={lead}
                setOpenModal={setOpenModal}
                setSelectedCustomer={setSelectedCustomer}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                onConvertCustomer={() => setIsConvertModalOpen(true)}
            />


            {openModal && (

                <AddLeadModal

                    setOpenModal={setOpenModal}

                    customers={[lead]}

                    setCustomers={() => { }}

                    selectedCustomer={selectedCustomer}

                    setSelectedCustomer={setSelectedCustomer}

                    getCustomers={getLead}

                />

            )}

            <DeleteConfirmationModal

                open={isDeleteModalOpen}

                title="Delete Lead"

                message={`Are you sure you want to delete "${selectedCustomer?.name}" ?`}

                onClose={() => {

                    setIsDeleteModalOpen(false);

                }}

                onDelete={handleDeleteCustomer}

            />


            <DeleteConfirmationModal
                open={isConvertModalOpen}
                title="Convert Lead"
                message={`Are you sure you want to convert "${lead?.name}" into Customer?`}
                onClose={() => {
                    setIsConvertModalOpen(false);
                }}
                onDelete={handleConvertCustomer}
                buttonText="Convert"
                buttonColor="bg-emerald-600 hover:bg-emerald-700"
            />

        </div>

    );

}

export default LeadDetails;
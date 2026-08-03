import { useState, useEffect } from "react";
import DeleteConfirmationModal from "../../components/Common/DeleteConfirmationModal";

function DealerDetailsModal({
    open,
    onClose,
    dealer,
    onEdit,
    onDelete,
}) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    if (!open || !dealer) return null;


    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[450px] rounded-2xl shadow-xl p-6">

                <h2 className="text-2xl font-bold mb-6">
                    Dealer Details
                </h2>

                <div className="space-y-4">

                    <div>
                        <p className="text-sm text-gray-500">Dealer Name</p>
                        <h3 className="text-lg font-semibold">
                            {dealer.name}
                        </h3>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Mobile Number</p>
                        <h3 className="text-lg font-semibold">
                            {dealer.phone}
                        </h3>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <h3 className="text-lg font-semibold">
                            {dealer.email || "-"}
                        </h3>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">City</p>
                        <h3 className="text-lg font-semibold">
                            {dealer.city || "-"}
                        </h3>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <h3 className="text-lg font-semibold">
                            {dealer.address || "-"}
                        </h3>
                    </div>

                </div>

                <div className="flex justify-end gap-3 mt-8">

                    <button
                        onClick={onEdit}
                        className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Edit Dealer
                    </button>
                    <button
                        onClick={() => setOpenDeleteModal(true)}
                        className="px-5 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
                    >
                        Delete Dealer
                    </button>

                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-xl bg-gray-300"
                    >
                        Close
                    </button>

                </div>

            </div>
            <DeleteConfirmationModal
                open={openDeleteModal}
                title="Delete Dealer"
                message={`Are you sure you want to delete "${dealer?.name}"?`}
                onClose={() => setOpenDeleteModal(false)}
                onDelete={() => onDelete(dealer._id)}
            />
        </div>

    );
}

export default DealerDetailsModal;
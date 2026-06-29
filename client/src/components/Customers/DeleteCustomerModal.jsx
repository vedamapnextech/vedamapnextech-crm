import { MdWarningAmber } from "react-icons/md";

function DeleteCustomerModal({
    selectedCustomer,
    setIsDeleteModalOpen,
    customers,
    setCustomers,
    setSelectedCustomer,
}) {

    const handleDelete = () => {
        const updatedCustomers = customers.filter(
            (customer) => customer.id !== selectedCustomer.id
        );

        setCustomers(updatedCustomers);
        setSelectedCustomer(null);
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-md transition-all duration-300">

            <div className="w-full max-w-md rounded-[28px] bg-white p-8 shadow-[0_25px_60px_rgba(0,0,0,0.25)] border border-slate-200 animate-in zoom-in-95 duration-300">

                {/* Warning Icon */}
                <div className="flex justify-center">

                    <div className="group flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-100 via-orange-100 to-red-50 shadow-lg transition-all duration-300 hover:scale-110">

                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500 shadow-lg">

                            <MdWarningAmber className="text-4xl text-white group-hover:rotate-12 transition-all duration-300" />

                        </div>

                    </div>

                </div>

                {/* Heading */}

                <h2 className="mt-7 text-center text-3xl font-bold text-slate-800">
                    Delete Customer
                </h2>

                <p className="mt-3 text-center text-slate-500 leading-7">
                    You are about to permanently remove this customer from your CRM.
                </p>

                {/* Customer Name */}

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-center shadow-sm">

                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                        Selected Customer
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-slate-800">
                        {selectedCustomer?.name}
                    </h3>

                </div>

                {/* Warning */}

                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">

                    <p className="text-center text-sm font-medium text-red-600">
                        ⚠ This action cannot be undone.
                    </p>

                </div>

                {/* Buttons */}

                <div className="mt-8 flex gap-4">

                    <button
                        onClick={() => {
                            setSelectedCustomer(null);
                            setIsDeleteModalOpen(false);
                        }}
                        className="flex-1 rounded-2xl border border-slate-300 bg-white py-3 font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-100 hover:shadow-lg active:scale-95"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        className="flex-1 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 py-3 font-semibold text-white shadow-lg shadow-red-500/30 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:from-red-600 hover:to-red-700 hover:shadow-red-500/50 active:scale-95"
                    >
                        🗑 Delete Customer
                    </button>

                </div>

            </div>

        </div>
    );
}

export default DeleteCustomerModal;
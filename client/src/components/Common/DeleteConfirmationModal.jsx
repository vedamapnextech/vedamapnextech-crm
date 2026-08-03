import { FiAlertTriangle } from "react-icons/fi";


function DeleteConfirmationModal({
    open,
    title,
    message,
    onClose,
    onDelete,
    buttonText = "Delete",
    buttonColor = "bg-red-600 hover:bg-red-700",
}) {

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6">

            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-300">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">

                    <FiAlertTriangle className="text-5xl text-red-600" />

                </div>

                <h2 className="mt-6 text-center text-3xl font-bold text-slate-800">

                    {title}

                </h2>

                <p className="mt-4 text-center text-slate-500">

                    {message}

                </p>

                <div className="mt-8 flex gap-4">

                    <button

                        onClick={onClose}

                        className="flex-1 rounded-2xl border border-slate-300 py-3 font-semibold hover:bg-slate-100 duration-300"

                    >

                        Cancel

                    </button>

                    <button
                        onClick={onDelete}
                        className={`rounded-2xl px-8 py-4 font-semibold text-white transition ${buttonColor}`}
                    >
                        {buttonText}
                    </button>
                </div>

            </div>

        </div>

    );

}

export default DeleteConfirmationModal;
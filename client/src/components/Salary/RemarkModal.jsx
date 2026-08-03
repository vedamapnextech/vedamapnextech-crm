function RemarkModal({ open, onClose, salary }) {

    if (!open || !salary) return null;

    return (

        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-6">

            <div className="flex min-h-full items-center justify-center">

                <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl">

                    <div className="mb-6 flex items-center justify-between">

                        <div>

                            <h2 className="text-3xl font-bold text-slate-800">
                                Remarks
                            </h2>

                            <p className="mt-1 text-slate-500">
                                {salary.month} {salary.year}
                            </p>

                        </div>

                        <button
                            onClick={onClose}
                            className="text-3xl font-bold text-slate-400 hover:text-red-500"
                        >
                            ×
                        </button>

                    </div>

                    <div className="min-h-[180px] rounded-2xl border border-slate-200 bg-slate-50 p-5">

                        <p className="whitespace-pre-wrap break-words text-lg leading-8 text-slate-700">

                            {salary.remarks
                                ? salary.remarks
                                : "No Remarks Available."}

                        </p>

                    </div>

                    <div className="mt-8 flex justify-end">

                        <button
                            onClick={onClose}
                            className="rounded-xl bg-emerald-500 px-8 py-3 font-semibold text-white hover:bg-emerald-600"
                        >
                            Close
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default RemarkModal;
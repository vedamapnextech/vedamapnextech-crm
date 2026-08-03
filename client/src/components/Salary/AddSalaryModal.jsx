import { useEffect, useState } from "react";
import toast from "react-hot-toast";
function AddSalaryModal({
    open,
    onClose,
    employee,
    refreshData,
    editMode,
    salary,
}) {
    const [formData, setFormData] = useState({
        month: "",
        year: new Date().getFullYear(),
        basicSalary: "",
        incentive: "",
        paidAmount: "",
        status: "Pending",
        remarks: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    useEffect(() => {

        if (editMode && salary) {

            setFormData({

                month: salary.month,

                year: salary.year,

                basicSalary: salary.basicSalary,

                incentive: salary.incentive,

                paidAmount: salary.paidAmount,

                remarks: salary.remarks || "",

            });

        }

    }, [editMode, salary]);


    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-6">
            <div className="flex min-h-full items-center justify-center">

                <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">

                    <div className="mb-8 flex items-center justify-between">

                        <div>

                            <h2 className="text-3xl font-bold text-slate-800">
                                Add Salary
                            </h2>

                            <p className="mt-1 text-slate-500">
                                {employee.fullName}
                            </p>

                        </div>

                        <button
                            onClick={onClose}
                            className="text-3xl font-bold text-slate-400 hover:text-red-500"
                        >
                            ×
                        </button>

                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        <div>

                            <label className="mb-2 block font-semibold">
                                Month
                            </label>

                            <select
                                name="month"
                                value={formData.month}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
                            >
                                <option value="">Select Month</option>

                                <option>January</option>
                                <option>February</option>
                                <option>March</option>
                                <option>April</option>
                                <option>May</option>
                                <option>June</option>
                                <option>July</option>
                                <option>August</option>
                                <option>September</option>
                                <option>October</option>
                                <option>November</option>
                                <option>December</option>

                            </select>

                        </div>

                        <div>

                            <label className="mb-2 block font-semibold">
                                Year
                            </label>

                            <input
                                type="number"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block font-semibold">
                                Basic Salary
                            </label>

                            <input
                                type="number"
                                name="basicSalary"
                                value={formData.basicSalary}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block font-semibold">
                                Incentive
                            </label>

                            <input
                                type="number"
                                name="incentive"
                                value={formData.incentive}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block font-semibold">
                                Paid Amount
                            </label>

                            <input
                                type="number"
                                name="paidAmount"
                                value={formData.paidAmount}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
                            />

                        </div>



                        <div className="md:col-span-2">

                            <label className="mb-2 block font-semibold">
                                Remarks
                            </label>

                            <textarea
                                rows={3}
                                name="remarks"
                                value={formData.remarks}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
                            />

                        </div>

                    </div>
                    <div className="mt-8 flex justify-end gap-3">

                        <button
                            onClick={onClose}
                            className="rounded-xl border border-slate-300 px-6 py-3 font-semibold hover:bg-slate-100"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading
                                ? "Saving..."
                                : editMode
                                    ? "Update Salary"
                                    : "Save Salary"}
                        </button>

                    </div>

                </div>

            </div>
        </div>


    );

    async function handleSubmit() {

        if (
            !formData.month ||
            !formData.year ||
            !formData.basicSalary
        ) {

            toast.error("Please fill all required fields.");
            return;
        }

        try {

            setLoading(true);

            const response = await fetch(

                editMode
                    ? `${import.meta.env.VITE_API_URL}/salary/${salary._id}`
                    : `${import.meta.env.VITE_API_URL}/salary`,

                {

                    method: editMode ? "PUT" : "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        employee: employee._id,
                        ...formData,
                    }),

                }

            );

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || "Failed to save salary.");
                return;
            }

            toast.success(
                editMode
                    ? "Salary Updated Successfully."
                    : "Salary Added Successfully."
            );

            setFormData({
                month: "",
                year: new Date().getFullYear(),
                basicSalary: "",
                incentive: "",
                paidAmount: "",

                remarks: "",
            });

            refreshData();
            onClose();

        } catch (error) {

            console.log(error);
            toast.error("Server Error");
        } finally {

            setLoading(false);

        }

    }


}

export default AddSalaryModal; 
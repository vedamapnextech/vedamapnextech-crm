import { useState, useEffect } from "react";
import Select from "react-select";
import toast from "react-hot-toast";

function AddInstallationModal({
    setOpenModal,
    customers,
    products,
    getInstallations,
    selectedInstallation,
}) {
    const [installationData, setInstallationData] = useState({

        customer: "",

        product: "",

        location: "",

        engineer: "",

        installationDate: "",

        status: "Pending",

        remarks: "",

    });



    useEffect(() => {

        if (selectedInstallation) {

            setInstallationData({

                customer: selectedInstallation.customer?._id || "",

                product: selectedInstallation.product?._id || "",

                location: selectedInstallation.location || "",

                engineer: selectedInstallation.engineer || "",

                installationDate: selectedInstallation.installationDate
                    ? selectedInstallation.installationDate.substring(0, 10)
                    : "",

                status: selectedInstallation.status || "Pending",

                remarks: selectedInstallation.remarks || "",

            });

        }

    }, [selectedInstallation]);




    const handleChange = (e) => {

        setInstallationData({

            ...installationData,

            [e.target.name]: e.target.value,

        });

    };



    const handleSubmit = async () => {

        if (
            !installationData.customer ||
            !installationData.product ||
            !installationData.location.trim() ||
            !installationData.engineer.trim() ||
            !installationData.installationDate
        ) {

            toast.error("Please fill all required fields.");

            return;

        }

        try {

            const url = selectedInstallation
                ? `${import.meta.env.VITE_API_URL}/installations/${selectedInstallation._id}`
                : `${import.meta.env.VITE_API_URL}/installations`;

            const method = selectedInstallation ? "PUT" : "POST";

            const response = await fetch(url, {

                method,

                headers: {

                    "Content-Type": "application/json",

                },

                body: JSON.stringify(installationData),

            });

            const data = await response.json();

            console.log(data);

            await getInstallations();

            if (selectedInstallation) {
                toast.success("Installation updated successfully.");
            } else {
                toast.success("Installation added successfully.");
            }

            setOpenModal(false);
        }

        catch (error) {

            console.log(error);
            toast.error("Something went wrong.");

        }

    };


    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6">

            <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between">

                    <div>

                        <h2 className="text-3xl font-bold text-slate-800">
                            {selectedInstallation
                                ? "Edit Installation"
                                : "Add Installation"}
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Create a new installation for customer.
                        </p>

                    </div>

                    <button

                        onClick={() => setOpenModal(false)}

                        className="h-12 w-12 rounded-xl bg-slate-100 text-2xl hover:bg-red-500 hover:text-white duration-300"

                    >
                        ✕

                    </button>

                </div>





                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Customer */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Customer
                            </label>

                            <Select
                                options={customers.map((customer) => ({
                                    value: customer._id,
                                    label: `${customer.name} (${customer.city})`,
                                }))}

                                value={
                                    customers
                                        .map((customer) => ({
                                            value: customer._id,
                                            label: `${customer.name} (${customer.city})`,
                                        }))
                                        .find(
                                            (option) => option.value === installationData.customer
                                        ) || null
                                }

                                onChange={(selectedOption) =>
                                    setInstallationData({
                                        ...installationData,
                                        customer: selectedOption?.value || "",
                                    })
                                }

                                placeholder="Select Customer"

                                isSearchable

                                className="text-sm"
                            />

                        </div>

                        {/* Product */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Product
                            </label>
                            <Select
                                options={products.map((product) => ({
                                    value: product._id,
                                    label: product.name,
                                }))}

                                value={
                                    products
                                        .map((product) => ({
                                            value: product._id,
                                            label: product.name,
                                        }))
                                        .find(
                                            (option) => option.value === installationData.product
                                        ) || null
                                }

                                onChange={(selectedOption) =>
                                    setInstallationData({
                                        ...installationData,
                                        product: selectedOption?.value || "",
                                    })
                                }

                                placeholder="Select Product"

                                isSearchable

                                className="text-sm"
                            />

                        </div>

                        {/* Installation Location */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Installation Location
                            </label>

                            <input
                                required
                                type="text"
                                name="location"
                                value={installationData.location}
                                onChange={handleChange}
                                placeholder="Factory Gate / Weighbridge-1"
                                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-emerald-500"
                            />

                        </div>

                        {/* Engineer */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Engineer
                            </label>

                            <input
                                required
                                type="text"
                                name="engineer"
                                value={installationData.engineer}
                                onChange={handleChange}
                                placeholder="Engineer Name"
                                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-emerald-500"
                            />

                        </div>

                        {/* Installation Date */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Installation Date
                            </label>

                            <input
                                required
                                type="date"
                                name="installationDate"
                                value={installationData.installationDate}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-emerald-500"
                            />

                        </div>

                        {/* Status */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Status
                            </label>

                            <select
                                required

                                name="status"
                                value={installationData.status}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-emerald-500"
                            >
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>

                        </div>

                    </div>

                    {/* Remarks */}

                    <div className="mt-6">

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Remarks
                        </label>

                        <textarea
                            name="remarks"
                            value={installationData.remarks}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Write installation remarks..."
                            className="w-full resize-none rounded-xl border border-slate-300 p-3 outline-none focus:border-emerald-500"
                        />

                    </div>

                    {/* Buttons */}

                    <div className="mt-8 flex justify-end gap-4">

                        <button
                            type="button"
                            onClick={() => setOpenModal(false)}
                            className="rounded-xl border border-slate-300 px-6 py-3 font-semibold"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600"
                        >
                            {selectedInstallation
                                ? "Update Installation"
                                : "Save Installation"}
                        </button>
                    </div>

                </form>







            </div>

        </div>

    );

}

export default AddInstallationModal;
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

        wbCode: "",

        assetId: "",

        siteName: "",

        installationType: "New Installation",

        location: "",

        engineer: "",

        installationDate: "",

        commissioningDate: "",

        status: "Pending",

        remarks: "",

    });

    const [loading, setLoading] = useState(false);



    useEffect(() => {

        if (selectedInstallation) {

            setInstallationData({

                customer: selectedInstallation.customer?._id || "",

                product: selectedInstallation.product?._id || "",
                wbCode: selectedInstallation.wbCode || "",
                assetId: selectedInstallation.assetId || "",
                siteName: selectedInstallation.siteName || "",
                installationType: selectedInstallation.installationType || "New Installation",


                location: selectedInstallation.location || "",

                engineer: selectedInstallation.engineer || "",

                installationDate: selectedInstallation.installationDate
                    ? selectedInstallation.installationDate.substring(0, 10)
                    : "",

                commissioningDate: selectedInstallation.commissioningDate
                    ? selectedInstallation.commissioningDate.substring(0, 10)
                    : "",

                status: selectedInstallation.status || "Pending",

                remarks: selectedInstallation.remarks || "",

            });

        }

    }, [selectedInstallation]);





    const engineerOptions = [
        { value: "Govind Choudhary", label: "Govind Choudhary" },
        { value: "Rahul Sharma", label: "Rahul Sharma" },
        { value: "Amit Singh", label: "Amit Singh" },
        { value: "Rakesh Kumar", label: "Rakesh Kumar" },
    ];




    const handleChange = (e) => {

        let { name, value } = e.target;

        if (name === "wbCode" || name === "assetId") {
            value = value.toUpperCase().trim();
        }

        setInstallationData({
            ...installationData,
            [name]: value,
        });

    };





    const resetForm = () => {
        setInstallationData({
            customer: "",
            product: "",
            wbCode: "",
            assetId: "",
            siteName: "",
            installationType: "New Installation",
            location: "",
            engineer: "",
            installationDate: "",
            commissioningDate: "",
            status: "Pending",
            remarks: "",
        });
    };





    const handleSubmit = async () => {

        if (
            !installationData.customer ||
            !installationData.product ||
            !installationData.location.trim() ||
            !installationData.engineer.trim() ||
            !installationData.wbCode.trim() ||
            !installationData.assetId.trim() ||
            !installationData.siteName.trim() ||
            !installationData.installationType.trim() ||
            !installationData.installationDate
        ) {

            toast.error("Please fill all required fields.");
            return;

        }


        if (
            installationData.commissioningDate &&
            new Date(installationData.commissioningDate) <
            new Date(installationData.installationDate)
        ) {

            toast.error(
                "Commissioning Date cannot be earlier than Installation Date."
            );
            return;

        }

        const payload = {
            ...installationData,
            wbCode: installationData.wbCode.trim(),
            assetId: installationData.assetId.trim(),
            siteName: installationData.siteName.trim(),
            location: installationData.location.trim(),
            engineer: installationData.engineer.trim(),
            remarks: installationData.remarks.trim(),
        };

        setLoading(true);

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

                body: JSON.stringify(payload),

            });

            const data = await response.json();
            if (!response.ok) {
                toast.error(data.message || "Something went wrong.");
                return;
            }

            console.log(data);

            if (selectedInstallation) {

                toast.success("Installation updated successfully.");

                resetForm();
                setOpenModal(false);

                await getInstallations();

                return;
            }

            toast.success("Installation added successfully.");

            resetForm();
            setOpenModal(false);

            await getInstallations();
        }

        catch (error) {

            console.log(error);
            toast.error("Something went wrong.");
            setLoading(false);

        }

        finally {
            setLoading(false);
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
                            {selectedInstallation
                                ? "Update installation details."
                                : "Create a new installation for customer."}
                        </p>

                    </div>

                    <button

                        onClick={() => {
                            resetForm();
                            setOpenModal(false);
                        }}

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


                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                WB Code
                            </label>

                            <input
                                type="text"
                                name="wbCode"
                                value={installationData.wbCode}
                                onChange={handleChange}
                                placeholder="WB-0001"
                                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-emerald-500"
                            />
                        </div>



                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Asset ID
                            </label>

                            <input
                                type="text"
                                name="assetId"
                                value={installationData.assetId}
                                onChange={handleChange}
                                placeholder="AST-0001"
                                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-emerald-500"
                            />
                        </div>



                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Site Name
                            </label>

                            <input
                                type="text"
                                name="siteName"
                                value={installationData.siteName}
                                onChange={handleChange}
                                placeholder="Jaipur Plant"
                                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-emerald-500"
                            />
                        </div>



                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Installation Type
                            </label>

                            <select
                                name="installationType"
                                value={installationData.installationType}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-emerald-500"
                            >
                                <option value="New Installation">New Installation</option>
                                <option value="Replacement">Replacement</option>
                                <option value="Upgrade">Upgrade</option>
                                <option value="Reinstallation">Reinstallation</option>
                            </select>
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

                            <Select
                                options={engineerOptions}
                                value={
                                    engineerOptions.find(
                                        (option) => option.value === installationData.engineer
                                    ) || null
                                }
                                onChange={(selectedOption) =>
                                    setInstallationData({
                                        ...installationData,
                                        engineer: selectedOption?.value || "",
                                    })
                                }
                                placeholder="Select Engineer"
                                isSearchable
                                className="text-sm"
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


                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Commissioning Date
                            </label>

                            <input
                                type="date"
                                name="commissioningDate"
                                value={installationData.commissioningDate}
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
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="On Hold">On Hold</option>
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
                            onClick={() => {
                                resetForm();
                                setOpenModal(false);
                            }}
                            className="rounded-xl border border-slate-300 px-6 py-3 font-semibold"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600"
                        >
                            {loading
                                ? "Saving..."
                                : selectedInstallation
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
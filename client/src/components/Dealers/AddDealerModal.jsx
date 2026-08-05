import { useState, useEffect } from "react";
import toast from "react-hot-toast";
function AddDealerModal({
    open,
    onClose,
    getDealers,
    selectedDealer,
}) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        city: "",
        address: "",
    });

    useEffect(() => {
        if (selectedDealer) {
            setFormData({
                name: selectedDealer.name || "",
                phone: selectedDealer.phone || "",
                email: selectedDealer.email || "",
                city: selectedDealer.city || "",
                address: selectedDealer.address || "",
            });
        } else {
            setFormData({
                name: "",
                phone: "",
                email: "",
                city: "",
                address: "",
            });
        }
    }, [selectedDealer]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phone") {
            const phone = value.replace(/\D/g, "").slice(0, 10);
            setFormData({
                ...formData,
                phone,
            });
            return;
        }

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = async () => {
        if (!formData.name.trim()) {
            return toast.warning("Dealer Name is required");
        }

        if (formData.phone.length !== 10) {
            return toast.warning("Mobile Number must be 10 digits");
        }

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                selectedDealer
                    ? `${import.meta.env.VITE_API_URL}/api/dealers/${selectedDealer._id}`
                    : `${import.meta.env.VITE_API_URL}/api/dealers`,
                {
                    method: selectedDealer ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            if (selectedDealer) {
                toast.success("Dealer Updated Successfully");
            } else {
                toast.success("Dealer Added Successfully");
            }

            getDealers();

            setFormData({
                name: "",
                phone: "",
                email: "",
                city: "",
                address: "",
            });

            onClose();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-[520px] p-6">

                <h2 className="text-2xl font-bold mb-6">
                    {selectedDealer ? "Edit Dealer" : "Add Dealer"}
                </h2>

                <div className="space-y-4">

                    <input
                        type="text"
                        name="name"
                        placeholder="Dealer Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Mobile Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                    <textarea
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                    />

                </div>

                <div className="flex justify-end gap-3 mt-6">

                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                        {selectedDealer ? "Update Dealer" : "Save Dealer"}
                    </button>

                </div>

            </div>
        </div>
    );
}

export default AddDealerModal;
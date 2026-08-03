import React from 'react'
import { useState } from "react";
import toast from "react-hot-toast";
import {
    HiOutlineKey,
    HiOutlineEye,
    HiOutlineEyeOff,
} from "react-icons/hi";

function ChangePassword() {

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [loading, setLoading] = useState(false);


    const handleChangePassword = async () => {

        if (
            !formData.currentPassword ||
            !formData.newPassword ||
            !formData.confirmPassword
        ) {
            return toast.error("All fields are required");
        }

        if (formData.newPassword.length < 6) {
            return toast.error("Password must be at least 6 characters");
        }

        if (formData.newPassword !== formData.confirmPassword) {
            return toast.error("Passwords do not match");
        }

        try {

            setLoading(true);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/auth/change-password`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                        currentPassword: formData.currentPassword,
                        newPassword: formData.newPassword,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            toast.success(data.message);

            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

        } catch (error) {

            toast.error(error.message);

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="p-8">

            <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">

                <div className="flex items-center gap-3 mb-8">

                    <HiOutlineKey className="text-cyan-600 text-3xl" />

                    <div>

                        <h2 className="text-2xl font-bold">
                            Change Password
                        </h2>

                        <p className="text-slate-500">
                            Update your account password.
                        </p>

                    </div>

                </div>

                {/* Current Password */}

                <div className="mb-5">

                    <label className="block mb-2 font-semibold">
                        Current Password
                    </label>

                    <div className="relative">

                        <input
                            type={showCurrent ? "text" : "password"}
                            value={formData.currentPassword}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    currentPassword: e.target.value,
                                })
                            }
                            className="w-full border rounded-lg px-4 py-3 pr-12 outline-none focus:border-cyan-500"
                        />

                        <button
                            type="button"
                            onClick={() => setShowCurrent(!showCurrent)}
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                            {showCurrent ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                        </button>

                    </div>

                </div>

                {/* New Password */}

                <div className="mb-5">

                    <label className="block mb-2 font-semibold">
                        New Password
                    </label>

                    <div className="relative">

                        <input
                            type={showNew ? "text" : "password"}
                            value={formData.newPassword}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    newPassword: e.target.value,
                                })
                            }
                            className="w-full border rounded-lg px-4 py-3 pr-12 outline-none focus:border-cyan-500"
                        />

                        <button
                            type="button"
                            onClick={() => setShowNew(!showNew)}
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                            {showNew ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                        </button>

                    </div>

                </div>

                {/* Confirm Password */}

                <div className="mb-8">

                    <label className="block mb-2 font-semibold">
                        Confirm Password
                    </label>

                    <div className="relative">

                        <input
                            type={showConfirm ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    confirmPassword: e.target.value,
                                })
                            }
                            className="w-full border rounded-lg px-4 py-3 pr-12 outline-none focus:border-cyan-500"
                        />

                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                            {showConfirm ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                        </button>

                    </div>

                </div>
                <button
                    onClick={handleChangePassword}
                    disabled={loading}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 text-white py-3 rounded-lg font-semibold transition"
                >
                    {loading ? "Updating..." : "Update Password"}
                </button>

            </div>

        </div>
    );

}

export default ChangePassword;
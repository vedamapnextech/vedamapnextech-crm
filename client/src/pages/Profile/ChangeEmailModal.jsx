import { useState } from "react";
import toast from "react-hot-toast";

function ChangeEmailModal({
    open,
    onClose,
    user,
    token,
    fetchProfile,
}) {
    const [step, setStep] = useState(1);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        newEmail: "",
        password: "",
        otp: "",
    });

    if (!open) return null;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const sendOtp = async () => {
        if (!formData.newEmail || !formData.password) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/send-email-otp`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        newEmail: formData.newEmail,
                        password: formData.password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to send OTP"
                );
            }

            console.log("SEND OTP RESPONSE:", data);

            toast.success(data.message || "OTP sent successfully");

            setStep(2);

        } catch (error) {
            console.error("SEND OTP ERROR:", error);
            toast.error(error.message || "Something went wrong");

        } finally {
            setLoading(false);
        }
    };
    const verifyOtp = async () => {
        if (!formData.otp) {
            toast.error("Enter OTP");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/verify-email-otp`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        otp: formData.otp,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message);
                return;
            }

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            toast.success("Email Updated Successfully");

            await fetchProfile();

            onClose();

            setStep(1);

            setFormData({
                newEmail: "",
                password: "",
                otp: "",
            });
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

                <h2 className="text-2xl font-bold">
                    Change Email
                </h2>

                <p className="mt-2 text-slate-500">
                    Current Email
                </p>

                <input
                    disabled
                    value={user.email}
                    className="mt-2 w-full rounded-xl border p-3 bg-slate-100"
                />

                {step === 1 && (
                    <>

                        <input
                            type="email"
                            name="newEmail"
                            placeholder="New Email"
                            value={formData.newEmail}
                            onChange={handleChange}
                            className="mt-5 w-full rounded-xl border p-3"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Current Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-4 w-full rounded-xl border p-3"
                        />

                        <button
                            onClick={sendOtp}
                            disabled={loading}
                            className="mt-6 w-full rounded-xl bg-emerald-600 py-3 font-bold text-white"
                        >
                            {loading ? "Sending OTP..." : "Send OTP"}
                        </button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <input
                            name="otp"
                            placeholder="Enter OTP"
                            value={formData.otp}
                            onChange={handleChange}
                            className="mt-5 w-full rounded-xl border p-3"
                        />

                        <button
                            onClick={verifyOtp}
                            disabled={loading}
                            className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-bold text-white"
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                    </>
                )}

                <button
                    onClick={onClose}
                    className="mt-4 w-full rounded-xl border py-3 font-semibold"
                >
                    Cancel
                </button>

            </div>
        </div>
    );
}

export default ChangeEmailModal;
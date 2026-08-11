import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleForgotPassword = async () => {
        if (!email.trim()) {
            return toast.error("Please enter your email");
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            toast.success(data.message);
            setEmail("");

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <div className="bg-white p-8 rounded-xl w-[420px] shadow-xl">

                <h2 className="text-2xl font-bold mb-2">
                    Forgot Password
                </h2>

                <p className="text-gray-500 mb-6">
                    Enter your registered email address.
                </p>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded-lg px-4 py-3 mb-5"
                />

                <button
                    onClick={handleForgotPassword}
                    disabled={loading}
                    className="w-full bg-cyan-600 text-white py-3 rounded-lg"
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="w-full mt-4 border border-slate-300 text-slate-700 py-3 rounded-lg font-semibold hover:bg-slate-100 transition"
                >
                    ← Back to Login
                </button>

            </div>
        </div>
    );
}

export default ForgotPassword;
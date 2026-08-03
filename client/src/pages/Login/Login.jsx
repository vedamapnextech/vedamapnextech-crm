import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";

// Logo
import logo from "../../assets/vedamap-logo.png";

function Login() {
  const navigate = useNavigate();




  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );





      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login Failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));



      toast.success("Welcome Back!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center px-5 py-8">
      {/* Background Blur */}
      <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-blue-600/30 blur-[120px] animate-pulse"></div>

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px] animate-pulse"></div>

      <div className="absolute top-1/2 left-1/2 h-72 w-72 rounded-full bg-indigo-500/20 blur-[130px] -translate-x-1/2 -translate-y-1/2"></div>

      {/* Login Card */}

      <div className="relative w-full max-w-md">

        <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] px-10 py-7">

          {/* Logo */}

          <div className="flex justify-center">

            <img
              src={logo}
              alt="VedaMap"
              className="w-24 drop-shadow-xl"
            />

          </div>

          {/* Heading */}

          <h1 className="text-center text-white text-3xl font-extrabold mt-3 tracking-wide leading-tight">

            VEDAMAP NEXTECH CRM

          </h1>

          <p className="text-center text-slate-300 mt-1 mb-6">

            Secure Login Portal

          </p>

          {/* Email */}

          <div className="mb-4">

            <label className="text-slate-300 text-sm font-medium mb-2 block">

              Email Address

            </label>

            <div className="relative">

              <HiOutlineMail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={22}
              />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}

                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
                className="w-full rounded-xl bg-white/10 border border-white/10 pl-12 pr-4 py-3 text-white placeholder:text-slate-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="text-slate-300 text-sm font-medium mb-2 block">

              Password

            </label>

            <div className="relative">

              <HiOutlineLockClosed
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={22}
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
                className="w-full rounded-xl bg-white/10 border border-white/10 pl-12 pr-14 py-3 text-white placeholder:text-slate-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
              >
                {showPassword ? (
                  <HiOutlineEyeOff size={22} />
                ) : (
                  <HiOutlineEye size={22} />
                )}
              </button>

            </div>

          </div>
          {/* Remember Me + Forgot Password */}

          <div className="flex items-center justify-between mt-5 mb-6">

            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition"
            >
              Forgot Password?
            </button>

          </div>

          {/* Login Button */}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
          >

            {loading ? (

              <div className="flex justify-center items-center gap-3">

                <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>

                Logging In...

              </div>

            ) : (

              "Login"

            )}

          </button>

        </div>

      </div>

    </div>
  );

}

export default Login;
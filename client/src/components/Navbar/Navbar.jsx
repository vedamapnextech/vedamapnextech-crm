import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  HiOutlineBell,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";

const Navbar = () => {
  const location = useLocation();
  const { id } = useParams();


  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const menuRef = useRef();
  const searchRef = useRef();


  const loadUser = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  };

  useEffect(() => {
    loadUser();

    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  let title = "Dashboard";
  let subtitle = "Welcome back 👋 Mayank";

  if (location.pathname === "/customers") {
    title = "Leads";
    subtitle = "Manage all leads";
  }

  if (location.pathname === "/customers-list") {
    title = "Customers";
    subtitle = "Manage all converted customers";
  }

  if (location.pathname.startsWith("/leads/")) {
    title = "Lead Details";
    subtitle = id ? `Lead ID #${id.slice(-6)}` : "";
  }

  if (location.pathname.startsWith("/customer/")) {
    title = "Customer Details";
    subtitle = id ? `Customer ID #${id.slice(-6)}` : "";
  }

  if (location.pathname === "/products") {
    title = "Products";
    subtitle = "Manage all products";
  }


  if (location.pathname.startsWith("/products/")) {
    title = "Product Details";
    subtitle = id ? `Product ID #${id.slice(-6)}` : "";
  }
  if (location.pathname === "/dealers") {
    title = "Dealers";
    subtitle = "Manage all dealers";
  }
  if (location.pathname === "/installations") {
    title = "Installations";
    subtitle = "Manage installation records";
  }

  if (location.pathname.startsWith("/installations/")) {
    title = "Installation Details";
    subtitle = id ? `Installation ID #${id.slice(-6)}` : "";
  }

  if (location.pathname === "/support") {
    title = "Support";
    subtitle = "Manage customer support";
  }

  if (location.pathname.startsWith("/support/")) {
    title = "Support Ticket Details";
    subtitle = id ? `Ticket ID #${id.slice(-6)}` : "";
  }

  if (location.pathname === "/employees") {
    title = "Employees";
    subtitle = "Manage all company employees";
  }

  if (location.pathname.startsWith("/employees/")) {
    title = "Employee Details";
    subtitle = id ? `Employee ID #${id.slice(-6)}` : "";
  }

  if (location.pathname.startsWith("/dealer/")) {
    title = "Dealer Customer Details";
    subtitle = "Manage dealer customers";
  }
  if (location.pathname === "/reports") {
    title = "Reports";
    subtitle = "Business reports";
  }

  if (location.pathname === "/settings") {
    title = "Settings";
    subtitle = "Application settings";
  }

  if (location.pathname === "/profile") {
    title = "My Profile";
    subtitle = "Manage your account information";
  }

  if (location.pathname === "/change-password") {
    title = "Change Password";
    subtitle = "Update your account password";
  }
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!search.trim()) {
        setResults(null);
        return;
      }

      try {
        setLoading(true);

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/search?query=${search}`
        );

        setResults(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);
  return (
    <div className="flex items-center justify-between w-full">

      {/* Left Side */}

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          {title}
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          {subtitle}
        </p>

      </div>

      {/* Right Side */}

      <div className="flex items-center gap-5">

        {/* Search */}

        <div className="relative" ref={searchRef}>
          {results && (
            <div className="absolute top-14 left-0 w-full bg-white rounded-xl shadow-xl border z-50 max-h-96 overflow-y-auto">

              {loading && (
                <div className="p-3 text-sm text-gray-500">
                  Searching...
                </div>
              )}

              {!loading &&
                results.leads?.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      navigate(`/leads/${item._id}`);
                      setSearch("");
                      setResults(null);
                    }}
                    className="p-3 border-b hover:bg-slate-100 cursor-pointer"
                  >
                    <div className="font-semibold">
                      👤 {item.name}
                    </div>

                    <div className="text-xs text-gray-500">
                      Lead
                    </div>
                  </div>
                ))}

              {!loading &&
                results.customers?.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      navigate(`/customer/${item._id}`);
                      setSearch("");
                      setResults(null);
                    }}
                    className="p-3 border-b hover:bg-slate-100 cursor-pointer"
                  >
                    <div className="font-semibold">
                      🏢 {item.name}
                    </div>

                    <div className="text-xs text-gray-500">
                      Customer
                    </div>
                  </div>
                ))}
              {!loading &&
                results.dealers?.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      navigate("/dealers");
                      setSearch("");
                      setResults(null);
                    }}
                    className="p-3 border-b hover:bg-slate-100 cursor-pointer"
                  >
                    <div className="font-semibold">
                      🤝 {item.name}
                    </div>

                    <div className="text-xs text-gray-500">
                      Dealer
                    </div>
                  </div>
                ))}

              {!loading &&
                results.employees?.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      navigate(`/employees/${item._id}`);
                      setSearch("");
                      setResults(null);
                    }}
                    className="p-3 border-b hover:bg-slate-100 cursor-pointer"
                  >
                    <div className="font-semibold">
                      👨‍💼 {item.fullName}
                    </div>

                    <div className="text-xs text-gray-500">
                      Employee
                    </div>
                  </div>
                ))}
              {!loading &&
                results.dealerCustomers?.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      navigate(`/dealer/${item._id}/customers`);
                      setSearch("");
                      setResults(null);
                    }}
                    className="p-3 border-b hover:bg-slate-100 cursor-pointer"
                  >
                    <div className="font-semibold">
                      👥 {item.name}
                    </div>

                    <div className="text-xs text-gray-500">
                      Dealer Customer • {item.company}
                    </div>
                  </div>
                ))}

              {!loading &&
                results.products?.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      navigate(`/products/${item._id}`);
                      setSearch("");
                      setResults(null);
                    }}
                    className="p-3 border-b hover:bg-slate-100 cursor-pointer"
                  >
                    <div className="font-semibold">
                      📦 {item.name}
                    </div>

                    <div className="text-xs text-gray-500">
                      Product
                    </div>
                  </div>
                ))}

              {!loading &&
                results.installations?.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      navigate(`/installations/${item._id}`);
                      setSearch("");
                      setResults(null);
                    }}
                    className="p-3 border-b hover:bg-slate-100 cursor-pointer"
                  >
                    <div className="font-semibold">
                      🔧 {item.wbCode}
                    </div>

                    <div className="text-xs text-gray-500">
                      Installation
                    </div>
                  </div>
                ))}

              {!loading &&
                results &&
                !results.leads?.length &&
                !results.customers?.length &&
                !results.dealers?.length &&
                !results.dealerCustomers?.length &&
                !results.employees?.length &&
                !results.products?.length &&
                !results.installations?.length && (
                  <div className="p-4 text-center text-slate-500">
                    No results found
                  </div>
                )}
            </div>
          )}

          <HiOutlineMagnifyingGlass
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl"
          />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-72 h-12 rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 outline-none focus:border-emerald-500 transition"
          />

        </div>

        {/* Notification */}

        {/* <button className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-emerald-500 hover:text-white transition flex items-center justify-center">

          <HiOutlineBell className="text-2xl" />

        </button> */}

        {/* Profile */}

        <div className="relative" ref={menuRef}>

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-600 hover:scale-105 transition"
          >

            {user?.profileImage ? (

              <img
                src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${user.profileImage}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />

            ) : (

              <div className="w-full h-full bg-emerald-500 text-white font-bold text-lg flex items-center justify-center">

                {user?.name?.charAt(0).toUpperCase()}

              </div>

            )}

          </button>

          {showMenu && (

            <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border overflow-hidden z-50">

              <div className="p-5 border-b">

                <h2 className="font-bold text-lg">
                  {user?.name}
                </h2>

                <p className="text-sm text-slate-500">
                  {user?.email}
                </p>

                <span className="inline-block mt-2 bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full">

                  {user?.role}

                </span>

              </div>

              <button
                onClick={() => {
                  setShowMenu(false);
                  navigate("/profile");
                }}
                className="w-full text-left px-5 py-3 hover:bg-slate-100 transition"
              >
                👤 My Profile
              </button>

              <button
                onClick={() => {
                  setShowMenu(false);
                  navigate("/settings");
                }}
                className="w-full text-left px-5 py-3 hover:bg-slate-100 transition"
              >
                ⚙ Settings
              </button>

              <button
                onClick={() => {
                  setShowMenu(false);
                  navigate("/change-password");
                }}
                className="w-full text-left px-5 py-3 hover:bg-slate-100 transition"
              >
                🔑 Change Password
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 transition"
              >
                🚪 Logout
              </button>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default Navbar;
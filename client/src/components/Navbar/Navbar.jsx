import { useLocation, useParams } from "react-router-dom";
import {
  HiOutlineBell,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";

const Navbar = () => {
  const location = useLocation();
  const { id } = useParams();

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

  if (location.pathname === "/reports") {
    title = "Reports";
    subtitle = "Business reports";
  }

  if (location.pathname === "/settings") {
    title = "Settings";
    subtitle = "Application settings";
  }
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

        <div className="relative">

          <HiOutlineMagnifyingGlass
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-72 h-12 rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 outline-none focus:border-emerald-500 transition"
          />

        </div>

        {/* Notification */}

        <button className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-emerald-500 hover:text-white transition flex items-center justify-center">

          <HiOutlineBell className="text-2xl" />

        </button>

        {/* Profile */}

        <img
          src="https://ui-avatars.com/api/?name=Mayank&background=10B981&color=fff"
          alt=""
          className="w-12 h-12 rounded-full border-2 border-emerald-500"
        />

      </div>

    </div>
  );
};

export default Navbar;
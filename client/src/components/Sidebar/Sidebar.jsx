import { NavLink } from "react-router-dom";
import { HiOutlineBars3 } from "react-icons/hi2";
import { MdManageAccounts } from "react-icons/md";
import { MdStore } from "react-icons/md";

import {
  MdDashboard,
  MdPeople,
  MdInventory2,
  MdEngineering,
  MdSupportAgent,
  MdAssessment,/*  */
  MdSettings,

} from "react-icons/md";

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {

  const menuStyle = ({ isActive }) =>
    `group flex items-center gap-4
     px-4 py-3
     rounded-xl
    transition-all duration-300
    font-medium
    ${isActive
      ? "bg-gradient-to-r from-emerald-500 to-emerald-400 text-white shadow-[0_10px_35px_rgba(16,185,129,.35)]"
      : "text-slate-400 hover:bg-slate-800 hover:text-white hover:shadow-lg hover:shadow-black/30 hover:translate-x-1"
    }`;

  return (
    <aside className="h-full flex flex-col bg-[#0B1220]">

      {/* Logo */}

      {/* Logo + Collapse Button */}

      <div className="px-5 pt-6">

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="w-full h-16 rounded-2xl bg-slate-800 hover:bg-emerald-500 transition-all duration-300 flex items-center px-5 gap-4 shadow-lg"
        >
          <HiOutlineBars3 className="text-3xl text-white" />

          {isSidebarOpen && (
            <div className="text-left">
              <h2 className="text-xl font-bold text-white">
                Vedamap
              </h2>

              <p className="text-xs uppercase tracking-[3px] text-emerald-200">
                Nextech CRM
              </p>
            </div>
          )}

        </button>

      </div>

      <div className="mx-6 mt-5 border-b border-slate-700"></div>
      {/* Menu */}

      <nav className="flex-1 mt-5 px-3 flex flex-col gap-2">
        <NavLink
          to="/dashboard"
          className={`${menuStyle} ${isSidebarOpen ? "justify-start" : "justify-center"}`} >
          <MdDashboard className="text-[24px] shrink-0 group-hover:scale-110 transition-transform duration-300" />
          {isSidebarOpen && (
            <span className="text-[17px]">Dashboard</span>
          )}
        </NavLink>

        <NavLink
          to="/customers"
          className={`${menuStyle} ${isSidebarOpen ? "justify-start" : "justify-center"
            }`}
        >
          <MdPeople className="text-[24px] shrink-0 group-hover:scale-110 transition-transform duration-300" />

          {isSidebarOpen && (
            <span className="text-[17px]">Customers</span>
          )}
        </NavLink>

        <NavLink
          to="/dealers"
          className={`${menuStyle} ${isSidebarOpen ? "justify-start" : "justify-center"
            }`}
        >
          <MdStore className="text-[24px] shrink-0 group-hover:scale-110 transition-transform duration-300" />

          {isSidebarOpen && (
            <span className="text-[17px]">Dealers</span>
          )}
        </NavLink>

        <NavLink
          to="/products"
          className={`${menuStyle} ${isSidebarOpen ? "justify-start" : "justify-center"
            }`}
        >
          <MdInventory2 className="text-[24px] shrink-0 group-hover:scale-110 transition-transform duration-300" />

          {isSidebarOpen && (
            <span className="text-[17px]">Products</span>
          )}
        </NavLink>

        <NavLink
          to="/installations"
          className={`${menuStyle} ${isSidebarOpen ? "justify-start" : "justify-center"
            }`}
        >
          <MdEngineering className="text-[24px] shrink-0 group-hover:scale-110 transition-transform duration-300" />

          {isSidebarOpen && (
            <span className="text-[17px]">Installations</span>
          )}
        </NavLink>






        {/* <NavLink
          to="/support"
          className={`${menuStyle} ${isSidebarOpen ? "justify-start" : "justify-center"
            }`}
        >
          <MdSupportAgent className="text-[24px] shrink-0 group-hover:scale-110 transition-transform duration-300" />

          {isSidebarOpen && (
            <span className="text-[17px]">Support</span>
          )}
        </NavLink> */}






        <NavLink
          to="/employees"
          className={`${menuStyle} ${isSidebarOpen ? "justify-start" : "justify-center"
            }`}
        >
          <MdManageAccounts className="text-[24px] shrink-0 group-hover:scale-110 transition-transform duration-300" />
          {isSidebarOpen && (
            <span className="text-[17px]">Employees</span>
          )}
        </NavLink>


        {/* <NavLink
          to="/reports"
          className={`${menuStyle} ${isSidebarOpen ? "justify-start" : "justify-center"
            }`}
        >
          <MdAssessment className="text-[24px] shrink-0 group-hover:scale-110 transition-transform duration-300" />

          {isSidebarOpen && (
            <span className="text-[17px]">Reports</span>
          )}
        </NavLink> */}






        <NavLink
          to="/settings"
          className={`${menuStyle} ${isSidebarOpen ? "justify-start" : "justify-center"}`}
        >
          <MdSettings className="text-[24px] shrink-0 group-hover:scale-110 transition-transform duration-300" />

          {isSidebarOpen && (
            <span className="text-[17px]">Settings</span>
          )}

        </NavLink>

      </nav>


      {/* Bottom Profile */}

      {/* {isSidebarOpen && (
        <div className="p-3">

          <div className="rounded-2xl bg-slate-800 border border-slate-700 p-3 hover:border-emerald-400 transition">

            <p className="text-white font-semibold">
              Mayank Vaishnav
            </p>

            <p className="text-slate-400 text-sm mt-1">
              Administrator
            </p>

          </div>

        </div>
      )} */}


    </aside>
  );
}

export default Sidebar;
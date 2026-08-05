import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../../components/Dashboard/StatCard";
import { formatCurrency } from "../../utils/formatCurrency";
import QuickActions from "../../components/Dashboard/QuickActions";
import LiveClock from "../../components/Dashboard/LiveClock";
import toast from "react-hot-toast";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";


import {
  HiOutlineUsers,
  HiOutlineUserGroup,
  HiOutlineBuildingOffice2,
  HiOutlineBriefcase,
  HiOutlineCurrencyDollar,
  HiOutlineClipboardDocumentList,
  HiOutlineClock,
  HiOutlineGift,
  HiOutlineShieldCheck,
} from "react-icons/hi2";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/dashboard`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard");
      }

      const data = await response.json();

      setDashboard(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (!dashboard) {
    return (
      <div className="text-lg font-semibold text-red-500">
        Failed to load dashboard
      </div>
    );
  }

  const cards = [
    {
      title: "Total Employees",
      value: dashboard.totalEmployees,
      icon: <HiOutlineUsers />,
      color: "from-blue-500 to-cyan-500",
      path: "/employees",
    },
    {
      title: "Active Employees",
      value: dashboard.activeEmployees,
      icon: <HiOutlineShieldCheck />,
      color: "from-green-500 to-emerald-500",
      path: "/employees?status=Active",
    },
    {
      title: "Total Products",
      value: dashboard.totalProducts,
      icon: <HiOutlineBuildingOffice2 />,
      color: "from-indigo-500 to-blue-600",
      path: "/products",
    },
    {
      title: "Total Customers",
      value: dashboard.totalCustomers,
      icon: <HiOutlineUsers />,
      color: "from-purple-500 to-violet-500",
      path: "/customers-list",
    },
    {
      title: "Total Dealer Customers",
      value: dashboard.totalDealerCustomers,
      icon: <HiOutlineBuildingStorefront />,
      color: "from-orange-500 to-amber-500",
      path: "/dealer-customers",
    },
    {
      title: "Total Leads",
      value: dashboard.totalLeads,
      icon: <HiOutlineClipboardDocumentList />,
      color: "from-orange-500 to-yellow-500",
      path: "/customers",
    },
    {
      title: "Salary Paid",
      value: formatCurrency(dashboard.totalSalaryPaid),
      icon: <HiOutlineCurrencyDollar />,
      color: "from-teal-500 to-green-500",
    },
    {
      title: "Pending Salary",
      value: formatCurrency(dashboard.totalPendingSalary),
      icon: <HiOutlineClock />,
      color: "from-rose-500 to-red-500",
    },
    {
      title: "Total Incentive",
      value: formatCurrency(dashboard.totalIncentive),
      icon: <HiOutlineGift />,
      color: "from-fuchsia-500 to-pink-500",
    },
  ];

  return (




    <div className="space-y-8">


      <LiveClock />
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
            onClick={() => {
              if (card.path) {
                navigate(card.path);
              }
            }}
            clickable={!!card.path}
          />
        ))}
      </div>
      <QuickActions dashboard={dashboard} />
    </div>
  );
}

export default Dashboard;
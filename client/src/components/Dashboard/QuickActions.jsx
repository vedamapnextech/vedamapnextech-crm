import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import {
    HiOutlineUserPlus,
    HiOutlineCube,
    HiOutlineClock,
    HiOutlineClipboardDocumentList,
} from "react-icons/hi2";



const QuickActions = ({ dashboard }) => {

    const actions = [
        {
            title: "Add Employee",
            subtitle: "Create New Employee",
            icon: <HiOutlineUserPlus />,
            color: "from-blue-500 to-cyan-500",
            link: "/employees",
        },
        {
            title: "Product Sales",
            subtitle: formatCurrency(dashboard?.totalProductSales || 0),
            icon: <HiOutlineCube />,
            color: "from-green-500 to-emerald-500",
            link: "/customers-list",
        },
        {
            title: "Pending Installations",
            subtitle: `${dashboard?.pendingInstallations || 0} Pending`,
            icon: <HiOutlineClock />,
            color: "from-orange-500 to-red-500",
            link: "/installations",
        },
        {
            title: "Total Installations",
            subtitle: `${dashboard?.totalInstallations || 0} Total`,
            icon: <HiOutlineClipboardDocumentList />,
            color: "from-purple-500 to-pink-500",
            link: "/installations",
        },
    ];

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800">
                Quick Actions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
                Frequently used shortcuts
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {actions.map((item) => (
                    <Link
                        key={item.title}
                        to={item.link}
                        className="group rounded-2xl border border-slate-200 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"  >
                        <div
                            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color}
                             text-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                        >
                            {item.icon}
                        </div>
                        <h3 className="mt-5 text-base font-semibold text-slate-800 leading-6">
                            {item.title}
                        </h3>
                        <p className="mt-2 text-2xl font-bold text-slate-800 leading-tight break-words">
                            {item.subtitle}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default QuickActions;
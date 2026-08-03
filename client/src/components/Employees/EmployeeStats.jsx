import {
    FiUsers,
    FiUserCheck,
    FiUserX,
    FiTool,
} from "react-icons/fi";

function EmployeeStats({
    totalEmployees,
    activeEmployees,
    inactiveEmployees,
    engineers,
    selectedStat,
    setSelectedStat,
    setStatusFilter,
    setRoleFilter,
}) {

    const cards = [
        {
            title: "Total Employees",
            value: totalEmployees,
            icon: <FiUsers />,
            bg: "bg-blue-500",
            filter: "",
            clickable: true,
        },

        {
            title: "Active",
            value: activeEmployees,
            icon: <FiUserCheck />,
            bg: "bg-emerald-500",
            filter: "Active",
            clickable: true,
        },

        {
            title: "Inactive",
            value: inactiveEmployees,
            icon: <FiUserX />,
            bg: "bg-red-500",
            filter: "Inactive",
            clickable: true,
        },

        {
            title: "Engineers",
            value: engineers,
            icon: <FiTool />,
            bg: "bg-orange-500",
            filter: "Engineer",
            clickable: true,
        },
    ];

    return (

        <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (

                <div
                    key={card.title}
                    onClick={() => {

                        if (!card.clickable) return;

                        setSelectedStat(card.title);

                        if (card.title === "Engineers") {

                            setStatusFilter("");
                            setRoleFilter("engineer");

                        } else {

                            setRoleFilter("");
                            setStatusFilter(card.filter);

                        }

                    }}
                    className={`group rounded-2xl border bg-white px-6 py-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl        ${selectedStat === card.title
                        ? "border-emerald-500 ring-2 ring-emerald-200"
                        : "border-slate-200"
                        }
        ${card.clickable ? "cursor-pointer" : "cursor-default"}
    `}
                >

                    <div className="flex items-center justify-between gap-4">
                        <div>

                            <p className="text-sm font-medium text-slate-500">
                                {card.title}
                            </p>

                            <h2 className="mt-1 text-3xl font-bold text-slate-800">
                                {card.value}
                            </h2>

                        </div>

                        <div
                            className={`${card.bg} flex h-14 w-14 items-center justify-center rounded-xl text-2xl text-white transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}
                        >
                            {card.icon}
                        </div>

                    </div>

                </div>

            ))}

        </div>

    );

}

export default EmployeeStats;
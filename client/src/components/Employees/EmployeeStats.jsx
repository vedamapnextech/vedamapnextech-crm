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
}) {

    const cards = [

        {
            title: "Total Employees",
            value: totalEmployees,
            icon: <FiUsers />,
            bg: "bg-blue-500",
        },

        {
            title: "Active",
            value: activeEmployees,
            icon: <FiUserCheck />,
            bg: "bg-emerald-500",
        },

        {
            title: "Inactive",
            value: inactiveEmployees,
            icon: <FiUserX />,
            bg: "bg-red-500",
        },

        {
            title: "Engineers",
            value: engineers,
            icon: <FiTool />,
            bg: "bg-orange-500",
        },

    ];

    return (

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

            {cards.map((card) => (

                <div
                    key={card.title}
                    className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-slate-500">
                                {card.title}
                            </p>

                            <h2 className="mt-2 text-4xl font-bold text-slate-800">
                                {card.value}
                            </h2>

                        </div>

                        <div
                            className={`${card.bg} flex h-16 w-16 items-center justify-center rounded-2xl text-3xl text-white transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}
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
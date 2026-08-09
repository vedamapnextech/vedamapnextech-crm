import {
    FiTool,
    FiClock,
    FiCheckCircle,
    FiXCircle,
} from "react-icons/fi";

function InstallationStats({
    totalInstallations,
    pendingInstallations,
    completedInstallations,
    cancelledInstallations,
    statusFilter,
    setStatusFilter,
}) {
    const cards = [
        {
            title: "Total Installations",
            value: totalInstallations,
            icon: <FiTool />,
            bg: "bg-blue-500",
            filter: "All",
        },
        {
            title: "Pending",
            value: pendingInstallations,
            icon: <FiClock />,
            bg: "bg-orange-500",
            filter: "Pending",
        },
        {
            title: "Completed",
            value: completedInstallations,
            icon: <FiCheckCircle />,
            bg: "bg-emerald-500",
            filter: "Completed",
        },
        {
            title: "Cancelled",
            value: cancelledInstallations,
            icon: <FiXCircle />,
            bg: "bg-red-500",
            filter: "Cancelled",
        },
    ];

    const handleCardClick = (filter) => {
        // Same card dobara click karne par filter remove
        if (statusFilter === filter) {
            setStatusFilter("All");
        } else {
            setStatusFilter(filter);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {cards.map((card) => {
                const isActive = statusFilter === card.filter;

                return (
                    <div
                        key={card.title}
                        onClick={() => handleCardClick(card.filter)}
                        className={`
                            cursor-pointer
                            group
                            rounded-3xl
                            border
                            bg-white
                            p-6
                            shadow-lg
                            transition-all
                            duration-300
                            hover:-translate-y-2
                            hover:shadow-2xl
                            ${isActive
                                ? "border-emerald-500 ring-2 ring-emerald-200"
                                : "border-slate-200"
                            }
                        `}
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
                                className={`
                                    h-16
                                    w-16
                                    rounded-2xl
                                    ${card.bg}
                                    flex
                                    items-center
                                    justify-center
                                    text-3xl
                                    text-white
                                    transition-transform
                                    duration-300
                                    group-hover:rotate-6
                                    group-hover:scale-110
                                `}
                            >
                                {card.icon}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default InstallationStats;
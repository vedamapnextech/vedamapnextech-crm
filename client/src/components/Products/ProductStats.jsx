import {
  FiPackage,
  FiCheckCircle,
  FiAlertTriangle,
  FiXCircle,
} from "react-icons/fi";

function ProductStats({
  totalProducts,
  activeProducts,
  inactiveProducts,
  lowStockProducts,
  statusFilter,
  setStatusFilter,
}) {
  const cards = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: <FiPackage />,
      bg: "bg-blue-500",
      filter: "All",
    },
    {
      title: "Active Products",
      value: activeProducts,
      icon: <FiCheckCircle />,
      bg: "bg-emerald-500",
      filter: "Active",
    },
    {
      title: "Low Stock",
      value: lowStockProducts,
      icon: <FiAlertTriangle />,
      bg: "bg-orange-500",
     filter: "LowStock",

    },
    {
      title: "Inactive Products",
      value: inactiveProducts,
      icon: <FiXCircle />,
      bg: "bg-red-500",
      filter: "Inactive",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          onClick={() => setStatusFilter(card.filter)}
          className={`group cursor-pointer rounded-3xl border p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${statusFilter === card.filter
            ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200 scale-[1.02] hover:border-emerald-300"
            : "border-slate-200 bg-white"
            }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">{card.title}</p>

              <h2 className="mt-2 text-4xl font-bold text-slate-800">
                {card.value}
              </h2>
            </div>

            <div
              className={`h-16 w-16 rounded-2xl ${card.bg} flex items-center justify-center text-3xl text-white transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductStats;
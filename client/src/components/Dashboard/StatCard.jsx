const StatCard = ({ title, value, icon, color }) => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-slate-200
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        p-6
      "
    >
      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-slate-800 mt-3">
            {value}
          </h2>

        </div>

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl text-white ${color}`}
        >
          {icon}
        </div>

      </div>
    </div>
  );
};

export default StatCard;
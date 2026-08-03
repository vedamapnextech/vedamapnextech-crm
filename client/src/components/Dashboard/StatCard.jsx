const StatCard = ({
  title,
  value,
  icon,
  color,
  subtitle,
  onClick,
  clickable = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
    group
    relative
    overflow-hidden
    rounded-3xl
    border
    border-slate-200
    bg-white
    p-6
    shadow-sm
    transition-all
    duration-300
    ${clickable
          ? "cursor-pointer hover:-translate-y-2 hover:shadow-2xl"
          : ""
        }
  `}
    >
      <div
        className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${color}`}
      />

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-800">
            {title}
          </p>

          <h2 className="mt-3 text-2xl font-bold text-slate-800">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-400">
              {subtitle}
            </p>
          )}

        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${color} text-3xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
        >
          {icon}
        </div>

      </div>
    </div>
  );
};

export default StatCard;
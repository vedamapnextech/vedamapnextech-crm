function ProductInfoCard({ icon, title, value }) {
    return (
        <div
            className="group flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-xl"
        >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-white">
                {icon}
            </div>

            <div className="flex-1">

                <p className="text-sm font-medium text-slate-500">
                    {title}
                </p>

                <h3 className="mt-1 text-lg font-bold text-slate-800">
                    {value || (
                        <span className="font-medium text-slate-400">
                            Not Available
                        </span>
                    )}
                </h3>

            </div>

        </div>
    );
}

export default ProductInfoCard;
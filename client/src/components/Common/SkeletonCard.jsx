function SkeletonCard() {
    return (
        <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
            <div className="flex items-center gap-5">
                <div className="h-20 w-20 rounded-3xl bg-slate-200"></div>

                <div className="flex-1">
                    <div className="h-4 w-28 rounded bg-slate-200"></div>

                    <div className="mt-4 h-8 w-52 rounded bg-slate-200"></div>

                    <div className="mt-4 h-4 w-40 rounded bg-slate-200"></div>
                </div>
            </div>
        </div>
    );
}

export default SkeletonCard;
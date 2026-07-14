import {
    FiCheckCircle,
    FiTool,
    FiCalendar,
    FiClock,
} from "react-icons/fi";
import { formatDate } from "../../utils/formatters";

function InstallationTimeline({ installation }) {

    const timeline = [
        {
            title: "Installation Created",
            value: formatDate(installation.createdAt),
            icon: <FiCalendar />,
            color: "bg-blue-500",
        },

        {
            title: "Engineer Assigned",
            value: installation.engineer,
            icon: <FiTool />,
            color: "bg-orange-500",
        },

        {
            title: installation.status,
            value: formatDate(installation.installationDate),
            icon: <FiCheckCircle />,
            color:
                installation.status === "Completed"
                    ? "bg-emerald-500"
                    : installation.status === "Pending"
                        ? "bg-yellow-500"
                        : installation.status === "In Progress"
                            ? "bg-blue-500"
                            : installation.status === "On Hold"
                                ? "bg-purple-500"
                                : "bg-red-500",
        },

        {
            title: "Last Updated",
            value: formatDate(installation.updatedAt),
            icon: <FiClock />,
            color: "bg-slate-600",
        },
    ];

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">

            <h2 className="mb-8 text-3xl font-bold text-slate-800">
                Installation Timeline
            </h2>

            <div className="space-y-8">

                {timeline.map((item, index) => (

                    <div key={index} className="flex gap-5">

                        <div className="flex flex-col items-center">

                            <div
                                className={`${item.color} flex h-14 w-14 items-center justify-center rounded-full text-xl text-white`}
                            >
                                {item.icon}
                            </div>

                            {index !== timeline.length - 1 && (
                                <div className="h-16 w-1 bg-slate-200"></div>
                            )}

                        </div>

                        <div className="pt-2">

                            <h3 className="text-xl font-bold text-slate-800">
                                {item.title}
                            </h3>

                            <p className="mt-2 text-slate-500">
                                {item.value}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default InstallationTimeline;
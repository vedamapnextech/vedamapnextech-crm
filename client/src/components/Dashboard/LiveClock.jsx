import { useEffect, useState } from "react";
import { HiMapPin } from "react-icons/hi2";

function LiveClock() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [location, setLocation] = useState("Detecting...");

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const hour = currentTime.getHours();

    const greeting =
        hour < 12
            ? "Good Morning 👋"
            : hour < 17
                ? "Good Afternoon ☀️"
                : hour < 20
                    ? "Good Evening 🌇"
                    : "Good Night 🌙";

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocation("Location Not Supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async ({ coords }) => {
                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`
                    );

                    const data = await res.json();

                    let city =
                        data.address.city ||
                        data.address.town ||
                        data.address.village ||
                        data.address.county ||
                        "";

                    const state = data.address.state || "";

                   
                    city = city.replace(" Municipal Corporation", "").trim();

                    setLocation(
                        city && state ? `${city}, ${state}` : state || city || "Unknown Location"
                    );
                } catch {
                    setLocation("Location Unavailable");
                }
            },
            () => setLocation("Permission Denied")
        );
    }, []);

    return (
        <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(16,185,129,0.35)]">
            <div className="absolute -right-16 -top-16 h-60 w-60 animate-pulse rounded-full bg-emerald-500/20 blur-3xl"></div>
            <div className="absolute -left-16 -bottom-16 h-60 w-60 animate-pulse rounded-full bg-cyan-500/20 blur-3xl"></div>
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                <div>
                    <h2 className="animate-pulse text-4xl font-bold tracking-wide text-white">
                        {greeting}
                    </h2>

                    <p className="mt-4 text-xl text-slate-300">
                        {currentTime.toLocaleDateString("en-IN", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>

                    <p className="mt-6 text-slate-400 italic">
                        Have a productive day 🚀
                    </p>
                </div>

                <div className="text-right">
                    <h1 className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400 bg-clip-text text-6xl font-black tracking-wider text-transparent drop-shadow-lg">
                        {currentTime.toLocaleTimeString("en-IN")}
                    </h1>

                    <p className="mt-4 flex items-center justify-end gap-2 text-lg text-slate-300">
                        <HiMapPin className="text-red-400" />
                        {location}
                    </p>

                    <span className="mt-5 inline-flex cursor-pointer rounded-full bg-emerald-500/20 px-5 py-2 text-sm font-semibold text-emerald-300 transition-all duration-300 hover:bg-emerald-500 hover:text-white">
                        CRM Dashboard
                    </span>
                </div>

            </div>
        </div>
    );
}

export default LiveClock;
import { Megaphone, Activity, Calendar, Eye } from "lucide-react";

export default function FlashNoticeInsight({ totalNotices, activeNotices }) {
    const stats = [
        {
            label: "Total Notices",
            value: totalNotices || 0,
            icon: <Megaphone className="text-blue-600" size={24} />,
            color: "bg-blue-50 dark:bg-blue-900/20",
            borderColor: "border-blue-100 dark:border-blue-800"
        },
        {
            label: "Active Now",
            value: activeNotices || 0,
            icon: <Activity className="text-green-600" size={24} />,
            color: "bg-green-50 dark:bg-green-900/20",
            borderColor: "border-green-100 dark:border-green-800"
        },
        {
            label: "Scheduled",
            value: totalNotices - activeNotices || 0,
            icon: <Calendar className="text-orange-600" size={24} />,
            color: "bg-orange-50 dark:bg-orange-900/20",
            borderColor: "border-orange-100 dark:border-orange-800"
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                Quick Insights
                <div className="h-1 w-1 rounded-full bg-blue-500" />
            </h3>
            <div className="grid grid-cols-1 gap-4">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`p-6 rounded-3xl border ${stat.borderColor} ${stat.color} backdrop-blur-sm transition-all hover:translate-x-1 duration-300`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                                <p className="text-3xl font-black text-gray-900 dark:text-white">{stat.value}</p>
                            </div>
                            <div className="p-3 rounded-2xl bg-white/80 dark:bg-gray-900/80 shadow-sm border border-white dark:border-gray-800">
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-6 rounded-3xl border border-blue-100 dark:border-blue-800 bg-linear-to-br from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden group">
                <div className="relative z-10">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Eye size={18} />
                        Visibility Tip
                    </h4>
                    <p className="text-xs text-blue-50 leading-relaxed font-medium">
                        Active notices are displayed at the top of the homepage. Ensure your end dates are accurate to keep content fresh.
                    </p>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <Megaphone size={120} />
                </div>
            </div>
        </div>
    );
}

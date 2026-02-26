import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { GraduationCap, School, MessageSquare, Image, Mail } from "lucide-react";

export default function KeyInsight({data}) {
    const statConfig = [
        { label: "Admissions", valueKey: "totalAdmissions", icon: School, color: "bg-emerald-50 text-emerald-600", path: "/admin/admissions" },
        { label: "Queries", valueKey: "totalQueries", icon: MessageSquare, color: "bg-cyan-50 text-cyan-600", path: "/admin/queries" },
        { label: "Blogs", valueKey: "totalBlogs", icon: MessageSquare, color: "bg-cyan-50 text-cyan-600", path: "/admin/blogs" },
        { label: "Programs", valueKey: "totalPrograms", icon: GraduationCap, color: "bg-violet-50 text-violet-600", path: "/admin/programs" },
        { label: "Gallery", valueKey: "totalImages", icon: Image, color: "bg-pink-50 text-pink-600", path: "/admin/gallery" },
        { label: "Subscribers", valueKey: "totalSubscribers", icon: Mail, color: "bg-teal-50 text-teal-600", path: "/admin/subscribers" },
    ]

    const activityData = [
        { name: 'Programs', count: data?.totalPrograms || 0 },
        { name: 'Admissions', count: data?.totalAdmissions || 0 },
        { name: 'Queries', count: data?.totalQueries || 0 },
        { name: 'Gallery', count: data?.totalImages || 0 },
        { name: 'Subscribers', count: data?.totalSubscribers || 0 },
    ]

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="size-5 text-blue-600" />
                Key Metrics
            </h3>
            <div className="grid grid-cols-2 gap-3">
                {statConfig.map((stat) => { const Icon = stat.icon; const value = data?.[stat.valueKey] ?? 0;
                    return (
                        <Link key={stat.valueKey} to={stat.path} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-blue-200 transition-all group">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${stat.color}`}>
                                    <Icon className="size-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
                                    <p className="text-lg font-bold text-gray-900">{value}</p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
import { Link } from "react-router-dom";
import {
    FileText,
    Image,
    Users,
    GraduationCap,
    School,
    Bell,
    MessageSquare,
    AppWindowMac,
    Mail,
    Settings,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const quickLinks = [
    { title: "Programs", path: "/admin/programs", icon: GraduationCap },
    { title: "Faculty", path: "/admin/faculty", icon: Users },
    { title: "Admissions", path: "/admin/admissions", icon: School },
    { title: "Blog & News", path: "/admin/blogs", icon: FileText },
    { title: "Gallery", path: "/admin/gallery", icon: Image },
    { title: "Notifications", path: "/admin/notifications", icon: Bell },
    { title: "Queries", path: "/admin/queries", icon: MessageSquare },
    { title: "Career", path: "/admin/career", icon: AppWindowMac },
    { title: "Subscribers", path: "/admin/subscribers", icon: Mail },
    { title: "Settings", path: "/admin/settings", icon: Settings },
];

export default function ViewAllQuickAccess() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-50">
                <h3 className="font-bold text-gray-900">Quick Access</h3>
                <p className="text-xs text-gray-500 mt-0.5">Jump to any section</p>
            </div>
            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                {quickLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-2 p-3 rounded-xl border border-gray-100",
                                "hover:bg-gray-50 hover:border-gray-200 transition-all group"
                            )}
                        >
                            <Icon className="size-4 text-gray-500 group-hover:text-blue-600 shrink-0" />
                            <span className="text-sm font-medium text-gray-700 truncate group-hover:text-gray-900">
                                {item.title}
                            </span>
                            <ChevronRight className="size-3.5 text-gray-300 group-hover:text-blue-500 ml-auto shrink-0" />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

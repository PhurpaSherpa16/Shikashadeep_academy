import {
    LayoutDashboard,
    FileText,
    Image,
    Users,
    GraduationCap,
    Bell,
    MessageSquare,
    Mail,
    Settings,
    School,
    AppWindowMac
} from 'lucide-react';

export const privateNavbarMenuList = [
    {
        group: "Academic & Admission",
        items: [
            {
                title: "Programs",
                path: "/admin/programs",
                icon: GraduationCap
            },
            {
                title: "Our Faculty",
                path: "/admin/faculty",
                icon: Users
            },
            {
                title: "Admissions",
                path: "/admin/admissions",
                icon: School
            },
        ]
    },
    {
        group: "Content & Media",
        items: [
            {
                title: "Blog & News",
                path: "/admin/blogs",
                icon: FileText
            },
            {
                title: "Gallery",
                path: "/admin/gallery",
                icon: Image
            },
        ]
    },
    {
        group: "Communication",
        items: [
            {
                title: "Notifications",
                path: "/admin/notifications",
                icon: Bell
            },
            {
                title: "Queries",
                path: "/admin/queries",
                icon: MessageSquare
            },
            {
                title: "Career",
                path: "/admin/career",
                icon: AppWindowMac
            },
            {
                title: "Subscribers",
                path: "/admin/subscribers",
                icon: Mail
            },
        ]
    },
    {
        group: "System",
        items: [
            {
                title: "Settings",
                path: "/admin/settings",
                icon: Settings
            },
        ]
    }
];


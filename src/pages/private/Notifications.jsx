import { Bell, Clock } from "lucide-react"

export default function Notifications() {
    const notifications = [
        {
            id: 1,
            title: "New Blog Post",
            description: "A new blog post titled 'Standardizing API error handling' has been submitted for review by Admin.",
            time: "5 minutes ago",
            read: false,
        },
        {
            id: 2,
            title: "User Registration",
            description: "A new user, Phurpa Sherpa, has registered for an account as a Guest.",
            time: "1 hour ago",
            read: true,
        },
        {
            id: 3,
            title: "System Update",
            description: "The system will be undergoing maintenance tonight from 12:00 AM to 2:00 AM GMT+5:45.",
            time: "2 hours ago",
            read: false,
        },
        {
            id: 4,
            title: "Database Backup",
            description: "A scheduled database backup has been completed successfully.",
            time: "5 hours ago",
            read: true,
        },
    ]

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-red-100 rounded-xl text-red-600">
                    <Bell className="size-6" />
                </div>
                <div>
                    <h1 className="text-3xl font-serif font-bold">Notifications</h1>
                    <p className="text-gray-500 text-sm">Stay updated with the latest activities on Shikshadeep Academy.</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {notifications.map((n) => (
                    <div key={n.id} className={`p-6 border-b border-gray-50 flex gap-4 transition-colors hover:bg-gray-50 ${n.read ? '' : 'bg-blue-50/30'}`}>
                        <div className={`size-3 mt-2 rounded-full shrink-0 ${n.read ? 'bg-transparent' : 'bg-(--blueDark)'}`} />
                        <div className="space-y-2">
                            <div className="flex items-center justify-between gap-4">
                                <h3 className="font-bold text-gray-900">{n.title}</h3>
                                <span className="text-xs text-gray-400 flex items-center gap-1 shrink-0">
                                    <Clock className="size-3" />
                                    {n.time}
                                </span>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">{n.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

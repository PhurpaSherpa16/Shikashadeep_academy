import { Bell, Check, Clock } from "lucide-react"
import { Link } from "react-router-dom"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const mockNotifications = [
    {
        id: 1,
        title: "New Blog Post",
        description: "A new blog post has been submitted for review.",
        time: "5 minutes ago",
        read: false,
    },
    {
        id: 2,
        title: "User Registration",
        description: "A new user has registered for an account.",
        time: "1 hour ago",
        read: true,
    },
    {
        id: 3,
        title: "System Update",
        description: "The system will be undergoing maintenance tonight.",
        time: "2 hours ago",
        read: false,
    },
]

export default function NotificationBell() {
    const unreadCount = mockNotifications.filter(n => !n.read).length

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative group">
                    <Bell className="size-5 text-gray-500 transition-colors group-hover:text-(--blueDark)" />
                    {unreadCount > 0 && (
                        <Badge variant="destructive" className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0 text-[10px] border-2 border-white">
                            {unreadCount}
                        </Badge>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between p-4 border-b">
                    <h4 className="font-semibold text-sm">Notifications</h4>
                    {unreadCount > 0 && (
                        <span className="text-xs text-(--blueDark) font-medium">{unreadCount} unread</span>
                    )}
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                    {mockNotifications.map((n) => (
                        <div key={n.id} className="p-4 border-b hover:bg-gray-50 transition-colors flex gap-3">
                            <div className={`size-2 mt-1.5 rounded-full shrink-0 ${n.read ? 'bg-transparent' : 'bg-(--blueDark)'}`} />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">{n.title}</p>
                                <p className="text-xs text-gray-500 line-clamp-2">{n.description}</p>
                                <p className="text-[10px] text-gray-400 flex items-center gap-1">
                                    <Clock className="size-3" />
                                    {n.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-2 border-t text-center">
                    <Button variant="ghost" size="sm" asChild className="w-full text-xs font-medium text-gray-500 hover:text-(--blueDark)">
                        <Link to="/admin/notifications">Show all notifications</Link>
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

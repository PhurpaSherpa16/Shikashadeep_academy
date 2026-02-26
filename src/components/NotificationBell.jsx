import { Bell, Clock } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useNotifications } from "../hooks/notifications/useNotifications"
import { formatDistanceToNow } from "date-fns"

export default function NotificationBell() {
    const { notifications, unreadCount, loading } = useNotifications()
    const navigate = useNavigate()

    const latestNotifications = notifications.slice(0, 3)

    const handleNotificationClick = (n) => {
        // Logic to redirect based on entity
        if (n.entity === "admission") {
            // For admissions, we currently only have a dashboard that doesn't deep link easily,
            // but we'll navigate there. If fk is available, we could potentially pass it via state.
            navigate(`/admin/admissions`, { state: { selectedId: n.fk } })
        } else if (n.entity === "blog") {
            navigate(n.fk ? `/admin/blogs/update/${n.fk}` : `/admin/blogs`)
        } else if (n.entity === "query") {
            navigate(`/admin/queries`)
        } else if (n.entity === "career") {
            navigate(n.fk ? `/admin/career/view/${n.fk}` : `/admin/career`)
        } else {
            navigate("/admin/notifications")
        }
    }

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
                    {loading ? (
                        <div className="p-8 text-center text-xs text-gray-400 italic">
                            Loading notifications...
                        </div>
                    ) : latestNotifications.length === 0 ? (
                        <div className="p-8 text-center text-xs text-gray-400">
                            No notifications yet
                        </div>
                    ) : (
                        latestNotifications.map((n) => (
                            <div
                                key={n.id}
                                onClick={() => handleNotificationClick(n)}
                                className="p-4 border-b hover:bg-gray-50 transition-colors flex gap-3 cursor-pointer"
                            >
                                <div className={`size-2 mt-1.5 rounded-full shrink-0 ${n.is_read ? 'bg-transparent' : 'bg-(--blueDark)'}`} />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">{n.title}</p>
                                    <p className="text-xs text-gray-500 line-clamp-2">{n.description}</p>
                                    <p className="text-[10px] text-gray-400 flex items-center gap-1">
                                        <Clock className="size-3" />
                                        {n.createdAt ? formatDistanceToNow(new Date(n.createdAt), { addSuffix: true }) : 'Just now'}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
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

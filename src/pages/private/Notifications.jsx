import { Bell, Clock } from "lucide-react"
import { formatDistanceToNowStrict } from "date-fns"
import Loading from "../../components/Loading"
import Error from "../../components/Error"
import { useNavigate } from "react-router-dom"
import { useNotifications } from "../../hooks/notifications/useNotifications"

export default function Notifications() {
    const { notifications, loading, error } = useNotifications()
    const navigate = useNavigate()

    const handleNotificationClick = (n) => {
        if (n.entity === "admission") {
            navigate(`/admin/admissions`, { state: { selectedId: n.fk } })
        } else if (n.entity === "blog") {
            navigate(n.fk ? `/admin/blogs/update/${n.fk}` : `/admin/blogs`)
        } else if (n.entity === "query") {
            navigate(`/admin/queries`)
        } else if (n.entity === "career") {
            navigate(n.fk ? `/admin/career/view/${n.fk}` : `/admin/career`)
        }
    }

    if (loading) return <div className="py-42"><Loading text="Loading notifications..." /></div>
    if (error) return <div className="p-8"><Error error={error} /></div>

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-6 animate_in">
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
                {notifications.length === 0 ? (
                    <div className="p-12 text-center text-gray-400 italic">
                        No notifications found.
                    </div>
                ) : (
                    notifications.map((n) => (
                        <div
                            key={n.id}
                            onClick={() => handleNotificationClick(n)}
                            className={`p-6 border-b border-gray-50 flex gap-4 transition-colors hover:bg-gray-50 cursor-pointer ${n.is_read ? '' : 'bg-blue-50/10'}`}
                        >
                            <div className={`size-3 mt-2 rounded-full shrink-0 ${n.is_read ? 'bg-transparent' : 'bg-(--blueDark)'}`} />
                            <div className="space-y-2 flex-1">
                                <div className="flex items-center justify-between gap-4">
                                    <h3 className={`font-bold ${n.is_read ? 'text-gray-700' : 'text-gray-900'}`}>{n.title}</h3>
                                    <span className="text-xs text-gray-400 flex items-center gap-1 shrink-0">
                                        <Clock className="size-3" />
                                        {n.createdAt ? formatDistanceToNowStrict(new Date(n.createdAt), { addSuffix: true }) : 'Just now'}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">{n.description}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

import { Edit3, Trash2, Calendar, Clock, Image as ImageIcon, CircleQuestionMark } from "lucide-react";
import { useState } from "react";

export default function FlashNoticeTable({ notices, onEdit, onDelete, deletingId }) {
    if (!notices || notices.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-gray-100 dark:border-gray-800">
                <ImageIcon size={48} className="text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">No flash notices found.</p>
            </div>
        );
    }
    
    const [showTooltip, setShowTooltip] = useState(false);

    const getStatus = (notice) =>{
        const now = new Date()
        const start = new Date(notice.startDate)
        const end = new Date(notice.endDate)
        if(notice.isActive && now >= start && now <= end){
            return "Active"
        }else if(notice.isActive && now > end){
            return "Expired"
        }else if(notice.isActive && now < start){
            return "Scheduled"
        }else{
            return "Inactive"
        }
    }

    return (
        <div className="rounded-3xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-xl shadow-gray-200/20 dark:shadow-none">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50/50 dark:bg-gray-800/50 relative">
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Notice</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Duration</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2 relative">Status
                            <div className="relative" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
                                <CircleQuestionMark className="size-4 hover:text-blue-600 transition-colors cursor-pointer"/>
                                {showTooltip && (
                                    <div className="absolute bg-white border rounded-lg shadow -bottom-44 right-0 p-4 w-sm ">
                                        <p className="text-xs font-medium">Status of the notice</p>
                                        <div className="mt-2 font-light">
                                            <p ><span className="font-medium bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">Active</span>: Notice is currently active and visible to users</p>
                                            <p><span className="font-medium bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">Expired</span>: Notice has expired and is no longer visible</p>
                                            <p><span className="font-medium bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800">Scheduled</span>: Notice is scheduled to be active in the future</p>
                                            <p><span className="font-medium bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800">Inactive</span>: Notice is not active and is not visible to users</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {notices.map((notice) => (
                        <tr key={notice.id} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <div className="size-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center overflow-hidden border border-blue-50 dark:border-blue-800 shrink-0">
                                        {notice.image_url ? (
                                            <img src={notice.image_url} alt={notice.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon size={20} className="text-blue-600 dark:text-blue-400" />
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-semibold text-gray-900 dark:text-white truncate max-w-[200px]">{notice.title}</h4>
                                        <p className="text-sm text-gray-500 truncate max-w-[250px]">{notice.content}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                        <Calendar size={12} className="text-blue-500" />
                                        <span>Start: {new Date(notice.startDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                        <Clock size={12} className="text-red-500" />
                                        <span>End: {new Date(notice.endDate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${notice.isActive
                                        ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800'
                                        : 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800'
                                    }`}>
                                    {getStatus(notice)}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => onEdit(notice)}
                                        className="p-2 rounded-lg text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all active:scale-95"
                                        title="Edit Notice">
                                        <Edit3 size={18} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(notice.id)}
                                        disabled={deletingId === notice.id}
                                        className="p-2 rounded-lg text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all active:scale-95 disabled:opacity-50"
                                        title="Delete Notice"
                                    >
                                        {deletingId === notice.id ? (
                                            <div className="size-4 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
                                        ) : (
                                            <Trash2 size={18} />
                                        )}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

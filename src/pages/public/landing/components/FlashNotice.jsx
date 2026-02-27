import { X, Bell, CheckCircle2, Calendar, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { formatRemainingTime } from "../../../../utils/DateFormat";
import { capitalize } from "../../../../utils/captalize";

export default function FlashNotice({ flashNotice, setIsFlashNoticeOpen }) {
    const [notices, setNotices] = useState(flashNotice);
    const [dontShowAgain, setDontShowAgain] = useState(false);

    const handleClose = (id) => {
        if (dontShowAgain) {
            localStorage.setItem(`hide_notice_${id}`, "true");
        }

        const remainingNotices = notices.filter(n => n.id !== id);
        if (remainingNotices.length === 0) {
            setIsFlashNoticeOpen(false);
        } else {
            setNotices(remainingNotices);
        }
    };

    const handleCloseAll = () => {setIsFlashNoticeOpen(false)};

    if (!notices || notices.length === 0) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xl animate-in fade-in duration-500">
            {/* Close All Button - Floating at top right of screen */}
            <button onClick={handleCloseAll} className="fixed top-8 right-8 z-60 flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-red-500/60 backdrop-blur-xl text-white rounded-2xl border border-white/20 transition-all active:scale-95 group shadow-2xl">
                <span className="font-bold text-sm tracking-wide">Close All</span>
            </button>

            <div className="relative w-full max-w-2xl h-[600px] flex items-center justify-center">
                {notices.map((notice, index) => {
                    const isTop = index === 0;

                    return (
                        <div key={notice.id} style={{ zIndex: 100 - index, transform: `translateY(${index * 15}px) scale(${1 - index * 0.05})`, opacity: 1 - index * 0.15}}
                            className={`absolute w-full bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 dark:border-gray-800 transition-all duration-500 ease-in-out ${!isTop ? "blur-[2px] pointer-events-none" : "pointer-events-auto"}`}>
                            {/* Individual Close Button */}
                            {isTop && (
                                <button onClick={() => handleClose(notice.id)}
                                    className="absolute top-6 right-6 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20 backdrop-blur-md text-gray-800 dark:text-white transition-all active:scale-95 group border border-white/20" >
                                    <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                                </button>
                            )}

                            <div className="flex flex-col md:flex-row h-full max-h-[85vh]">
                                {/* Image Area */}
                                {notice.image_url && (
                                    <div className="aspect-square relative bg-gray-100 dark:bg-gray-800 min-h-[200px] md:min-h-full md:w-[45%] overflow-hidden grid place-items-center">
                                        <img
                                            src={notice.image_url}
                                            alt={notice.title}
                                            className="object-cover relative z-10 -rotate-6 border-2 border-white rounded-2xl shadow-2xl scale-90 w-4/5 h-4/5"
                                        />
                                        <img
                                            src={notice.image_url}
                                            alt=""
                                            className="absolute inset-0 w-full h-full object-cover z-0 scale-125 blur-xl opacity-30"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                                    </div>
                                )}

                                {/* Content */}
                                <div className={`${notice.image_url ? 'md:w-[55%]' : 'w-full'} p-8 md:p-10 flex flex-col justify-center gap-6`}>
                                    <div className="space-y-4">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                                            <Bell size={12} />
                                            Notice {index + 1} of {notices.length}
                                        </div>

                                        <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight">
                                            {capitalize(notice.title)}
                                        </h2>

                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium text-sm md:text-base">
                                            {notice.content.charAt(0).toUpperCase() + notice.content.slice(1)}
                                        </p>
                                    </div>

                                    <div className="pt-2 space-y-4">
                                        {/* Action Button */}
                                        <button onClick={() => handleClose(notice.id)} className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xl shadow-blue-500/30 transition-all active:scale-[0.98] text-sm">
                                            Dismiss This Notice
                                        </button>

                                        {/* Preference */}
                                        <div className="flex flex-col gap-4">
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                        checked={dontShowAgain}
                                                        onChange={(e) => setDontShowAgain(e.target.checked)}
                                                    />
                                                    <div className="w-5 h-5 border-2 border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 transition-all peer-checked:bg-blue-600 peer-checked:border-blue-600 group-hover:border-blue-400 relative">
                                                        {dontShowAgain && (
                                                            <CheckCircle2 size={16} className="text-white absolute -top-[2px] left-[-2px]" />
                                                        )}
                                                    </div>
                                                </div>
                                                <span className="text-xs text-gray-500 font-bold group-hover:text-blue-500 transition-colors select-none">
                                                    Don't show this notice again
                                                </span>
                                            </label>

                                            {notice.endDate && (
                                                <p className="text-[10px] text-gray-400 flex items-center gap-2 font-bold uppercase tracking-widest">
                                                    <Calendar className="size-3" />
                                                    {capitalize(formatRemainingTime(notice.endDate))}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Glow */}
                            <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute -right-12 -top-12 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


import { Link } from "react-router-dom";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const SubmitActionButton = ({ actions = [] }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!actions || actions.length === 0) return null;

    return (
        <div
            className="fixed bottom-20 right-8 z-50 flex flex-col items-end gap-3"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {/* Action Items - Conditional Rendering */}
            {isOpen && (
                <div className="flex flex-col items-end gap-3 mb-1 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {actions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                            <Link
                                key={index}
                                to={action.location}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 group/item"
                            >
                                <span className="px-3 py-1.5 bg-gray-900/90 backdrop-blur-sm text-white text-xs font-semibold rounded-lg shadow-xl border border-white/10 whitespace-nowrap">
                                    {action.label}
                                </span>
                                <div className="size-12 bg-white border border-gray-200 text-blue-dark rounded-full shadow-lg flex items-center justify-center hover:bg-blue-dark hover:text-white transition-all transform hover:scale-110 active:scale-95 border-b-4">
                                    {Icon ? <Icon size={18} /> : <Plus size={18} />}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}

            {/* Main Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "size-14 flex items-center justify-center bg-blue-dark hover:bg-blue-dark/90 text-white rounded-full shadow-2xl transition-all duration-300 active:scale-95 border-4 border-white z-50",
                    isOpen ? "rotate-45 bg-red-500" : "rotate-0"
                )}
            >
                <Plus className="size-7" />
            </button>

            {/* Label for main button (optional, only when closed) */}
            {!isOpen && (
                <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900/90 backdrop-blur-sm text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-white/10 pointer-events-none">
                    Manage
                </span>
            )}
        </div>
    );
};

export default SubmitActionButton;

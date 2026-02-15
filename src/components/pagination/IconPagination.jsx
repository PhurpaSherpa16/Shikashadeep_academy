import { ChevronLeft, ChevronRight } from "lucide-react";

export default function IconPagination({page, setPage, totalPages, totalItems}) {
    return (
        <div className="p-4 border-t border-gray-50 flex  flex-col sm:flex-row items-center gap-4 justify-between bg-gray-50/30">
            <p className="text-xs text-gray-500 font-medium">
                Showing <span className="text-gray-900">{totalItems}</span> of <span className="text-gray-900">{totalItems}</span> stories
            </p>
            <div className="flex items-center gap-2">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 
                    disabled:opacity-40 transition-all active:scale-95"
                >
                    <ChevronLeft className="size-4" />
                </button>
                <span className="text-xs font-medium text-gray-900 px-2 min-w-[80px] text-center">Page {page} of {totalPages || 1}</span>
                <button
                    disabled={page >= totalPages}
                    onClick={() => setPage(p => p + 1)}
                    className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 
                    disabled:opacity-40 transition-all active:scale-95"
                >
                    <ChevronRight className="size-4" />
                </button>
            </div>
        </div>
    )
}
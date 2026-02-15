
export default function Pagination({page, setPage, totalPages}){
    return(
        <div className="flex items-center justify-center gap-4 border-t border-gray-100 pt-8">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-blueDark disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-lg hover:bg-gray-50">
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
            </button>

            <span className="text-sm text-gray-700 font-medium px-4">
                Page {page} of {totalPages || 1}
            </span>

            <button
                disabled={page >= (totalPages || 1)}
                onClick={() => setPage(page + 1)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-blueDark disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-lg hover:bg-gray-50">
                Next
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
)}
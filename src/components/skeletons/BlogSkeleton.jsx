export default function BlogSkeleton() {
    return (
        <div className="border border-gray-100 rounded-xl overflow-hidden bg-white flex flex-col animate-pulse
        min-w-[280px] sm:min-w-[350px] md:min-w-[400px] min-h-[420px]">
            <div className="h-48 bg-gray-200 w-full" />
            <div className="p-4 space-y-4 flex-1">
                <div className="flex justify-between items-center">
                    <div className="h-3 bg-gray-200 rounded w-20" />
                    <div className="h-3 bg-gray-200 rounded w-16" />
                </div>
                <div className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-full" />
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                </div>
                <div className="space-y-1.5 pt-2">
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
                <div className="pt-3 border-t border-gray-50 flex items-center gap-8">
                    <div className="h-3 bg-gray-200 rounded w-12" />
                    <div className="h-3 bg-gray-200 rounded w-16" />
                </div>
            </div>
        </div>
    )
}

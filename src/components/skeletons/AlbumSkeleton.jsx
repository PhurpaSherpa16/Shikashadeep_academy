export default function AlbumSkeleton() {
    return (
        <div className="min-w-[100px] sm:min-w-[150px] md:min-w-[200px] snap-start animate-pulse">
            {/* Aerial View Stack Effect Skeleton */}
            <div className="relative h-48 w-full mb-8">
                {/* Third Image (Background) */}
                <div className="absolute inset-0 bg-gray-100 rounded-2xl rotate-6 translate-x-4 translate-y-2 opacity-40 shadow-sm" />
                {/* Second Image (Middle) */}
                <div className="absolute inset-0 bg-gray-200 rounded-2xl -rotate-3 translate-x-2 translate-y-1 opacity-70 shadow-md" />
                {/* First Image (Foreground) */}
                <div className="absolute inset-0 bg-gray-300 rounded-2xl shadow-xl z-10 border border-gray-100" />
            </div>

            {/* Album Details Skeleton */}
            <div className="space-y-3">
                <div className="h-4 bg-gray-300 rounded w-3/4" />
                <div className="space-y-1.5">
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-5/6" />
                </div>
                <div className="flex gap-4 pt-1">
                    <div className="h-4 bg-gray-200 rounded w-10" />
                    <div className="h-4 bg-gray-200 rounded w-12" />
                </div>
            </div>
        </div>
    )
}

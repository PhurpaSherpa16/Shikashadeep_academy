import { cn } from "@/lib/utils"

export default function BlogFormSkeleton() {
    return (
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-xl 
        overflow-hidden animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left Column Skeleton */}
                <div className="p-8 lg:p-12 space-y-6 border-b lg:border-b-0 lg:border-r border-gray-100">
                    <div className="space-y-4">
                        {/* Title Field */}
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-20" />
                            <div className="h-12 bg-gray-100 rounded-xl w-full" />
                        </div>

                        {/* Description Field */}
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-24" />
                            <div className="h-48 bg-gray-100 rounded-2xl w-full" />
                        </div>

                        {/* Category Field */}
                        <div className="space-y-4 pt-2">
                            <div className="flex items-center gap-2">
                                <div className="h-4 bg-gray-200 rounded w-16" />
                                <div className="h-4 bg-gray-100 rounded-full w-12" />
                            </div>

                            {/* Tag buttons skeleton */}
                            <div className="flex flex-wrap gap-2 pt-1">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="h-8 bg-gray-200 rounded-xl w-24" />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Right Column Skeleton */}
                <div className="p-8 lg:p-12 bg-gray-50/50 flex min-h-120 lg:h-full flex-col justify-between">
                    <div className="space-y-4 h-full flex flex-col">
                        <div className="h-4 bg-gray-200 rounded w-12" />
                        <div className="flex-1 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-100/50 flex items-center justify-center">
                            <div className="size-14 bg-white rounded-2xl shadow-sm" />
                        </div>
                    </div>

                    {/* Action Buttons Skeleton */}
                    <div className="flex items-center gap-4 mt-8">
                        <div className="flex-1 h-12 bg-gray-200 rounded-xl" />
                        <div className="flex-2 h-12 bg-gray-300 rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    )
}

import { Skeleton } from "@/components/ui/skeleton";

export default function InsightsSkeleton() {
    return (
        <div className="w-full space-y-6">
            <Skeleton className="h-6 w-40" />

            <div className="bg-white rounded-3xl border border-gray-100 p-6 space-y-8">
                {/* Header skeleton */}
                <div className="space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-3 w-48" />
                </div>

                {/* Stats grid skeleton */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-gray-50 space-y-2">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-8 w-12" />
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 space-y-2">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-8 w-12" />
                    </div>
                </div>

                {/* Distribution skeleton */}
                <div className="space-y-4">
                    <Skeleton className="h-4 w-36" />
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between">
                                    <Skeleton className="h-3 w-20" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                                <Skeleton className="h-1.5 w-full rounded-full" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick stats skeleton */}
                <div className="space-y-4 pt-4 border-t border-gray-50">
                    <Skeleton className="h-4 w-28" />
                    <div className="flex items-start gap-3">
                        <Skeleton className="size-8 rounded-full" />
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-3 w-32" />
                            <Skeleton className="h-2 w-48" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

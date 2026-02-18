import { Skeleton } from "@/components/ui/skeleton";

export default function AdvisorySkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4 animate-pulse shadow-sm">
            <div className="flex items-center gap-4">
                <div className="size-16 rounded-md bg-gray-200" />
                <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded-md w-3/4" />
                    <div className="h-3 bg-gray-200 rounded-md w-1/2" />
                    <div className="h-4 bg-gray-200 rounded-full w-16" />
                </div>
            </div>

            <div className="px-1 pb-1">
                <div className="bg-gray-50/50 p-4 rounded-xl space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-full" />
                    <div className="h-2 bg-gray-200 rounded w-5/6" />
                    <div className="h-2 bg-gray-200 rounded w-4/6" />
                </div>
            </div>

            <div className="mt-auto pt-2">
                <div className="h-8 bg-gray-50 rounded-lg w-full" />
            </div>
        </div>
    );
}

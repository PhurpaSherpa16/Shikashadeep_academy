import { Skeleton } from "@/components/ui/skeleton";    

export default function TeacherSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4 animate-pulse shadow-sm">
            <div className="flex items-center gap-4">
                <div className="size-16 rounded-2xl bg-gray-200" />
                <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded-md w-3/4" />
                    <div className="h-3 bg-gray-200 rounded-md w-1/2" />
                </div>
            </div>
            <div className="space-y-2 pt-2 border-t border-gray-50 mt-2">
                <div className="flex justify-between items-center">
                    <div className="h-3 bg-gray-200 rounded-md w-1/4" />
                    <div className="h-3 bg-gray-200 rounded-md w-1/4" />
                </div>
                <div className="h-10 bg-gray-100 rounded-xl w-full mt-4" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-gray-50">
                <div className="h-9 bg-gray-200 rounded-lg flex-1" />
                <div className="h-9 bg-gray-200 rounded-lg flex-1" />
            </div>
        </div>
    );
}

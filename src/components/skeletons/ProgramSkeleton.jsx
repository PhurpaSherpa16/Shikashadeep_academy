import { Card, CardContent } from "@/components/ui/card"
import { GripVertical } from "lucide-react"

export default function ProgramSkeleton({ index }) {
    return (
        <Card className={`group relative overflow-hidden transition-all duration-300 
        border-gray-100 backdrop-blur-sm flex flex-col lg:flex-row animate-pulse
        ${index % 2 === 1 ? "lg:flex-row-reverse bg-gray-50/50" : "bg-white/50"}`}>
            <CardContent className="p-6 space-y-4 w-full lg:w-1/2 flex flex-col justify-between">
                <div className="space-y-3">
                    <div className="space-y-2">
                        {/* Grade */}
                        <div className="h-3 bg-gray-200 rounded w-20" />
                        <div className="flex items-center justify-between gap-4">
                            {/* Title */}
                            <div className="h-6 bg-gray-200 rounded w-3/4" />
                            {/* Order */}
                            <div className="h-4 bg-gray-100 rounded w-8" />
                        </div>
                    </div>
                    {/* Description */}
                    <div className="space-y-1.5">
                        <div className="h-3 bg-gray-200 rounded w-full" />
                        <div className="h-3 bg-gray-200 rounded w-full" />
                        <div className="h-3 bg-gray-200 rounded w-2/3" />
                    </div>
                    {/* Features */}
                    <div className="flex gap-2 flex-wrap pt-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-6 bg-gray-200/50 rounded-lg w-24" />
                        ))}
                    </div>
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-gray-100/50">
                    {/* ID */}
                    <div className="h-3 bg-gray-100 rounded w-16" />
                    <GripVertical className="size-4 text-gray-100" />
                </div>
            </CardContent>

            <div className="w-full lg:w-1/2 h-64 lg:h-auto bg-gray-200" />
        </Card>
    )
}

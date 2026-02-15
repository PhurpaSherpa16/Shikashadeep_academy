import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, BookOpen, Star } from "lucide-react"

export default function ProgramInsights({ totalPrograms = 0 }) {
    const stats = [
        { label: "Total Active", value: totalPrograms, icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Avg. Features", value: "4.2", icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Enrolled", value: "1.2k", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Growth", value: "+12%", icon: TrendingUp, color: "text-indigo-600", bg: "bg-indigo-50" },
    ]

    return (
        <Card className="border-gray-100 shadow-sm overflow-hidden bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3 border-b border-gray-50/50">
                <CardTitle className="text-base font-bold text-gray-800">Program Insights</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col gap-1 p-3 rounded-xl bg-gray-50/50 border border-gray-100/50 hover:bg-white transition-colors duration-300">
                            <div className={`size-8 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center mb-1`}>
                                <stat.icon className="size-4" />
                            </div>
                            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</span>
                            <span className="text-lg font-bold text-gray-800">{stat.value}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

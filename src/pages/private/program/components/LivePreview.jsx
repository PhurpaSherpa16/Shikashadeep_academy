import { CardTitle } from "@/components/ui/card"
import { Layout, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import ProgramDetailCard from "@/components/program/ProgramDetailCard"

export default function LivePreview({...props}) {

    return (
        <div className="lg:col-span-2 space-y-6 h-fit">
            {/* Program Grid */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="size-8 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Layout className="size-4 text-blue-dark" />
                    </div>
                    <div>
                        <CardTitle className="text-sm font-bold text-gray-800 uppercase tracking-tight">Programs</CardTitle>
                        <p className="text-[10px] text-gray-400 mt-px">Live layout preview</p>
                    </div>
                </div>
                {/* Search Bar - Focused Bento Item */}
                <div className="group relative bg-white rounded-2xl border border-gray-100 p-1 shadow-sm transition-all 
                duration-300 focus-within:ring-2 focus-within:ring-blue-dark focus-within:border-blue-200 w-lg">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-gray-300 transition-colors 
                    group-focus-within:text-blue-dark" />
                    <Input value={props.searchQuery} onChange={(e) => props.setSearchQuery(e.target.value)}
                        placeholder="Find specific programs or grades..." className="pl-12 border-none shadow-none text-base 
                        placeholder:text-gray-300 placeholder:font-medium focus-visible:ring-0"/>
                </div>
            </div>

            <ProgramDetailCard {...props}/>
        </div>
    )
}
import { CardTitle } from "@/components/ui/card"
import { Layout, Search } from "lucide-react"
import NoDataAvailable from "@/components/NoDataAvailable"
import ProgramCard from "@/components/program/ProgramCard"
import ProgramSkeleton from "@/components/skeletons/ProgramSkeleton"
import { Input } from "@/components/ui/input"
import { useState } from "react"

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
            {props.itemLoading ? (
                <div className="flex flex-col gap-8">
                    {[1, 2, 3].map((i) => (
                        <ProgramSkeleton key={i} index={i} />
                    ))}
                </div>
            ) : props.itemError || props.error ? (
                <div className="h-64 rounded-2xl border-2 border-dashed border-red-100 bg-red-50/30 flex flex-col items-center justify-center gap-3 p-8 text-center animate-in zoom-in-95 duration-500">
                    <div className="size-12 rounded-full bg-red-100 flex items-center justify-center">
                        <Search className="size-6 text-red-500" />
                    </div>
                    <div>
                        <h3 className="text-red-900 font-bold mb-1">Failed to sync programs</h3>
                        <p className="text-red-500/80 text-sm max-w-xs">{props.itemError}</p>
                    </div>
                    <button onClick={props.handleRefresh} className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors bg-white px-4 py-2 rounded-lg shadow-sm border border-red-100">
                        Refresh Dashboard
                    </button>
                </div>
            ) : props.filteredPrograms.length === 0 ? (
                <div className="h-64 rounded-2xl border-2 border-dashed border-gray-100
                 bg-gray-50/30 flex flex-col items-center justify-center gap-3 p-8 text-center 
                 animate-in zoom-in-95 duration-500">
                    <NoDataAvailable message="No programs found" link="/admin/programs/new" linkText="Add Program" />
                </div>
            ) : (
                <div className="flex flex-col gap-8 animate-in slide-in-from-bottom-2 duration-500">
                    {props.filteredPrograms.map((program, index) => (
                        <ProgramCard key={index} program={program} index={index} {...props} />
                    ))}
                </div>
            )}
        </div>
    )
}
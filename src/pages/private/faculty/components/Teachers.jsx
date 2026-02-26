import TeacherSkeleton from "@/components/skeletons/TeacherSkeleton"
import { capitalize } from "@/utils/captalize"
import { Link } from "react-router-dom"
import { Users, Plus, ChevronRight, ChevronDown } from "lucide-react"
import Error from "@/components/Error"
import TeacherCard from "../../../../components/cards/TeacherCard"
import { useState } from "react"

export default function Teachers({...facultyProps}) {
    const {facultyLoading, facultyError, facultyData} = facultyProps
    const [isTeachersCollapsed, setIsTeachersCollapsed] = useState(false)

    return (
        <div className="xl:col-span-2 bg-gray-50 p-4 h-fit rounded-lg animate_in">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-bold">Our Teachers</h2>
                                <div className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-xs font-medium">
                                    {Object.values(facultyData || {}).flat().length} Total
                                </div>
                            </div>
                            <button
                                onClick={() => setIsTeachersCollapsed(!isTeachersCollapsed)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                                title={isTeachersCollapsed ? "Expand" : "Collapse"}
                            >
                                {isTeachersCollapsed ? (
                                    <ChevronRight className="size-5 text-gray-400 group-hover:text-gray-600" />
                                ) : (
                                    <ChevronDown className="size-5 text-gray-400 group-hover:text-gray-600" />
                                )}
                            </button>
                        </div>
            {!isTeachersCollapsed && 
                <div className="space-y-12">
                {facultyLoading ? (
                    <div className="space-y-12">
                        {Array.from({length: 2}).map(group => (
                            <div key={group} className="space-y-6">
                                <div className="h-7 bg-gray-100/50 rounded-xl w-48 animate-pulse border border-gray-100" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {Array.from({length: 4}).map(i => <TeacherSkeleton key={i} />)}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : facultyError ? (
                    <Error error={facultyError} message="Error loading faculty data" height="h-80" />
                ) : facultyData && Object.keys(facultyData).length > 0 ? (
                    Object.entries(facultyData).map(([tag, teachers], index) => (
                        <div key={index} className="space-y-6">
                            <div className="flex items-center gap-4">
                                <h2 className="text-sm text-gray-400 pl-2">
                                    {capitalize(tag)}
                                </h2>
                                <div className="h-px flex-1 bg-linear-to-r from-gray-100 to-transparent" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {teachers.map((teacher, index) => (
                                    <TeacherCard key={index} teacher={teacher} {...facultyProps}/>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="h-96 flex flex-col items-center justify-center bg-gray-50/30 border-2 border-dashed border-gray-100 rounded-4xl gap-6 text-center animate-in fade-in zoom-in duration-500">
                        <div className="bg-white size-20 rounded-3xl shadow-sm flex items-center justify-center text-gray-200">
                            <Users className="size-10" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-gray-900 font-bold">No teachers registered yet.</p>
                            <p className="text-xs text-gray-400 max-w-[200px] leading-relaxed">Start building your faculty list by adding your first teacher profile.</p>
                        </div>
                        <Link to="/admin/faculty/new" className="text-blue-dark font-semibold flex items-center gap-2
                        hover:bg-blue-dark/5 transition-colors duration-300 px-4 py-2 rounded-full">
                            <Plus className="size-4" />
                            Add Your First Teacher
                        </Link>
                    </div>
                )}
                </div>
            }
        </div>
    )
}
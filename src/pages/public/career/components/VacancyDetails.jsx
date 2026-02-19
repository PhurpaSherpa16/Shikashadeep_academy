import { capitalize } from "../../../../utils/captalize"
import { Briefcase, MapPin, Calendar, Clock, Users, DollarSign, GraduationCap, Building2, FileText, ArrowRight, MoveRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatRemainingTime } from "../../../../utils/DateFormat"
import Loading from "../../../../components/Loading"

export default function VacancyDetails({ ...vacancyProps }) {
    const { vacancyData, vacancyLoading, vacancyError } = vacancyProps

    const capitalizeWords = (str) => {
        if (!str) return ""
        return str.split(' ').map(word => capitalize(word)).join(' ')
    }

    if (vacancyLoading && !vacancyData) return <div><Loading text="Fetching Data"/></div>

    if (vacancyError) {
        return (
            <div className="w-full flex flex-col items-center justify-center py-12 text-center">
                <div className="size-14 rounded-2xl bg-red-50 grid place-items-center mb-4">
                    <Briefcase className="size-6 text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Something went wrong</h3>
                <p className="text-sm text-gray-500 mt-1">Could not load vacancy details. Please try again.</p>
            </div>
        )
    }

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6 animate-in fade-in slide-in-from-top-4 duration-300 transition-all">
                <div className="size-12 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 
                    grid place-items-center text-white shrink-0 shadow-sm">
                    <Briefcase className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                        {capitalizeWords(vacancyData?.title)}
                    </h1>
                    <p className="text-sm text-gray-400 font-medium mt-1">
                        {vacancyData?.department || "Shikshadeep Academy"}
                    </p>
                </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
                {vacancyData?.jobType && (
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-none text-xs font-semibold gap-1.5 px-3 py-1.5">
                        <Briefcase className="size-3" /> {capitalizeWords(vacancyData.jobType)}
                    </Badge>
                )}
                {vacancyData?.location && (
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-none text-xs font-semibold gap-1.5 px-3 py-1.5">
                        <MapPin className="size-3" /> {capitalizeWords(vacancyData.location)}
                    </Badge>
                )}
                {vacancyData?.no_of_applicants && (
                    <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-none text-xs font-semibold gap-1.5 px-3 py-1.5">
                        <Users className="size-3" /> {vacancyData.no_of_applicants} Position{vacancyData.no_of_applicants > 1 ? 's' : ''}
                    </Badge>
                )}
                {vacancyData?.endDate && (
                    <Badge variant="secondary" className="bg-red-50 text-red-700 border-none text-xs font-semibold gap-1.5 px-3 py-1.5">
                        <Calendar className="size-3" /> {formatRemainingTime(new Date(vacancyData.endDate))}
                    </Badge>
                )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 my-6"></div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                {vacancyData?.salary && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80">
                        <div className="size-9 rounded-lg bg-amber-50 grid place-items-center shrink-0">
                            <DollarSign className="size-4 text-green-600" />
                        </div>
                        <div>
                            <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Salary</p>
                            <p className="text-sm font-bold text-gray-800">{vacancyData.salary}</p>
                        </div>
                    </div>
                )}
                {vacancyData?.experience && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80">
                        <div className="size-9 rounded-lg bg-blue-50 grid place-items-center shrink-0">
                            <Clock className="size-4 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Experience</p>
                            <p className="text-sm font-bold text-gray-800">{vacancyData.experience} Years</p>
                        </div>
                    </div>
                )}
                {vacancyData?.qualification && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80">
                        <div className="size-9 rounded-lg bg-indigo-50 grid place-items-center shrink-0">
                            <GraduationCap className="size-4 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Qualification</p>
                            <p className="text-sm font-bold text-gray-800">{capitalizeWords(vacancyData.qualification)}</p>
                        </div>
                    </div>
                )}
                {vacancyData?.endDate && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80">
                        <div className="size-9 rounded-lg bg-rose-50 grid place-items-center shrink-0">
                            <Calendar className="size-4 text-rose-600" />
                        </div>
                        <div>
                            <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Deadline</p>
                            <p className="text-sm font-bold text-gray-800">
                                {new Date(vacancyData.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Description */}
            {vacancyData?.description && (
                <>
                    <div className="border-t border-gray-100 my-6"></div>
                    <div>
                        <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <Building2 className="size-4 text-blue-600" />
                            Job Description
                        </h2>
                        <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                            {vacancyData.description.charAt(0).toUpperCase() + vacancyData.description.slice(1)}
                        </div>
                    </div>
                </>
            )}

            {/* Requirements */}
            {vacancyData?.requirements && (
                <>
                    <div className="border-t border-gray-100 my-6"></div>
                    <div>
                        <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <GraduationCap className="size-4 text-indigo-600" />
                            Requirements
                        </h2>
                        <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                            {vacancyData.requirements.charAt(0).toUpperCase() + vacancyData.requirements.slice(1)}
                        </div>
                    </div>
                </>
            )}
            {/* Document url */}
            {vacancyData?.document_url && (
                <>
                    <div className="border-t border-gray-100 my-6"></div>
                    <div>
                        <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <FileText className="size-4 text-indigo-600" />
                            Document
                        </h2>
                        <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                            <a href={vacancyData.document_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-2 group">
                                View Document
                                <MoveRight className="size-4 group-hover:translate-x-1 transition-all duration-300" />
                            </a>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
import { Briefcase, MapPin, Calendar, ChevronRight, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format, formatDistanceStrict } from "date-fns";
import { capitalize } from "@/utils/captalize";
import { formatRemainingTime } from "../../../../utils/DateFormat";
import { Link } from "react-router-dom";

export default function OpeningCard({job, setApplyingJob}){
    const formatDate = (date) => {
        if (!date) return "N/A";
        try { return format(new Date(date), "MMM d, yyyy"); }
        catch { return "N/A"; }
    };

    const capitalizeWords = (str) => {
        if (!str) return "N/A";
        return str.split(' ').map(word => capitalize(word)).join(' ');
    }
    
    return(
        <div key={job.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md 
            hover:border-blue-100 transition-all duration-300 overflow-hidden">
            <div className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    {/* Left: Job info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="size-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 
                                grid place-items-center text-white shrink-0 shadow-sm 
                                group-hover:scale-105 transition-transform duration-300">
                                <Briefcase className="size-4.5" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-base font-bold text-gray-900 truncate group-hover:text-blue-700 transition-colors">
                                    {capitalizeWords(job.title)}
                                </h3>
                                <p className="text-xs text-gray-400 font-medium mt-0.5">
                                    Posted {formatDate(job.createdAt)}
                                </p>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-3">
                            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-none text-[11px] font-semibold gap-1 px-2.5 py-1">
                                <Briefcase className="size-3" /> {capitalizeWords(job.jobType)}
                            </Badge>
                            {job.location && (
                                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-none text-[11px] font-semibold gap-1 px-2.5 py-1">
                                    <MapPin className="size-3" /> {capitalizeWords(job.location)}
                                </Badge>
                            )}
                            {job.no_of_applicants && (
                                <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-none text-[11px] font-semibold gap-1 px-2.5 py-1">
                                    <Users className="size-3" /> {job.no_of_applicants} Position{job.no_of_applicants > 1 ? 's' : ''}
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Right: Deadline + Apply button */}
                    <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-3 shrink-0">
                        {job.endDate && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                <Calendar className="size-3.5" />
                                <span>Deadline: <span className="font-semibold text-gray-600">{formatRemainingTime(job.endDate)}</span></span>
                            </div>
                        )}
                        <Link to={`/career/view/${job.id}`} className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-sm 
                        hover:from-blue-700 hover:to-indigo-700 hover:shadow-md active:scale-[0.97] transition-all duration-200">
                            View 
                            <ChevronRight className="size-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
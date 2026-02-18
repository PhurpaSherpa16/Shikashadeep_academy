import { useState, Fragment } from "react";
import { ChevronDown, ChevronRight, Eye, Edit, Trash2, BadgeCheck, BadgeHelp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ApplicantsTable from "./ApplicantsTable";
import { cn } from "@/lib/utils";
import Loading from "../../../../components/Loading";
import NoDataAvailable from "../../../../components/NoDataAvailable";

export default function VacanciesTable({...tableProps}) {
    const {jobs=[], loading, handleView, handleEdit, handleDelete} = tableProps;
    const [expandedRows, setExpandedRows] = useState(new Set());

    const toggleRow = (id) => {
        const newExpandedRows = new Set(expandedRows);
        if (newExpandedRows.has(id)) {
            newExpandedRows.delete(id);
        } else {
            newExpandedRows.add(id);
        }
        setExpandedRows(newExpandedRows);
    };

    if (loading) return <div className="py-42"><Loading text='Fetching Data...' /></div>
    if (jobs.length === 0) return <div><NoDataAvailable message='No Vacancies Found, add vacancy to get started.' link='/admin/career/new' linkText='Create Job' /></div>

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 text-gray-500 border-b border-gray-100">
                        <tr className="text-[11px] uppercase tracking-widest font-bold">
                            <th className="px-6 py-4 w-10"></th>
                            <th className="px-6 py-4">Job Details</th>
                            <th className="px-6 py-4">Type & Location</th>
                            <th className="px-4 py-4 text-center">Applicants</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {jobs.map((job) => {
                            const isExpanded = expandedRows.has(job.id);
                            const applicantCount = job._count?.jobApplications || 0;

                            return (
                                <Fragment key={job.id}>
                                    <tr className={cn(
                                        "group hover:bg-blue-50/30 transition-all cursor-pointer",
                                        isExpanded && "bg-blue-50/20"
                                    )}>
                                        <td className="pl-4 py-5 text-center" onClick={() => toggleRow(job.id)}>
                                            {isExpanded ?
                                                <ChevronDown className="size-4 text-blue-600" /> :
                                                <ChevronRight className="size-4 text-gray-400 group-hover:text-blue-500" />
                                            }
                                        </td>
                                        <td className="px-3 py-5" onClick={() => toggleRow(job.id)}>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-xs text-gray-900 group-hover:text-blue-700 transition-colors uppercase">
                                                    {job.title}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-3 py-5" onClick={() => toggleRow(job.id)}>
                                            <div className="flex flex-col justify-center gap-1">
                                                <Badge variant="outline" className="w-fit bg-white text-[10px] font-bold py-0 h-5 border-gray-200 uppercase">
                                                    {job.jobType}
                                                </Badge>
                                                <p className="text-xs text-center pl-2 text-gray-500 flex items-center gap-1">
                                                    {job.location}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 text-center" onClick={() => toggleRow(job.id)}>
                                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-xs ring-1 ring-blue-100">
                                                <Users className="size-3" />
                                                {applicantCount}
                                            </div>
                                        </td>
                                        <td className="px-4 py-5" onClick={() => toggleRow(job.id)}>
                                            {job.isActive ? (
                                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-2 py-0.5 font-bold text-[10px] uppercase tracking-tighter">
                                                    Active
                                                </Badge>
                                            ) : (
                                                <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100 border-none px-2 py-0.5 font-bold text-[10px] uppercase tracking-tighter">
                                                    Inactive
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="px-4 py-5 text-right">
                                            <div className="flex justify-end items-center gap-1">
                                                <Button size="icon" variant="ghost" className="size-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50" onClick={() => handleView(job.id)}>
                                                    <Eye className="size-4" />
                                                </Button>
                                                <Button size="icon" variant="ghost" className="size-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50" onClick={() => handleEdit(job.id)}>
                                                    <Edit className="size-4" />
                                                </Button>
                                                <Button size="icon" variant="ghost" className="size-8 text-gray-400 hover:text-red-500 hover:bg-red-50" onClick={() => handleDelete(job.id)}>
                                                    <Trash2 className="size-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Expandable Row Content */}
                                    {isExpanded && (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-4 bg-gray-50/50 animate-in fade-in slide-in-from-top-2 duration-300">
                                                <div className="pb-2">
                                                    <ApplicantsTable applicants={job.jobApplications} jobId={job.id} />
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="p-4 bg-gray-50/30 border-t border-gray-100 flex justify-between items-center">
                <p className="text-xs text-gray-500 font-medium italic">
                    Tip: Click on a row or the arrow to see the latest applicants for that role.
                </p>
                <div className="flex gap-2">
                    {/* Pagination could go here if implemented in useGetAllItem */}
                </div>
            </div>
        </div>
    );
}

import { useState } from "react";
import { format, formatDistanceStrict } from "date-fns";
import {
    Briefcase, MapPin, Calendar, Clock, Users, DollarSign,
    BadgeCheck, BadgeX, FileText, User, Mail, Phone, ExternalLink
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import IconPagination from "../../../../components/pagination/IconPagination";
import NoDataAvailable from "../../../../components/NoDataAvailable";
import { capitalize } from "../../../../utils/captalize";

export default function ViewVacancy({ ...jobAndVacancyProps }) {
    const { jobDetails, applicantsDetails=[], total_items, total_pages, current_page, setPage, handleEdit, handleDelete } = jobAndVacancyProps;
    const [selectedApplicant, setSelectedApplicant] = useState(null);

    // jobdetails
    const jobtype = jobDetails?.jobType.split(' ').map(word => capitalize(word)).join(' ') 
    const joblocation = jobDetails?.location.split(' ').map(word => capitalize(word)).join(' ')
    const jobexperience = jobDetails?.experience.split(' ').map(word => capitalize(word)).join(' ')
    const jobqualification = jobDetails?.qualification.split(' ').map(word => capitalize(word)).join(' ')

    // applicants name
    const applicantName = (name) => {
        return name.split(' ').map(word => capitalize(word)).join(' ')
    }
    const coverLetter = (coverLetter) => {
        return coverLetter.charAt(0).toUpperCase() + coverLetter.slice(1)
    }


    const formatDate = (date) => {
        if (!date) return "N/A";
        try { return format(new Date(date), "MMM d, yyyy"); }
        catch { return "N/A"; }
    };

    console.log(applicantsDetails)

    return (
        <div className="animate_in space-y-4 mt-4">

            {/* ─── TOP BENTO: Full-Width Vacancy Details ─── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-linear-to-r from-blue-50/60 to-indigo-50/40 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="size-9 rounded-xl bg-blue-600 grid place-items-center shadow-sm">
                            <Briefcase className="size-4 text-white" />
                        </div>
                        <div>
                            <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-tight">{jobDetails?.title}</h2>
                            <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                                Posted {formatDate(jobDetails?.createdAt)}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {jobDetails?.isActive ? (
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none text-[10px] font-bold uppercase tracking-tighter gap-1">
                                <BadgeCheck className="size-3" /> Active
                            </Badge>
                        ) : (
                            <Badge className="bg-gray-100 text-gray-500 hover:bg-gray-100 border-none text-[10px] font-bold uppercase tracking-tighter gap-1">
                                <BadgeX className="size-3" /> Inactive
                            </Badge>
                        )}
                        <button onClick={() => handleEdit(jobDetails?.id)} className="text-[11px] font-bold text-blue-600 hover:text-blue-700 hover:underline px-2 py-1 rounded transition-colors">
                            Edit
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100">
                    <DetailCell icon={<Briefcase className="size-3.5" />} label="Job Type" value={jobtype} />
                    <DetailCell icon={<MapPin className="size-3.5" />} label="Location" value={joblocation} />
                    <DetailCell icon={<DollarSign className="size-3.5" />} label="Salary" value={jobDetails?.salary || "N/A"} />
                    <DetailCell icon={<Users className="size-3.5" />} label="Position Open Number" value={jobDetails?.no_of_applicants || 0} />
                    <DetailCell icon={<FileText className="size-3.5" />} label="Qualification" value={jobqualification} />
                    <DetailCell icon={<Clock className="size-3.5" />} label="Experience" value={jobexperience} />
                    <DetailCell icon={<Calendar className="size-3.5" />} label="Start Date" value={formatDate(jobDetails?.startDate)} />
                    <DetailCell icon={<Calendar className="size-3.5" />} label="Deadline" value={formatDate(jobDetails?.endDate)} />
                </div>

                {jobDetails?.description && (
                    <div className="px-6 py-4 border-t border-gray-100">
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Description</p>
                        <p className="text-xs text-gray-700 leading-relaxed line-clamp-3">{jobDetails.description}</p>
                    </div>
                )}
            </div>

            {/* ─── BOTTOM BENTO: Two-Column Layout ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

                {/* ── LEFT: Applicants Table ── */}
                <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="bg-gray-50/50 px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="text-xs font-bold text-gray-600 uppercase tracking-tighter flex items-center gap-1.5">
                            <Users className="size-3.5 text-blue-600" />
                            Applicants ({total_items})
                        </h3>
                    </div>

                    {!applicantsDetails || applicantsDetails.length === 0 ? (
                        <div className="flex-1 grid place-items-center p-8">
                            <div className="text-center">
                                <div className="size-12 rounded-xl bg-gray-100 grid place-items-center mx-auto mb-3">
                                    <Users className="size-5 text-gray-400" />
                                </div>
                                <p className="text-sm font-semibold text-gray-500">No Applicants Yet</p>
                                <p className="text-xs text-gray-400 mt-1">No one has applied to this vacancy yet.</p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="flex-1 overflow-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50/30 text-gray-500 text-[10px] uppercase tracking-wider font-bold sticky top-0">
                                        <tr>
                                            <th className="px-4 py-2.5">#</th>
                                            <th className="px-4 py-2.5">Name</th>
                                            <th className="px-4 py-2.5 hidden sm:table-cell">Contact</th>
                                            <th className="px-4 py-2.5 hidden md:table-cell">Applied</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {applicantsDetails.map((applicant, idx) => {
                                            const isSelected = selectedApplicant?.id === applicant.id;
                                            return (
                                                <tr key={applicant.id} onClick={() => setSelectedApplicant(applicant)}
                                                    className={`cursor-pointer transition-all ${isSelected ? "bg-blue-50 ring-1 ring-inset ring-blue-200" : "hover:bg-blue-50/30"}`}>
                                                    <td className="px-4 py-3 text-xs text-gray-400 font-medium">{idx + 1}</td>
                                                    <td className="px-4 py-3">
                                                        <span className={`font-semibold text-xs ${isSelected ? "text-blue-700" : "text-gray-800"}`}>
                                                            {applicantName(applicant.name)}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 hidden sm:table-cell">
                                                        <div className="flex flex-col text-[11px] text-gray-500">
                                                            <a href={`mailto:${applicant.email}`} className="flex items-center gap-1">
                                                                <Mail className="size-3 text-blue-600" />
                                                                {applicant.email}
                                                            </a>
                                                            <a href={`tel:${applicant.phone}`} className="flex items-center gap-1">
                                                                <Phone className="size-3 text-blue-600" />
                                                                {applicant.phone}
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 hidden md:table-cell">
                                                        <span className="text-[11px] text-gray-500">{formatDistanceStrict(applicant.createdAt, new Date(), { addSuffix: true })}</span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <IconPagination page={current_page} setPage={setPage} totalPages={total_pages} totalItems={total_items} itemLabel="applicants" />
                        </div>
                    )}
                </div>

                {/* ── RIGHT: Applicant Detail + Document Preview ── */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="bg-gray-50/50 px-5 py-3 border-b border-gray-100">
                        <h3 className="text-xs font-bold text-gray-600 uppercase tracking-tighter flex items-center gap-1.5">
                            <User className="size-3.5 text-blue-600" />
                            Applicant Details
                        </h3>
                    </div>

                    {!selectedApplicant ? (
                        <div className="flex-1 grid place-items-center p-8">
                            <div className="text-center">
                                <div className="size-12 rounded-xl bg-gray-100 grid place-items-center mx-auto mb-3">
                                    <User className="size-5 text-gray-400" />
                                </div>
                                <p className="text-xs text-gray-400 font-medium">Select an applicant from the table to view details</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 overflow-y-auto p-5 space-y-4">
                            {/* Applicant Info */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 grid place-items-center text-white text-sm font-bold shadow-sm">
                                        {selectedApplicant.name?.charAt(0)?.toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900">{applicantName(selectedApplicant.name)}</h4>
                                        <p className="text-[11px] text-gray-500">Applied {formatDate(selectedApplicant.createdAt)}</p>
                                    </div>
                                </div>

                                <div className="space-y-2 bg-gray-50/50 rounded-xl p-3">
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                        <Mail className="size-3.5 text-blue-500 shrink-0" />
                                        <span className="truncate">{selectedApplicant.email || "N/A"}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                        <Phone className="size-3.5 text-blue-500 shrink-0" />
                                        <span>{selectedApplicant.phone || "N/A"}</span>
                                    </div>
                                </div>

                                <div className="space-y-2 bg-gray-50/50 rounded-xl p-3">
                                    <FileText className="size-3 text-blue-500" />
                                    <p className="text-xs font-bold text-gray-900">{coverLetter(selectedApplicant.cover_letter)}</p>
                                </div>
                            </div>

                            {/* Resume / Document Preview */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                                        <FileText className="size-3 text-blue-500" /> Resume
                                    </p>
                                    {selectedApplicant.resume_url && (
                                        <a href={selectedApplicant.resume_url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 transition-colors">
                                            Open Full <ExternalLink className="size-3" />
                                        </a>
                                    )}
                                </div>

                                {selectedApplicant.resume_url ? (
                                    <div className="rounded-xl border border-gray-200 overflow-hidden bg-gray-50">
                                        <iframe src={selectedApplicant.resume_url} title={`Resume - ${selectedApplicant.name}`} className="w-full h-[400px]" />
                                    </div>
                                ) : (
                                    <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/50 p-6 text-center">
                                        <FileText className="size-6 text-gray-300 mx-auto mb-2" />
                                        <p className="text-xs text-gray-400 italic">No resume uploaded</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ─── Small reusable cell for the top bento grid ─── */
function DetailCell({ icon, label, value }) {
    return (
        <div className="bg-white px-5 py-3.5 flex items-start gap-3">
            <div className="size-7 rounded-lg bg-blue-50 grid place-items-center text-blue-600 shrink-0 mt-0.5">
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
                <p className="text-xs font-semibold text-gray-800 mt-0.5">{value}</p>
            </div>
        </div>
    );
}
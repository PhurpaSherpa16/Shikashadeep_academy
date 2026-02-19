import { FileText, ExternalLink, Calendar, Mail, Phone } from "lucide-react";
import { format, formatDistanceStrict } from "date-fns";
import { Link } from "react-router-dom";
import { capitalize } from "../../../../utils/captalize";
import { formatRemainingTime } from "../../../../utils/DateFormat";

export default function ApplicantsTable({ applicants = [], jobId }) {
    if (applicants.length === 0) {
        return (
            <div className="p-8 text-center bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                <p className="text-sm text-gray-500 italic">No applicants found for this vacancy yet.</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                <h4 className="text-xs font-bold text-gray-600 uppercase tracking-tighter flex items-center gap-1.5">
                    <FileText className="size-3.5 text-blue-600" />
                    Top Recent Applicants
                </h4>
                <Link to={`/admin/career/view/${jobId}`} className="text-[10px] font-bold text-blue-600 hover:text-blue-700 hover:underline px-2 py-1 rounded transition-colors">
                    View All Applicants
                </Link>
            </div>
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/30 text-gray-500 text-[11px] uppercase tracking-wider font-bold">
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Contact Info</th>
                        <th className="px-4 py-2">Applied Date</th>
                        <th className="px-4 py-2 text-right">Resume</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {applicants.map((applicant) => (
                        <tr key={applicant.id} className="hover:bg-blue-50/30 transition-colors">
                            <td className="px-4 py-3">
                                <span className="font-semibold text-gray-800">{capitalize(applicant.name)}</span>
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex flex-col text-xs text-gray-600">
                                    <span className="flex items-center gap-1">
                                        <Mail className="size-3" />
                                        {applicant.email}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Phone className="size-3" />
                                        {applicant.phone}
                                    </span>
                                </div>
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                    <Calendar className="size-3" />
                                    {applicant.createdAt ? formatRemainingTime(new Date(applicant.createdAt)) : "N/A"}
                                </div>
                            </td>
                            <td className="px-4 py-3 text-right">
                                {applicant.resume_url ? (
                                    <a
                                        href={applicant.resume_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-xs transition-colors"
                                    >
                                        View Resume
                                        <ExternalLink className="size-3" />
                                    </a>
                                ) : (
                                    <span className="text-xs text-gray-400 italic">No File</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

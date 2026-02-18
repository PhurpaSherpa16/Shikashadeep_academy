import { useParams, useNavigate } from 'react-router-dom';
import { useGetItemById } from '../../../hooks/useGetItemById';
import { updateStudentApplication } from '../../../api/admission/updateStudentApplication';
import { useEffect, useState } from 'react';
import { ArrowLeft, Mail, Phone, Calendar, User, FileText, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import useGetAllItem from '../../../hooks/useGetAllItem'; // Assuming we might want to refresh list, but primarily for consistency

export default function StudentApplicationDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { item: application, loading, error } = useGetItemById('admission/application', id);
    const [isMarkedSeen, setIsMarkedSeen] = useState(false);

    // Mark as open when application is loaded
    useEffect(() => {
        const markAsOpen = async () => {
            if (application && !application.is_open && !isMarkedSeen) {
                try {
                    await updateStudentApplication(id, { is_open: true });
                    setIsMarkedSeen(true);
                } catch (err) {
                    console.error("Failed to mark application as open:", err);
                }
            } else if (application?.is_open) {
                setIsMarkedSeen(true);
            }
        };
        markAsOpen();
    }, [application, id, isMarkedSeen]);


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error || !application) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="bg-red-50 p-4 rounded-full mb-4">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Application Not Found</h3>
                <p className="text-gray-500 mb-6">The application you are looking for does not exist or has been removed.</p>
                <button
                    onClick={() => navigate('/admin/admissions')}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate_in">
            {/* Header / Navigation */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => navigate('/admin/admissions')}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="font-medium text-sm">Back to Admissions</span>
                </button>

                <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">
                        Received on {format(new Date(application.createdAt), 'MMMM d, yyyy')}
                    </span>
                    <div className="h-4 w-px bg-gray-200"></div>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${application.is_open || isMarkedSeen
                            ? 'bg-gray-50 text-gray-600 border-gray-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                        {application.is_open || isMarkedSeen ? (
                            <>
                                <CheckCircle2 className="w-3.5 h-3.5" /> Reviewed
                            </>
                        ) : (
                            <>
                                <Clock className="w-3.5 h-3.5" /> New
                            </>
                        )}
                    </span>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Applicant Banner */}
                <div className="bg-gray-50/50 p-8 border-b border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-blue-200">
                                {application.full_name?.charAt(0)}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-1">{application.full_name}</h1>
                                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                    <span className="flex items-center gap-1.5 bg-white px-2 py-0.5 rounded border border-gray-200 shadow-sm">
                                        <User className="w-3.5 h-3.5 text-blue-600" />
                                        Grade {application.current_grade} Applicant
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Mail className="w-3.5 h-3.5" /> {application.email}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Phone className="w-3.5 h-3.5" /> {application.phone}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        {/* Family Information */}
                        <section>
                            <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
                                <User className="w-4 h-4 text-blue-600" /> Family Information
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Father's Name</label>
                                    <p className="text-gray-900 font-medium text-base">{application.father_name}</p>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Mother's Name</label>
                                    <p className="text-gray-900 font-medium text-base">{application.mother_name}</p>
                                </div>
                            </div>
                        </section>

                        {/* Academic Information */}
                        <section>
                            <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-purple-600" /> Academic Information
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Previous Academic Results</label>
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 inline-block">
                                        <p className="text-2xl font-bold text-gray-900">{application.academic_results}</p>
                                        <p className="text-xs text-gray-500">GPA / Percentage</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Additional Information */}
                        <section className="md:col-span-2">
                            <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">
                                Remarks / Statement of Purpose
                            </h3>
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-gray-700 leading-relaxed">
                                {application.remarks ? (
                                    <p>{application.remarks}</p>
                                ) : (
                                    <p className="text-gray-400 italic">No additional remarks provided by the applicant.</p>
                                )}
                            </div>
                        </section>
                    </div>


                </div>
            </div>
        </div>
    );
}

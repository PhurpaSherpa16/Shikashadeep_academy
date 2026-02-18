import { ArrowLeft, Mail, Phone, User, FileText, Calendar } from "lucide-react"
import { format, formatDistanceStrict, formatDistanceToNowStrict } from "date-fns"
import Loading from "../../../components/Loading"
import Error from "../../../components/Error"
import { capitalize } from "../../../utils/captalize"

export default function Application({ applicationData, handleBackToList }) {
    console.log(applicationData)
    const initial = applicationData?.full_name?.split(' ').map(name => capitalize(name.charAt(0))).join('')
    const fullName = applicationData?.full_name?.split(' ').map(name => capitalize(name)).join(' ')
    const phone = applicationData?.contact_no
    const address = applicationData?.address?.split(' ').map(name => capitalize(name)).join(' ')
    const father_name = applicationData?.father_name?.split(' ').map(name => capitalize(name)).join(' ')
    const mother_name = applicationData?.mother_name?.split(' ').map(name => capitalize(name)).join(' ')
    const current_grade = applicationData?.current_grade
    const academic_info = applicationData?.academic_results
    const previous_school_name = applicationData?.previous_school_name?.split(' ').map(name => capitalize(name)).join(' ')
    const submittedAt = format(applicationData.createdAt, 'dd MMM yyyy')
    const dateDistance = formatDistanceStrict(new Date(applicationData.createdAt), new Date(), { addSuffix: true })

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Header with Back Button */}
            <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                <button onClick={handleBackToList}
                    className="p-2 hover:bg-gray-50 rounded-lg transition-colors text-gray-600 hover:text-gray-900" title="Back to list">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h3 className="font-bold text-gray-900 text-lg">Application Details</h3>
                    <p className="text-xs text-gray-500">
                        Received on {dateDistance}
                    </p>
                </div>
            </div>

            {/* Applicant Banner */}
            <div className="bg-gray-50/50 p-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-linear-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center text-xl font-bold shadow-md shadow-blue-200">
                        {initial}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">
                            {fullName}
                        </h2>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                            <a href={`tel:${phone}`} className="flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5" /> {phone}
                            </a>
                            <span className="flex items-center gap-1.5 bg-white px-2 py-0.5 rounded border border-gray-200">
                                <User className="w-3.5 h-3.5 text-blue-600" />
                                Grade {current_grade}
                            </span>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">
                                {address}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Grid */}
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Family Information */}
                    <section>
                        <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
                            <User className="w-4 h-4 text-blue-600" /> Family Information
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">
                                    Father's Name
                                </label>
                                <p className="text-gray-900 font-medium">
                                    {father_name}
                                </p>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">
                                    Mother's Name
                                </label>
                                <p className="text-gray-900 font-medium">
                                    {mother_name}
                                </p>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">
                                    Home Address
                                </label>
                                <p className="text-gray-900 font-medium">
                                    {address}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Academic Information */}
                    <section>
                        <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-purple-600" /> Academic Information
                        </h3>
                        <div className="space-y-3">
                            <div className="grid gap-2">
                                <label className="block text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">
                                    Previous Academic Results
                                </label>
                                <div className="grid gap-2">
                                    <div className="font-medium uppercase tracking-wider mb-1">
                                        <p className="text-xs text-gray-500">School Name</p>
                                        <p className="font-bold text-gray-900">
                                            {previous_school_name}
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 p-4 w-fit rounded-lg border border-gray-100">
                                        <p className="text-2xl font-bold text-gray-900">{academic_info}</p>
                                        <p className="text-xs text-gray-500">GPA / Percentage</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Additional Information */}
                    <section className="md:col-span-2">
                        <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">
                            Remarks / Statement
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-gray-700 leading-relaxed">
                            {applicationData.remarks ? (
                                <p>{applicationData.remarks}</p>
                            ) : (
                                <p className="text-gray-400 italic">No additional remarks provided.</p>
                            )}
                        </div>
                    </section>
                    {/* Meta */}
                    <div className="flex items-center gap-2 text-xs text-gray-400 pt-2 border-t border-gray-50">
                        <Calendar className="w-3.5 h-3.5" />
                        Submitted on {submittedAt}
                    </div>
                </div>
            </div>
        </div>
    )
}
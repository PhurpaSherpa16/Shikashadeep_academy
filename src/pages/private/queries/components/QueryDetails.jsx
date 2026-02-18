import { ArrowLeft, Mail, Phone, User, MessageSquare, Calendar } from 'lucide-react';
import { format, formatDistanceStrict } from 'date-fns';
import Loading from '../../../../components/Loading';
import Error from '../../../../components/Error';
import { capitalize } from '../../../../utils/captalize';

export default function QueryDetails({ queryData, queryLoading, queryError, handleBackToList }) {
    const initial = queryData?.full_name.split(' ').map(name => name.charAt(0).toUpperCase()).join('')
    const fullName = queryData?.full_name.split(' ').map(name => capitalize(name)).join(' ')
    const subject = queryData?.subject.split(' ').map(name => capitalize(name)).join(' ')
    const message = capitalize(queryData?.message)

    if (queryLoading) {
        return <Loading />
    }

    if (queryError || !queryData) {
        return <Error error={queryError} />
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Header with Back Button */}
            <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                <button
                    onClick={handleBackToList}
                    className="p-2 hover:bg-gray-50 rounded-lg transition-colors text-gray-600 hover:text-gray-900"
                    title="Back to list"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h3 className="font-bold text-gray-900 text-lg">Query Details</h3>
                    <p className="text-xs text-gray-500">
                        Received on {formatDistanceStrict(new Date(queryData.createdAt), new Date(), { addSuffix: true })}
                    </p>
                </div>
            </div>

            {/* Sender Banner */}
            <div className="bg-gray-50/50 p-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-linear-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center text-xl font-bold shadow-md shadow-blue-200">
                        {initial}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">{fullName}</h2>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                            <a href={`mailto:${queryData.email}`} className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                                <Mail className="w-3.5 h-3.5" /> {queryData.email}
                            </a>
                            {queryData.phone && (
                                <a href={`tel:${queryData.phone}`} className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                                    <Phone className="w-3.5 h-3.5" /> {queryData.phone}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Details */}
            <div className="p-6 space-y-6">
                {/* Subject */}
                <div>
                    <label className="block text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">
                        Subject
                    </label>
                    <p className="text-gray-900 font-semibold">{subject}</p>
                </div>

                {/* Message */}
                <div>
                    <label className="flex items-center gap-1.5 text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">
                        <MessageSquare className="w-3.5 h-3.5" /> Message
                    </label>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-gray-700 leading-relaxed">
                        {message ? (
                            <p>{message}</p>
                        ) : (
                            <p className="text-gray-400 italic">No message provided.</p>
                        )}
                    </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-2 text-xs text-gray-400 pt-2 border-t border-gray-50">
                    <Calendar className="w-3.5 h-3.5" />
                    Submitted on {format(new Date(queryData.createdAt), 'MMMM d, yyyy · h:mm a')}
                </div>
            </div>
        </div>
    );
}

import { Mail, Calendar, Eye, Phone, Circle, Trash } from 'lucide-react';
import { format, formatDistanceStrict } from 'date-fns';
import IconPagination from '@/components/pagination/IconPagination';
import Loading from '../../../../components/Loading';

export default function QueryTable({...queryTableProps }) {
    const { isDeletingId, deleteLoading, handleDelete, queriesLoading, queriesData, handleViewQuery, page, setPage, total_page, total_items} = queryTableProps

    if (queriesLoading) {
        return (
            <div className='py-42'>
                <Loading text='Loading...'/>
            </div>
        );
    }

    if (!queriesData || queriesData.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
                <div className="bg-gray-50 p-4 rounded-full mb-4">
                    <Mail className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">No Queries Yet</h3>
                <p className="text-gray-500 text-sm">New queries will appear here.</p>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Recent Queries</h3>
                    <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">
                        {total_items} Total
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                                <th className="px-6 py-3">Sender</th>
                                <th className="px-6 py-3">Contact</th>
                                <th className="px-6 py-3">Time</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {queriesData.map((query) => (
                                <tr key={query.id} className={`transition-colors hover:bg-gray-50 group border-b-0 ${query.is_open ? '' : 'border-l-4  border-green-500 bg-green-50/60'}`}>
                                    <td className="px-6 py-4 cursor-pointer" onClick={() => handleViewQuery(query.id)}>
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${query.is_open ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-600'}`}>
                                                {query.full_name?.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className={`text-sm ${query.is_open ? 'font-medium text-gray-700' : 'font-bold text-gray-900'}`}>{query.full_name}</p>
                                                <p className="text-xs text-gray-500">{query.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href={`tel:${query.phone}`} className="text-sm text-gray-700 line-clamp-1 max-w-[180px] flex items-center gap-1">
                                            <Phone className="size-4" />
                                            {query.phone}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {formatDistanceStrict(new Date(query.createdAt), new Date(), { addSuffix: true })}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {query.is_open ? (
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full border border-gray-200">
                                                <checkCirclew className="w-3 h-3 text-green-500" />
                                                Read
                                            </span>
                                            ) : (
                                            <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded-full border border-blue-200 animate-pulse">
                                                <Circle className="w-3 h-3 text-green-500" />
                                                Unread
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {deleteLoading && isDeletingId === query.id ? (
                                            <Loading text="Deleting..." />
                                        ) : (
                                            <div className="flex">
                                                <button onClick={() => handleDelete(query.id)}
                                                    className="group-hover:opacity-100 opacity-0 text-red-500 transition-all p-2 hover:bg-red-50 rounded-lg">
                                                    <Trash className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleViewQuery(query.id)}
                                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 cursor-pointer rounded-lg transition-colors"
                                                    title="View Details">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <IconPagination page={page} setPage={setPage} totalPages={total_page} totalItems={total_items} itemLabel="queries" />
            </div>
        </>
    );
}

// import { Mails, Trash, Calendar, MoveRight, MoveLeft } from 'lucide-react';
// import IconPagination from '../../../../components/pagination/IconPagination';
// import Loading from '../../../../components/Loading';
// import { formatRemainingTime } from '../../../../utils/DateFormat';
// import NoDataAvailable from '../../../../components/NoDataAvailable';

// export default function SubscriberTable({ ...subscriberProps }) {
//     const { subscriberLoading, subscribers, setPage,
//         current_page, total_pages, total_items, deleteLoading, handleDelete, isDeletingId } = subscriberProps;

//     if (subscriberLoading) {
//         return (
//             <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center justify-center min-h-100">
//                 <Loading text="Loading Subscriber"/>
//             </div>
//         )
//     }

//     if (!subscribers || subscribers.length === 0) {
//         return (
//             <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
//                 <NoDataAvailable message="No, Subscriber presnt right now." link="/admin" linkText="Go To Home" 
//                 defaultIcon={<MoveLeft className='size-4 group-hover:-translate-x-1 transition-all duration-300'/>}/>
//             </div>
//         );
//     }

//     return (
//         <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
//             <div className="p-6 border-b border-gray-50 flex justify-between items-center">
//                 <h3 className="font-bold text-gray-900">Recent Subscribers</h3>
//                 <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">
//                     {total_items} Total
//                 </span>
//             </div>

//             <div className="overflow-x-auto">
//                 <table className="w-full text-sm text-left">
//                     <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
//                         <tr>
//                             <th className="px-6 py-4">Email</th>
//                             <th className="px-6 py-4">Subscribed Date</th>
//                             <th className="px-6 py-4 text-right">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-50">
//                         {subscribers.map((sub) => (
//                             <tr key={sub.id} className="group relative hover:bg-gray-50/80 transition-colors border-b-0">
//                                 <td className="px-6 py-4">
//                                     <div className="flex items-center gap-3">
//                                         <div className="w-9 h-9 rounded-full bg-linear-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
//                                             {sub.email?.charAt(0).toUpperCase() || 'S'}
//                                         </div>
//                                         <div>
//                                             <p className="text-gray-900 font-medium">{sub.email}</p>
//                                         </div>
//                                     </div>
//                                 </td>
//                                 <td className="px-6 py-4 text-gray-500 text-xs">
//                                     <div className="flex items-center gap-1.5">
//                                         <Calendar className="w-3.5 h-3.5" />
//                                         {formatRemainingTime(new Date(sub.updatedAt))}
//                                     </div>
//                                 </td>
//                                 <td className="px-6 py-4 flex items-center justify-end" title="Delete Subscriber">
//                                     {deleteLoading && isDeletingId === sub.id ? ( <Loading text="Deleting..." /> ) : (
//                                         <button onClick={() => handleDelete(sub.id)} className="text-red-500 transition-all p-2 hover:bg-red-50 rounded-lg cursor-pointer">
//                                             <Trash className="w-4 h-4" />
//                                         </button>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             <IconPagination page={current_page} setPage={setPage} totalPages={total_pages} totalItems={total_items} itemLabel="subscribers"/>
//         </div>
//     );
// }

import { Mails, Trash, Calendar, MoveRight, MoveLeft, Download, Loader2 } from 'lucide-react';
import IconPagination from '../../../../components/pagination/IconPagination';
import Loading from '../../../../components/Loading';
import { formatRemainingTime } from '../../../../utils/DateFormat';
import NoDataAvailable from '../../../../components/NoDataAvailable';
import { getAllItems } from '../../../../api/getAllItems';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SubscriberTable({ ...subscriberProps }) {
    const { subscriberLoading, subscribers, setPage,
        current_page, total_pages, total_items, deleteLoading, handleDelete, isDeletingId } = subscriberProps;
    
    const [downloadLoading, setDownloadLoading] = useState(false);

    const handleDownloadCSV = async () => {
        try {
            setDownloadLoading(true);
            const allSubscribers = [];
            
            // Fetch all pages
            for (let page = 1; page <= total_pages; page++) {
                const response = await getAllItems('subscriber', page);
                if (response?.data?.result) {
                    allSubscribers.push(...response.data.result);
                }
            }
            
            // Create CSV content
            const csvContent = ['Email', ...allSubscribers.map(sub => sub.email || '')].join('\n');
            
            // Create blob and download
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `subscribers_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading CSV:', error);
            toast.error('Failed to download CSV. Please try again.');
        } finally {
            setDownloadLoading(false)
        }
    }

    if (subscriberLoading) {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center justify-center min-h-100">
                <Loading text="Loading Subscriber"/>
            </div>
        )
    }

    if (!subscribers || subscribers.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
                <NoDataAvailable message="No, Subscriber presnt right now." link="/admin" linkText="Go To Home" 
                defaultIcon={<MoveLeft className='size-4 group-hover:-translate-x-1 transition-all duration-300'/>}/>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Recent Subscribers</h3>
                <div className="flex items-center gap-3">
                    <button onClick={handleDownloadCSV} disabled={downloadLoading} className="flex items-center gap-2 px-4 py-2 bg-linear-to-tl from-blue-dark to-indigo-500 text-white text-sm font-medium rounded-lg 
                    transition-colors disabled:opacity-50 disabled:cursor-not-allowed group" title="Download all emails as CSV" >
                        {downloadLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Downloading...
                            </>
                        ) : (
                            <>
                                <Download className="w-4 h-4 group-hover:scale-110 transition-all duration-300" />
                                Download CSV
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Subscribed Date</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {subscribers.map((sub) => (
                            <tr key={sub.id} className="group relative hover:bg-gray-50/80 transition-colors border-b-0">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-linear-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                                            {sub.email?.charAt(0).toUpperCase() || 'S'}
                                        </div>
                                        <div>
                                            <p className="text-gray-900 font-medium">{sub.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-500 text-xs">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {formatRemainingTime(new Date(sub.updatedAt))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 flex items-center justify-end" title="Delete Subscriber">
                                    {deleteLoading && isDeletingId === sub.id ? ( <Loading text="Deleting..." /> ) : (
                                        <button onClick={() => handleDelete(sub.id)} className="text-red-500 transition-all p-2 hover:bg-red-50 rounded-lg cursor-pointer">
                                            <Trash className="w-4 h-4" />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <IconPagination page={current_page} setPage={setPage} totalPages={total_pages} totalItems={total_items} itemLabel="subscribers"/>
        </div>
    );
}
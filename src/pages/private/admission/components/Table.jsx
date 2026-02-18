import { Calendar, Circle, Eye, Phone, Trash } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";
import { capitalize } from "../../../../utils/captalize";
import Loading from "../../../../components/Loading";
import { useState } from "react";

export default function StudentTableDiv({ studentApplicationsData, handleViewApplication, ...studentApplicationsProps }) {
    const { deleteLoading, handleDelete, isDeletingId } = studentApplicationsProps
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-4">Applicant</th>
                        <th className="px-6 py-4">Contact</th>
                        <th className="px-6 py-4">Grade</th>
                        <th className="px-6 py-4">Applied Date</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {studentApplicationsData.map((student) => (
                        <tr key={student.id} className={`group relative hover:bg-gray-50/80 transition-colors border-b-0 ${student.is_open ? '' : 'bg-blue-50/30 border-l-4 border-green-500'}`} >
                            <td className="px-6 py-4 cursor-pointer" onClick={() => handleViewApplication(student.id)}>
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200">
                                        {capitalize(student.full_name)?.charAt(0) || 'S'}
                                    </div>
                                    <div>
                                        <p className={` ${!student.is_open ? 'text-blue-900 font-bold' : ''}`}>
                                            {student.full_name.split(' ').map((name) => capitalize(name)).join(' ')}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-1.5 text-gray-600">
                                        <Phone className="w-3.5 h-3.5" />
                                        <span className="text-xs">{student.contact_no}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded text-xs border border-gray-200">
                                    {student.current_grade}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-gray-500 text-xs">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {formatDistanceToNowStrict(new Date(student.createdAt), { addSuffix: true })}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                {student.is_open ? (
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
                            <td className="px-6 py-4 flex items-center" title="View Application">
                                {deleteLoading && isDeletingId === student.id ? (
                                    <Loading text="Deleting..." />
                                ) : (
                                    <div className="flex">
                                        <button onClick={() => handleDelete(student.id)}
                                            className="group-hover:opacity-100 opacity-0 text-red-500 transition-all p-2 hover:bg-red-50 rounded-lg">
                                            <Trash className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 rounded-lg border border-transparent cursor-pointer text-gray-400 hover:text-blue-600 transition-all"
                                            onClick={() => handleViewApplication(student.id)}>
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
    )
}
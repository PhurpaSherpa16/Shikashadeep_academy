import { User } from 'lucide-react';
import IconPagination from '@/components/pagination/IconPagination';
import StudentTableDiv from './Table';

export default function StudentTable({handleViewApplication, ...studentApplicationsProps }) {
    const { studentApplicationsLoading, studentApplicationsData, studentApplicationsPage, 
        setStudentApplicationsPage, total_page, total_items} = studentApplicationsProps

    if (studentApplicationsLoading) {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!studentApplicationsData || studentApplicationsData.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
                <div className="bg-gray-50 p-4 rounded-full mb-4">
                    <User className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">No Applications Yet</h3>
                <p className="text-gray-500 text-sm">New admission applications will appear here.</p>
            </div>
        )
    }

    return (
        <>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Recent Applications</h3>
                    <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">
                        {total_items} Total
                    </span>
                </div>

                <StudentTableDiv studentApplicationsData={studentApplicationsData} handleViewApplication={handleViewApplication} {...studentApplicationsProps} />

                <IconPagination page={studentApplicationsPage} setPage={setStudentApplicationsPage} totalPages={total_page} totalItems={total_items} itemLabel="applications" />
            </div>
        </>
    );
}

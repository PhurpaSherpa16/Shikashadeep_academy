import { Users, GraduationCap, Shield, Tag } from 'lucide-react';
import InsightsSkeleton from '../../../../components/skeletons/InsightsSkeleton';
import Error from '../../../../components/Error';
import QualificationChart from './QualificationChart';
import ExperienceChart from './ExperienceChart';
import InactiveUsersTable from './InactiveUsersTable';

export default function FacultyInsights({ facultyProps, advisoryProps }) {
    // Handle loading state
    if (facultyProps?.facultyLoading || advisoryProps?.advisoryLoading) {
        return <InsightsSkeleton />;
    }

    // Handle error state
    if (facultyProps?.facultyError || advisoryProps?.advisoryError) {
        return <Error error={facultyProps?.facultyError || advisoryProps?.advisoryError} height="h-96" />;
    }

    // Extract faculty data
    const facultyData = facultyProps?.facultyData || {};
    const allTeachers = Object.values(facultyData).flat();
    const totalTeachers = allTeachers.length;

    // Extract advisory data
    const advisoryData = advisoryProps?.advisoryData || [];
    const totalAdvisory = advisoryData.length;

    // Combined stats
    const totalStaff = totalTeachers + totalAdvisory;

    // Subject/Tag distribution
    const tagDistribution = Object.entries(facultyData).map(([tag, teachers]) => ({
        name: tag,
        count: teachers.length,
        percentage: totalTeachers > 0 ? Math.round((teachers.length / totalTeachers) * 100) : 0
    })).sort((a, b) => b.count - a.count);

    return (
        <div className="w-full space-y-6">
            <div className="flex items-center gap-2 text-gray-900">
                <h2 className="text-lg font-bold">Faculty Insights</h2>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-6 space-y-8 sticky top-8 shadow-sm">
                {/* Top Stats Grid - 3 Columns */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-linear-to-br from-green-50 to-green-100/50 border border-green-200 group transition-all hover:shadow-lg">
                        <p className="text-[10px] text-green-700 font-bold uppercase tracking-widest flex items-center gap-1.5">
                            <GraduationCap className="size-3" /> Teachers
                        </p>
                        <div className="flex items-end gap-2 mt-2">
                            <p className="text-4xl font-serif font-bold text-gray-900 leading-none">{totalTeachers}</p>
                        </div>
                        <p className="text-[9px] text-green-600 mt-1 font-medium">Teaching staff</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-linear-to-br from-purple-50 to-purple-100/50 border border-purple-200 group transition-all hover:shadow-lg">
                        <p className="text-[10px] text-purple-700 font-bold uppercase tracking-widest flex items-center gap-1.5">
                            <Shield className="size-3" /> Advisory
                        </p>
                        <div className="flex items-end gap-2 mt-2">
                            <p className="text-4xl font-serif font-bold text-gray-900 leading-none">{totalAdvisory}</p>
                        </div>
                        <p className="text-[9px] text-purple-600 mt-1 font-medium">Council members</p>
                    </div>
                </div>

                {/* Subject Distribution */}
                {tagDistribution.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-gray-50">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <Tag className="size-3.5" />
                            Subject Distribution
                        </h4>
                        <div className="space-y-3">
                            {tagDistribution.slice(0, 6).map((item) => (
                                <div key={item.name} className="space-y-2">
                                    <div className="flex justify-between items-center text-[11px] font-bold">
                                        <span className="text-gray-700 capitalize">{item.name}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500">{item.count}</span>
                                            <span className="text-blue-dark bg-blue-50 px-2 py-0.5 rounded-md">{item.percentage}%</span>
                                        </div>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-linear-to-r from-blue-500 to-blue-600 transition-all duration-1000 ease-out"
                                            style={{ width: `${item.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Qualification Chart */}
                <div className="pt-4 border-t border-gray-50">
                    <QualificationChart teachers={allTeachers} />
                </div>

                {/* Experience Chart */}
                <div className="pt-4 border-t border-gray-50">
                    <ExperienceChart teachers={allTeachers} />
                </div>

                {/* Inactive Users Table */}
                <div className="pt-4 border-t border-gray-50">
                    <InactiveUsersTable teachers={allTeachers} advisoryMembers={advisoryData} />
                </div>
            </div>
        </div>
    );
}

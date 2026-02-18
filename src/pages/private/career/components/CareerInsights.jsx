import { Briefcase, Users, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function CareerInsights({ jobs = [] }) {
    const totalJobs = jobs.length;
    const activeJobs = jobs.filter(job => job.isActive).length;
    const totalApplicants = jobs.reduce((acc, job) => acc + (job._count?.jobApplications || 0), 0);

    // Simplistic Logic for recent applications (if needed, this can be refined with actual recent date logic)
    const recentApplications = jobs.reduce((acc, job) => acc + (job.jobApplications?.length || 0), 0);

    const stats = [
        {
            label: "Total Jobs",
            value: totalJobs,
            icon: <Briefcase className="size-5 text-blue-600" />,
            bgColor: "bg-blue-50",
            borderColor: "border-blue-100"
        },
        {
            label: "Active Vacancies",
            value: activeJobs,
            icon: <CheckCircle2 className="size-5 text-green-600" />,
            bgColor: "bg-green-50",
            borderColor: "border-green-100"
        },
        {
            label: "Total Applicants",
            value: totalApplicants,
            icon: <Users className="size-5 text-purple-600" />,
            bgColor: "bg-purple-50",
            borderColor: "border-purple-100"
        },
        {
            label: "Recent Activity",
            value: recentApplications,
            icon: <Clock className="size-5 text-orange-600" />,
            bgColor: "bg-orange-50",
            borderColor: "border-orange-100"
        }
    ];

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 px-1">Career Insights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {stats.map((stat, index) => (
                    <Card key={index} className={`border ${stat.borderColor} ${stat.bgColor} shadow-sm overflow-hidden`}>
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="p-2.5 rounded-xl bg-white shadow-sm">
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Quick Actions or context could go here */}
            <Card className="border-dashed border-gray-200 bg-gray-50/50 mt-6">
                <CardContent className="p-4 text-center">
                    <p className="text-xs text-gray-500">
                        Insights are updated in real-time based on current postings and applications.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

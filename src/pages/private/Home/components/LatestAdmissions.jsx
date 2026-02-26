import { Link, useNavigate } from "react-router-dom";
import { School, ChevronRight, Calendar, User, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { capitalize } from "@/utils/captalize";
import Loading from "@/components/Loading";
import NoDataAvailable from "@/components/NoDataAvailable";

export default function LatestAdmissions({ admissions, loading }) {
    const navigate = useNavigate();

    if (loading) {
        return (
            <Card className="border-gray-100 shadow-sm overflow-hidden h-full">
                <CardContent className="p-6 flex items-center justify-center h-full">
                    <Loading container={true} text="Loading admissions..." />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-gray-100 shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm h-full flex flex-col">
            <div className="p-4 border-b border-gray-50 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-50">
                        <School className="size-4 text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm">New Applications</h3>
                </div>
                <Link
                    to="/admin/admissions"
                    className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-tight"
                >
                    View All
                </Link>
            </div>
            <CardContent className="p-0 flex-1 overflow-auto">
                {!admissions?.length ? (
                    <div className="p-8">
                        <NoDataAvailable message="No applications yet" height="h-32" />
                    </div>
                ) : (
                    <div className="divide-y divide-gray-50/50">
                        {admissions.map((student) => (
                            <div
                                key={student.id}
                                onClick={() => navigate("/admin/admissions")}
                                className="flex items-center gap-3 p-3 hover:bg-white transition-colors cursor-pointer group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs shrink-0">
                                    {capitalize(student.full_name)?.charAt(0) || "A"}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-gray-900 truncate group-hover:text-emerald-600 transition-colors capitalize">
                                        {student.full_name}
                                    </p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-[10px] font-medium text-gray-500 flex items-center gap-1">
                                            <GraduationCap className="size-3" /> Grade {student.current_grade}
                                        </span>
                                        <span className="text-[10px] font-medium text-gray-400 flex items-center gap-1">
                                            <Calendar className="size-3" /> {formatDistanceToNow(new Date(student.createdAt), { addSuffix: true })}
                                        </span>
                                    </div>
                                </div>
                                <ChevronRight className="size-4 text-gray-300 group-hover:text-emerald-500 shrink-0" />
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

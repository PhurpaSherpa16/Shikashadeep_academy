import { Link } from "react-router-dom";
import { GraduationCap, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Loading from "@/components/Loading";
import NoDataAvailable from "@/components/NoDataAvailable";

export default function LatestPrograms({ programs, loading }) {
    if (loading) {
        return (
            <Card className="border-gray-100 shadow-sm overflow-hidden">
                <CardContent className="p-6">
                    <Loading container={true} text="Loading programs..." />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-gray-100 shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
            <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-violet-50">
                        <GraduationCap className="size-4 text-violet-600" />
                    </div>
                    <h3 className="font-bold text-gray-900">Latest Programs</h3>
                </div>
                <Link
                    to="/admin/programs"
                    className="text-xs font-semibold text-violet-600 hover:text-violet-700 flex items-center gap-1"
                >
                    View all <ChevronRight className="size-3.5" />
                </Link>
            </div>
            <CardContent className="p-0">
                {!programs?.length ? (
                    <div className="p-8">
                        <NoDataAvailable message="No programs yet" link="/admin/programs/new" linkText="Add Program" height="h-32" />
                    </div>
                ) : (
                    <div className="divide-y divide-gray-50">
                        {programs.map((program) => (
                            <Link
                                key={program.id}
                                to={`/admin/programs/update/${program.id}`}
                                className="flex items-center gap-4 p-4 hover:bg-gray-50/80 transition-colors group"
                            >
                                <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                                    {program.image_url ? (
                                        <img src={program.image_url} alt={program.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <GraduationCap className="size-6 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 truncate group-hover:text-violet-600 transition-colors">
                                        {program.title}
                                    </p>
                                    <p className="text-xs text-gray-500">{program.grade}</p>
                                </div>
                                <ChevronRight className="size-4 text-gray-300 group-hover:text-violet-500 shrink-0" />
                            </Link>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

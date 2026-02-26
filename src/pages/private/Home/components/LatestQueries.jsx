import { Link, useNavigate } from "react-router-dom";
import { MessageSquare, ChevronRight, Calendar, Mail, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import Loading from "@/components/Loading";
import NoDataAvailable from "@/components/NoDataAvailable";

export default function LatestQueries({ queries, loading }) {
    const navigate = useNavigate();

    if (loading) {
        return (
            <Card className="border-gray-100 shadow-sm overflow-hidden h-full">
                <CardContent className="p-6 flex items-center justify-center h-full">
                    <Loading container={true} text="Loading queries..." />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-gray-100 shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm h-full flex flex-col">
            <div className="p-4 border-b border-gray-50 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-cyan-50">
                        <MessageSquare className="size-4 text-cyan-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm">Recent Queries</h3>
                </div>
                <Link
                    to="/admin/queries"
                    className="text-[10px] font-bold text-cyan-600 hover:text-cyan-700 uppercase tracking-tight"
                >
                    View All
                </Link>
            </div>
            <CardContent className="p-0 flex-1 overflow-auto">
                {!queries?.length ? (
                    <div className="p-8">
                        <NoDataAvailable message="No queries yet" height="h-32" />
                    </div>
                ) : (
                    <div className="divide-y divide-gray-50/50">
                        {queries.map((query) => (
                            <div
                                key={query.id}
                                onClick={() => navigate("/admin/queries")}
                                className={`flex items-center gap-3 p-3 hover:bg-white transition-colors cursor-pointer group ${!query.is_open ? "bg-cyan-50/20 border-l-2 border-cyan-400" : ""
                                    }`}
                            >
                                <div
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 ${query.is_open ? "bg-gray-100 text-gray-500" : "bg-cyan-100 text-cyan-700"
                                        }`}
                                >
                                    {query.full_name?.charAt(0).toUpperCase() || "Q"}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className={`text-sm font-bold truncate group-hover:text-cyan-600 transition-colors ${query.is_open ? "text-gray-700" : "text-gray-900"}`}>
                                            {query.full_name}
                                        </p>
                                        {!query.is_open && (
                                            <span className="text-[8px] font-bold text-cyan-700 bg-cyan-100 px-1.5 py-0.5 rounded-full uppercase">
                                                New
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-[10px] font-medium text-gray-400 flex items-center gap-1">
                                            <Calendar className="size-3" /> {formatDistanceToNow(new Date(query.createdAt), { addSuffix: true })}
                                        </span>
                                    </div>
                                </div>
                                <ChevronRight className="size-4 text-gray-300 group-hover:text-cyan-500 shrink-0" />
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

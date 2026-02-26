import { GraduationCap, School, MessageSquare, Image, Mail, TrendingUp, Activity, PieChart as PieIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const statConfig = [
    { label: "Programs", valueKey: "totalPrograms", icon: GraduationCap, color: "bg-violet-50 text-violet-600", path: "/admin/programs" },
    { label: "Admissions", valueKey: "totalAdmissions", icon: School, color: "bg-emerald-50 text-emerald-600", path: "/admin/admissions" },
    { label: "Queries", valueKey: "totalQueries", icon: MessageSquare, color: "bg-cyan-50 text-cyan-600", path: "/admin/queries" },
    { label: "Gallery", valueKey: "totalImages", icon: Image, color: "bg-pink-50 text-pink-600", path: "/admin/gallery" },
    { label: "Subscribers", valueKey: "totalSubscribers", icon: Mail, color: "bg-teal-50 text-teal-600", path: "/admin/subscribers" },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

export default function HomeInsights({ data }) {
    // Transform data for charts
    const activityData = [
        { name: 'Programs', count: data?.totalPrograms || 0 },
        { name: 'Admissions', count: data?.totalAdmissions || 0 },
        { name: 'Queries', count: data?.totalQueries || 0 },
        { name: 'Gallery', count: data?.totalImages || 0 },
        { name: 'Subscribers', count: data?.totalSubscribers || 0 },
    ];

    const pieData = activityData.filter(item => item.count > 0);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            {/* Activity Chart */}
            <Card className="border-gray-100 shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
                <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                        <Activity className="size-4 text-blue-600" />
                        Engagement Overview
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-4">
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activityData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                                />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ fill: '#f3f4f6' }}
                                />
                                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Distribution Chart */}
            <Card className="border-gray-100 shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
                <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                        <PieIcon className="size-4 text-indigo-600" />
                        Data Distribution
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={70}
                                    paddingAngle={5}
                                    dataKey="count"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    iconType="circle"
                                    formatter={(value) => <span className="text-[10px] text-gray-500 font-medium">{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

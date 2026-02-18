import { GraduationCap } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function QualificationChart({ teachers }) {
    if (!teachers || teachers.length === 0) {
        return (
            <div className="text-center py-8 text-gray-400 text-sm border border-dashed border-gray-200 rounded-xl">
                No qualification data available
            </div>
        );
    }

    // Extract and count qualifications
    const qualificationCounts = teachers.reduce((acc, teacher) => {
        const qual = teacher.qualification || 'Not Specified';
        acc[qual] = (acc[qual] || 0) + 1;
        return acc;
    }, {});

    // Convert to array and sort by count
    const data = Object.entries(qualificationCounts)
        .map(([name, count]) => ({
            name: name,
            value: count,
            percentage: Math.round((count / teachers.length) * 100)
        }))
        .sort((a, b) => b.value - a.value);

    // Modern color palette
    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6366f1', '#ec4899'];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-xl">
                    <p className="text-xs font-bold text-gray-900 mb-1">{payload[0].name}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-blue-600 font-bold text-sm">{payload[0].value}</span>
                        <span className="text-gray-500 text-xs">({payload[0].payload.percentage}%)</span>
                    </div>
                </div>
            );
        }
        return null;
    };

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return percent > 0.05 ? (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={10} fontWeight="bold">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        ) : null;
    };

    return (
        <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <GraduationCap className="size-3.5" />
                Qualification Breakdown
            </h4>

            <div className="h-72 w-full bg-white rounded-2xl border border-gray-100 p-2 flex flex-col items-center justify-center">
                <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                layout="vertical"
                                verticalAlign="middle"
                                align="right"
                                wrapperStyle={{ fontSize: '11px', fontWeight: 500 }}
                                iconType="circle"
                                iconSize={8}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <p className="text-[10px] text-gray-400 italic text-center w-full max-w-xs">
                    Distribution of academic degrees held by teaching staff.
                </p>
            </div>
        </div>
    );
}

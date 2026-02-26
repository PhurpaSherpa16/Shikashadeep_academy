
import { TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid, LabelList } from 'recharts';

export default function ExperienceChart({ teachers }) {
    if (!teachers || teachers.length === 0) {
        return (
            <div className="text-center py-8 text-gray-400 text-sm border border-dashed border-gray-200 rounded-xl">
                No experience data available
            </div>
        );
    }

    // Parse experience and group into ranges
    const parseExperience = (expString) => {
        if (!expString) return 0;

        // Extract number from strings like "5+ Years", "10+ Years", etc.
        const match = expString.match(/(\d+)/);
        if (!match) return 0;

        const years = parseInt(match[1]);
        return years;
    };

    // Group teachers by experience ranges - keeping logic but formatting for Recharts
    const experienceRanges = {
        'Fresh': { min: 0, max: 0, count: 0, fullName: 'Fresh Graduate' },
        '1-2 Yrs': { min: 1, max: 2, count: 0, fullName: '1-2 Years Experience' },
        '3-5 Yrs': { min: 3, max: 5, count: 0, fullName: '3-5 Years Experience' },
        '6-9 Yrs': { min: 6, max: 9, count: 0, fullName: '6-9 Years Experience' },
        '10-14 Yrs': { min: 10, max: 14, count: 0, fullName: '10-14 Years Experience' },
        '15+ Yrs': { min: 15, max: 999, count: 0, fullName: '15+ Years Experience' }
    };

    teachers.forEach(teacher => {
        const teacherExperience = `${teacher.experience}+ Years`
        const years = parseExperience(teacherExperience)

        // Special case for "Fresh Graduate"
        if (teacher.experience === 'Fresh Graduate' || years === 0) {
            experienceRanges['Fresh'].count++;
            return;
        }

        // Find the appropriate range
        for (const [key, range] of Object.entries(experienceRanges)) {
            if (years >= range.min && years <= range.max) {
                range.count++;
                break;
            }
        }
    });

    // Convert to array
    const data = Object.entries(experienceRanges)
        .map(([name, range]) => ({
            name,
            fullName: range.fullName,
            count: range.count,
            percentage: Math.round((range.count / teachers.length) * 100)
        }));

    const colors = ['#94a3b8', '#60a5fa', '#4ade80', '#a78bfa', '#fb923c', '#f87171'];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-lg">
                    <p className="text-xs font-bold text-gray-900 mb-1">{payload[0].payload.fullName}</p>
                    <p className="text-xs text-blue-600 font-bold">
                        {payload[0].value} Teacher{payload[0].value !== 1 ? 's' : ''}
                    </p>
                    <p className="text-[10px] text-gray-500">
                        {payload[0].payload.percentage}% of total
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <TrendingUp className="size-3.5" />
                Experience Distribution
            </h4>

            <div className="h-64 w-full bg-slate-50/50 rounded-2xl border border-slate-100 p-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: '#64748b' }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: '#64748b' }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9', radius: 4 }} />
                        <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={30}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                            <LabelList dataKey="count" position="top" style={{ fill: '#64748b', fontSize: '10px', fontWeight: 'bold' }} />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}


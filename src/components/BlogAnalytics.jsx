import React from 'react'
import { TrendingUp, Tag, Clock, PieChart, Activity, MessageSquare, Eye } from 'lucide-react'

export default function BlogAnalytics({ blogs }) {
    const totalBlogs = blogs.length

    // Simple category aggregation
    const categories = blogs.reduce((acc, blog) => {
        const tagName = blog.tag?.name || 'Uncategorized'
        acc[tagName] = (acc[tagName] || 0) + 1
        return acc
    }, {})

    const sortedCategories = Object.entries(categories).sort((a, b) => b[1] - a[1])

    // Derived Stats
    const totalReadTime = blogs.reduce((acc, b) => acc + (b.description?.length || 0) / 500, 0)
    const avgReadTime = totalBlogs > 0 ? Math.ceil(totalReadTime / totalBlogs) : 0

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-8 sticky top-8">
            <div className="space-y-1">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="size-5 text-(--blueDark)" />
                    Dashboard Insights
                </h3>
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Performance Overview</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100 group hover:border-(--blueDark)/30 transition-colors">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Total Posts</p>
                    <div className="flex items-end gap-2 mt-1">
                        <p className="text-3xl font-serif font-bold text-gray-900 leading-none">{totalBlogs}</p>
                        <Activity className="size-4 text-emerald-500 mb-1 animate-pulse" />
                    </div>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100 group hover:border-(--blueDark)/30 transition-colors">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Avg. Read</p>
                    <div className="flex items-end gap-2 mt-1">
                        <p className="text-3xl font-serif font-bold text-gray-900 leading-none">{avgReadTime}</p>
                        <span className="text-[10px] font-bold text-gray-400 mb-1 uppercase">min</span>
                    </div>
                </div>
            </div>

            {/* Content Distribution */}
            <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Tag className="size-3.5" />
                    Category Distribution
                </h4>
                <div className="space-y-3">
                    {sortedCategories.slice(0, 4).map(([name, count]) => (
                        <div key={name} className="space-y-1.5">
                            <div className="flex justify-between text-[11px] font-bold">
                                <span className="text-gray-600">{name}</span>
                                <span className="text-(--blueDark)">{((count / totalBlogs) * 100).toFixed(0)}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100/50">
                                <div
                                    className="h-full bg-(--blueDark) transition-all duration-1000 ease-out rounded-full"
                                    style={{ width: `${(count / totalBlogs) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detailed Insights Section */}
            <div className="space-y-4 pt-4 border-t border-gray-50">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Activity className="size-3.5" />
                    Recent Activity
                </h4>
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="size-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                            <Eye className="size-4 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-900">Traffic Spike</p>
                            <p className="text-[10px] text-gray-500 mt-0.5">Your latest post is trending today.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="size-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                            <MessageSquare className="size-4 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-900">Engagement Up</p>
                            <p className="text-[10px] text-gray-500 mt-0.5">Average reading time increased by 15%.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Tips */}
            <div className="p-4 rounded-2xl bg-(--blueDark)/5 border border-(--blueDark)/10">
                <p className="text-xs font-bold text-(--blueDark) flex items-center gap-1.5">
                    <Clock className="size-3.5" />
                    Optimal Posting
                </p>
                <p className="text-[10px] text-gray-600 mt-1.5 leading-relaxed">
                    Stories published on <span className="font-bold text-gray-900">Tuesdays</span> get <span className="font-bold text-gray-900">2.4x</span> more engagement.
                </p>
            </div>
        </div>
    )
}

import { Image, FolderOpen, Tag, TrendingUp } from "lucide-react"

export default function GalleryInsights({ totalImages = 0, totalAlbums = 0, topTags = [] }) {
    const mockStats = {
        totalImages: totalImages || 247,
        totalAlbums: totalAlbums || 18,
        topTags: topTags.length > 0 ? topTags : [
            { name: 'sports', count: 45 },
            { name: 'events', count: 38 },
            { name: 'annual', count: 32 },
            { name: 'cultural', count: 28 },
            { name: 'academic', count: 24 }
        ]
    }

    return (
        <div className="space-y-4">
            {/* Stats Cards */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Overview</h2>

                <div className="space-y-4">
                    {/* Total Images */}
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 rounded-xl">
                            <Image className="size-5 text-blueDark" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 font-medium">Total Images</p>
                            <p className="text-2xl font-bold text-gray-800">{mockStats.totalImages}</p>
                        </div>
                    </div>

                    {/* Total Albums */}
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-50 rounded-xl">
                            <FolderOpen className="size-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 font-medium">Total Albums</p>
                            <p className="text-2xl font-bold text-gray-800">{mockStats.totalAlbums}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Tags */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Tag className="size-4 text-gray-600" />
                    <h2 className="text-lg font-bold text-gray-800">Popular Tags</h2>
                </div>

                <div className="space-y-2.5">
                    {mockStats.topTags.map((tag, index) => (
                        <div key={tag.name} className="flex items-center gap-3">
                            <span className="text-xs font-bold text-gray-400 w-4">#{index + 1}</span>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-semibold text-gray-700">#{tag.name}</span>
                                    <span className="text-xs text-gray-400">{tag.count}</span>
                                </div>
                                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-(--blueDark) to-transparent rounded-full"
                                        style={{ width: `${(tag.count / mockStats.topTags[0].count) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-tr from-(--blueDark) to-transparent rounded-2xl shadow-sm p-6 text-white">
                <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="size-4" />
                    <h3 className="text-sm font-bold">This Month</h3>
                </div>
                <p className="text-4xl font-bold mb-1 text-white">42 <span className="text-lg text-white align-top">+</span></p>
                <p className="text-xs text-blue-100">New images uploaded</p>
            </div>
        </div>
    )
}

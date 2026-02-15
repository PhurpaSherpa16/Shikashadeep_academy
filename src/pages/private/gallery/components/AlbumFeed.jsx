import { Edit2, Trash2, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react"

export default function AlbumFeed({ albums = [], loading, error, page, totalPages, onPageChange }) {
    // Mock data for design
    const mockAlbums = albums

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-800">Albums</h2>
                <span className="text-xs text-gray-400 font-semibold">{mockAlbums.length} items</span>
            </div>

            {/* Album List */}
            <div className="space-y-3 mb-6 flex flex-wrap gap-4">
                {mockAlbums.map((album) => (
                    <div key={album.id} className="group relative p-3 rounded-xl border border-gray-100
                    w-fit
                    hover:border-blueDark/30 hover:bg-gray-50/50 transition-all">
                        <div className="flex gap-3">
                            {/* Thumbnail Stack */}
                            <div className="relative w-16 h-16 flex-shrink-0">
                                <div className="absolute inset-0 bg-gray-200 rounded-lg overflow-hidden">
                                    <img
                                        src={album.images[0]?.image_url}
                                        alt={album.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-blueDark text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-sm">
                                    <ImageIcon className="size-2.5 inline mr-0.5" />
                                    {album.images.length}
                                </div>
                            </div>

                            {/* Album Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-bold text-gray-800 line-clamp-1 group-hover:text-blueDark transition-colors">
                                    {album.title}
                                </h3>
                                <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                                    {album.caption}
                                </p>
                                <div className="flex gap-1 mt-1.5">
                                    {album.tags?.slice(0, 2).map(tag => (
                                        <span key={tag} className="text-[8px] font-bold px-1.5 py-0.5 bg-gray-100 text-gray-400 rounded uppercase">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-1.5 hover:bg-white rounded-lg transition-colors">
                                    <Edit2 className="size-3.5 text-gray-600" />
                                </button>
                                <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                                    <Trash2 className="size-3.5 text-red-500" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button
                    disabled={page === 1}
                    onClick={() => onPageChange?.(page - 1)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-blueDark disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeft className="size-3.5" />
                    Previous
                </button>
                <span className="text-xs text-gray-500 font-medium">
                    Page {page} of {totalPages || 1}
                </span>
                <button
                    disabled={page === totalPages}
                    onClick={() => onPageChange?.(page + 1)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-blueDark disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    Next
                    <ChevronRight className="size-3.5" />
                </button>
            </div>
        </div>
    )
}

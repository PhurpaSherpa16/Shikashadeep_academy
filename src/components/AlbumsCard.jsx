import { Edit, Loader2, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import useGetItemById from "@/hooks/useGetItemById"
import { useState } from "react";
import ImageViewer from "./gallery/ImageViewer";

export default function AlbumsCard({ album, onDelete, idDeleting }) {
    const id = album.id
    const [openModal, setOpenModal] = useState(false)
    const { getItemById, loading: fetching, error: fetchError, data } = useGetItemById(id, 'gallery/post')

    const handleAlbumView = (id) => {
        getItemById(id)
        setOpenModal(true)
    }

    return (
        <div key={album.id} className="min-w-[100px] sm:min-w-[150px] md:min-w-[200px] 
        snap-start group cursor-pointer group/main relative">
            {/* Preview Image */}
            {openModal && (
                <ImageViewer
                    images={data?.data}
                    onClose={() => setOpenModal(false)}
                    loading={fetching}
                    index={0}
                />
            )}
            {/* Aerial View Stack Effect */}
            <button onClick={() => handleAlbumView(id)} className="relative h-48 w-full mb-8 perspective-1000">
                {/* Third Image (Background) */}
                {album.images[2] && (
                    <div className="absolute inset-0 bg-gray-200 rounded-2xl rotate-6 translate-x-4 translate-y-2 shadow-sm overflow-hidden opacity-40 
                    transition-transform group-hover:rotate-12 group-hover:translate-x-6">
                        <img src={album.images[2].image_url} className="w-full h-full object-cover" />
                    </div>
                )}
                {/* Second Image (Middle) */}
                {album.images[1] && (
                    <div className="absolute inset-0 bg-gray-100 rounded-2xl -rotate-3 translate-x-2 translate-y-1 shadow-md overflow-hidden opacity-70 transition-transform group-hover:-rotate-6 group-hover:translate-x-4">
                        <img src={album.images[1].image_url} className="w-full h-full object-cover" />
                    </div>
                )}
                {/* First Image (Foreground) */}
                <div className="absolute inset-0 bg-white rounded-2xl shadow-xl overflow-hidden z-10 border border-gray-100 transition-transform group-hover:scale-[1.02]">
                    <img src={album.images[0]?.image_url} className="w-full h-full object-cover" />

                    {/* Photo Count Badge */}
                    <div className="absolute bottom-3 right-3 bg-white/90 text-blueDark text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md shadow-sm border border-blue-50">
                        {album.images.length} Photos
                    </div>
                </div>
            </button>

            {/* Album Details */}
            <div className="space-y-2">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-gray-800 line-clamp-1 group-hover:text-blueDark transition-colors">
                            {album.title}
                        </h3>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                        {album.caption}
                    </p>
                </div>
                <div className="flex gap-8">
                    <Link to={`/admin/gallery/edit/${id}`} className="text-sm flex items-center gap-1 text-blue-dark group/button transition-all">
                        Edit
                        <Edit className="size-4 group-hover/button:translate-x-1 
                        transition-all duration-300"/>
                    </Link>

                    <button onClick={() => onDelete(album.id)} className="text-sm flex items-center gap-1 text-black/60 hover:text-red-400 group/delete transition-all">
                        {idDeleting === album.id ? (
                            <Loader2 className="size-4 mr-2 animate-spin" />
                        ) : (
                            <Trash className="size-4 group-hover/delete:-translate-x-1 
                            transition-all duration-300"/>
                        )}
                        {idDeleting === album.id ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    )
}
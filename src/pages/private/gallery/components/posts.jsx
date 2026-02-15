import { Loader2, MoveRight } from "lucide-react"
import { Carousel } from "@/components/Carousel"
import { Link } from "react-router-dom"
import AlbumsCard from "../../../../components/AlbumsCard"
import { useState } from "react"
import useDeleteById from "../../../../hooks/useDeleteById"
import { usehandleDeleteWithPagination } from "../../../../hooks/useHandleDeleteWithPagination"
import NoDataAvailable from "../../../../components/NoDataAvailable"

export default function Posts({ albums, albumLoading, albumError, albumsResponse }) {
    const [deletingId, setDeletingId] = useState(null)
    const { deleteByIdHook, loading: deleteLoading } = useDeleteById()
    const { deleteById } = usehandleDeleteWithPagination()

    const handleDelete = async (id) => {
        setDeletingId(id)
        try {
            const deleteFunc = (targetId) => deleteByIdHook(targetId, 'gallery/post_delete')
            // Since this is a carousel without manual page control in this component,
            // we pass 1 for page and a no-op for setPage if not managed here.
            await deleteById(id, deleteFunc, albumsResponse, 1, () => { }, albums)
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <div className="relative">
            <div className="absolute bottom-0 right-0 z-100">
                <Link to='/admin/gallery/albums' className="text-blue-dark text-xs flex items-center gap-1 group hover:text-(--blueDark)/80
                hover:scale-105 transition-transform duration-300 active:scale-105">
                    View All
                    <MoveRight className="transition-transform size-4 duration-300 group-hover:translate-x-2 origin-center
                    group-active:scale-105" />
                </Link>
            </div>
            <Carousel content={albumLoading ? (
                <div className="flex items-center justify-center h-64">
                    <p className="flex gap-2">Loading...<Loader2 className="size-8 animate-spin" /></p>
                </div>
            ) : albumError ? (
                <div className="flex items-center justify-center h-64">
                    <p className="text-red-500">Albums fetching failed, try again later.</p>
                </div>
            ) : (
                <div className="flex gap-8 py-4 relative">
                    {albums.map((album) => (
                        <AlbumsCard
                            key={album.id}
                            album={album}
                            onDelete={handleDelete}
                            idDeleting={deletingId}
                        />
                    ))}
                    {albums.length === 0 && (
                        <NoDataAvailable message="No albums found, " link="/admin/gallery/new" linkText="Post some story" />
                    )}
                </div>
            )} />

        </div>
    )
}
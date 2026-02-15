import { useGetAllAlbums } from "../../../hooks/gallery/useGetAlbusms"
import AlbumsCard from "@/components/AlbumsCard"
import { AlertTriangle, Loader2 } from "lucide-react"
import Pagination from "../../../components/Pagination"
import { useDeleteAlbums } from "../../../hooks/gallery/useDeleteAlbums"
import { usehandleDeleteWithPagination } from "../../../hooks/useHandleDeleteWithPagination"
import Loading from "../../../components/Loading"
import { Link } from "react-router-dom"
import NoDataAvailable from "../../../components/NoDataAvailable"

export default function Albums() {
    const { albumLoading, albumError, albumsData, page: albumPage, setPage: setAlbumPage, albumsResponse } = useGetAllAlbums()
    const allAlbums = albumsData?.gallery_post || []

    const { deleteAlbum, idDeleting } = useDeleteAlbums()
    const { deleteById } = usehandleDeleteWithPagination()

    const handleDelete = async (id) => {
        deleteById(id, deleteAlbum, albumsResponse, albumPage, setAlbumPage, allAlbums)
    }

    return (
        <div className="relative p-4 md:p-8 w-full container mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-serif font-bold text-gray-800">Albums</h1>
                <p className="text-sm text-gray-500">
                    {albumsData?.total_items || 0} total albums
                </p>
            </div>

            <div className="grid h-[calc(100vh-300px)]">
                {albumLoading ? (
                    <div className="flex items-center justify-center w-full h-full">
                        <Loading container={true} text="Fetching albums..." />
                    </div>
                ) : albumError ? (
                    <div className="flex items-center justify-center py-20">
                        <p className="flex gap-2 items-center text-red-500">
                            <AlertTriangle className="size-5" />
                            Albums fetching failed, try again later.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col min-h-[calc(100vh-300px)] 2xl:min-h-[calc(100vh-300px)]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5
                        2xl:grid-cols-[repeat(auto-fill,minmax(min(220px,100%),1fr))]
                        gap-16 pb-4 2xl:pb-16">
                            {allAlbums.map((album) => (
                                <AlbumsCard key={album.id} album={album} onDelete={handleDelete}
                                    idDeleting={idDeleting}
                                />
                            ))}
                        </div>
                        {allAlbums.length === 0 && (
                            <NoDataAvailable message="No albums found, " link="/admin/gallery/new" linkText="Post some story" />
                        )}
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {allAlbums.length > 0 && (
                <div className="w-full pt-8">
                    {albumsData?.total_pages && (
                        <Pagination page={albumPage} setPage={setAlbumPage} totalPages={albumsData?.total_pages} />
                    )}
                </div>
            )}

        </div>
    )
}
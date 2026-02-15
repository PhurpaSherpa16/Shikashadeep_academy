import { Edit2, Trash2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import IconPagination from "../../../../components/pagination/IconPagination"
import { useState } from "react"
import ImageViewer from "../../../../components/gallery/ImageViewer";
import { usehandleDeleteWithPagination } from "../../../../hooks/useHandleDeleteWithPagination";
import useDeleteById from "../../../../hooks/useDeleteById";

export default function ImageFeed({ images = [], page, totalPages, onPageChange, imagesResponse, setPage }) {
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    // Mock data for design
    const mockImages = images.length > 0 ? images : Array(9).fill(null).map((_, i) => ({
        id: i + 1,
        image_url: `https://picsum.photos/seed/${i}/400/300`,
        post: {
            title: `Mock Gallery ${i + 1}`,
            caption: "This is a mock description for the image feed.",
            galleryPostTags: [{ tag: { name: "Nature" } }, { tag: { name: "Photography" } }]
        }
    }))

    const [deletingId, setDeletingId] = useState(null);
    const { deleteByIdHook, loading: deleteLoading, error: deleteError } = useDeleteById()
    const { deleteById } = usehandleDeleteWithPagination()

    const handleImageClick = (index) => {
        setSelectedImage(index)
        setIsViewerOpen(true)
    }

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            // Wrapper for the hook to include the resource path
            const deleteFunc = (targetId) => deleteByIdHook(targetId, 'gallery/image_delete')
            await deleteById(id, deleteFunc, imagesResponse, page, setPage, images)
        } finally {
            setDeletingId(null);
        }
    }

    console.log(deleteLoading, deleteError)

    return (
        <div className="rounded-2xl shadow-sm border border-gray-100 p-6 h-full 
        relative flex flex-col justify-between">
            {isViewerOpen && (
                <ImageViewer
                    images={{ images: mockImages }}
                    onClose={() => setIsViewerOpen(false)}
                    index={selectedImage}
                />
            )}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-800">Recent Images</h2>
                </div>
                {/* Image Grid */}
                <div className="grid grid-cols-[repeat(auto-fill,minmax(min(160px,100%),1fr))] 2xl:grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-3 mb-6">
                    {mockImages.slice(0, 10).map((image, index) => (
                        <div key={index} className="group relative aspect-square rounded-xl overflow-hidden 
                        border border-gray-100 bg-gray-50 w-full">
                            <button className="h-full w-full" onClick={() => handleImageClick(index)}>
                                <img src={image.image_url} alt={image.title} className="w-full h-full object-cover 
                                transition-transform group-hover:scale-105"/>
                            </button>

                            {/* Action Overlay */}
                            <button className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-lg hover:bg-red-50 
                            transition-all shadow-sm opacity-0 group-hover:opacity-100"
                                onClick={() => handleDelete(image.id)}>
                                <Trash2 className="size-3.5 text-red-500" />
                            </button>

                            {/* Deletion Overlay */}
                            {deletingId === image.id && deleteLoading && (
                                <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2">
                                    <Loader2 className="size-6 text-white animate-spin" />
                                    <span className="text-[10px] text-white font-bold uppercase tracking-wider">Deleting...</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination */}
            <IconPagination page={page} setPage={onPageChange} totalPages={totalPages} totalItems={images.length} />
        </div>
    )
}

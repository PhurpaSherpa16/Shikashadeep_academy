import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import useGetItemById from "../../../hooks/useGetItemById"
import HeaderForForms from "../../../components/HeaderForForms"
import GalleryForm from "@/components/forms/galleryForm"
import Loading from "@/components/Loading"
import { useUpdateAlbum } from "../../../hooks/gallery/useUpdateAlbum"

export default function EditAlbum() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { getItemById, loading: fetching, error: fetchError, data } = useGetItemById(id, 'gallery/post')
    const { handleUpdateAlbum, loading: updating, error: updateError, success } = useUpdateAlbum()

    useEffect(() => {
        if (id) {
            getItemById()
        }
    }, [id])

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                navigate('/admin/gallery/albums')
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [success, navigate])

    const handleSubmit = async (formData) => {
        return await handleUpdateAlbum(id, formData);
    }

    return (
        <div className="p-8 space-y-10 animate-in fade-in duration-500">
            {/* Header */}
            <HeaderForForms
                title={<>Update <span className="text-blue-dark">Album</span></>}
                description="Keep your gallery up to date. Review the information and make the necessary changes below."
            />
            {fetching ? (
                <Loading container={true} text="Fetching album details..." />
            ) : fetchError ? (
                <div className="bg-red-50 border border-red-100 p-8 rounded-2xl text-center">
                    <p className="text-red-500 font-bold">{fetchError}</p>
                </div>
            ) : data?.data ? (
                <div className="animate-in slide-in-from-bottom-4 duration-500">
                    <GalleryForm
                        key={data.data.id}
                        item={data.data}
                        onSubmit={handleSubmit}
                        isLoading={updating}
                        externalError={updateError}
                    />
                </div>
            ) : (
                <div className="text-center p-12 text-gray-400">
                    No data found for this album.
                </div>
            )}
        </div>
    )
}
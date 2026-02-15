import HeaderForForms from "@/components/HeaderForForms"
import GalleryForm from "@/components/forms/galleryForm"
import { usePostGallery } from "@/hooks/gallery/usePostGallery"

export default function ImageUpload() {
    const { handlePostGallery, loading, error } = usePostGallery()

    const handleSubmit = async (formData) => {
        return await handlePostGallery(formData)
    }

    return (
        <div className="p-8 space-y-10 animate-in fade-in duration-500">
            {/* Header */}
            <HeaderForForms title={<>Share a <span className="text-blue-dark">New Story</span></>}
                description="Upload images or publish a post to keep everyone informed and inspired." />
            <GalleryForm onSubmit={handleSubmit} isLoading={loading} externalError={error} />
        </div>
    )
}
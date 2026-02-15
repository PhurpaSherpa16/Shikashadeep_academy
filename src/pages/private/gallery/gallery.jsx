import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Posts from "./components/posts";
import { useGetAllImages } from "@/hooks/gallery/useGetAllImages"
import { useGetAllAlbums } from "../../../hooks/gallery/useGetAlbusms";
import ImageFeed from "./components/ImageFeed";
import GalleryInsights from "./components/GalleryInsights";
import { useFeaturedAlbums } from "../../../hooks/gallery/useFeaturedAlbums";
import UploadImagesAlbum from "./components/UploadImagesAlbum";


export default function Gallery() {
    const { loading, error, data, page: imagePage, setPage: setImagePage, response: imagesResponse } = useGetAllImages()
    // image data
    const images = data?.images || []

    // album data
    const { albumsData } = useGetAllAlbums()
    const { featuredLoading, featuredError, featuredData, albumsResponse } = useFeaturedAlbums()
    const featuredAlbums = featuredData?.gallery_post || []

    return (
        <div className="relative p-4 md:p-8 space-y-8 w-full lg:max-w-6xl 2xl:max-w-[1600px] mx-auto pb-24">
            {/* Dashboard Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-serif font-bold text-gray-800">Gallery Dashboard</h1>
                <p className="text-gray-500 text-sm">Manage your images and albums</p>
            </div>

            {/* Album Carousel */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Latest Albums</h2>
                <Posts albums={featuredAlbums} albumLoading={featuredLoading} albumError={featuredError} albumsResponse={albumsResponse} />
            </div>

            {/* 3-Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                <div className="col-span-2 flex flex-col-reverse gap-6 h-full">
                    {/* Left Column - Images */}
                    <div className="lg:col-span-2 h-full">
                        <ImageFeed
                            images={images}
                            loading={loading}
                            error={error}
                            page={imagePage}
                            imagesResponse={imagesResponse}
                            setPage={setImagePage}
                            totalPages={data?.total_pages || 1}
                            onPageChange={setImagePage}
                        />
                    </div>
                </div>

                {/* Right Column - Insights */}
                <div className="lg:col-span-1">
                    <GalleryInsights
                        totalImages={data?.total_items || 0}
                        totalAlbums={albumsData?.total_items || 0}
                    />
                </div>
            </div>

            {/* Floating Action Button */}
            <UploadImagesAlbum location="/admin/gallery/new" text="Add New Story"/>
        </div>
    )
}
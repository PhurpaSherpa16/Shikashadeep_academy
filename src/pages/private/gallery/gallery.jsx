import { Image, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Posts from "./components/posts";
import { useGetAllImages } from "@/hooks/gallery/useGetAllImages"
import { useGetAllAlbums } from "../../../hooks/gallery/useGetAlbusms";
import ImageFeed from "./components/ImageFeed";
import GalleryInsights from "./components/GalleryInsights";
import { useFeaturedAlbums } from "../../../hooks/gallery/useFeaturedAlbums";
import UploadImagesAlbum from "./components/UploadImagesAlbum";
import DashboardHeader from "../../../components/DashboardHeader";


export default function Gallery() {
    const { loading, error, data, page: imagePage, setPage: setImagePage, response: imagesResponse } = useGetAllImages()
    // image data
    const images = data?.images || []

    // album data
    const { albumsData } = useGetAllAlbums()
    const { featuredLoading, featuredError, featuredData, albumsResponse } = useFeaturedAlbums()
    const featuredAlbums = featuredData?.gallery_post || []

    const imageProps = {
        images,
        loading,
        error,
        page: imagePage,
        totalPages: data?.total_pages || 1,
        onPageChange: setImagePage,
        imagesResponse,
        setPage: setImagePage
    }

    const headerProps ={
        title: "Gallery Dashboard",
        description: "Manage your images and albums",
        icon: <Image className="text-blue-dark size-4"/>
    }

    return (
        <div className="dashboard_layout animate_in">
            {/* Dashboard Header */}
            <DashboardHeader {...headerProps}/>

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
                        <ImageFeed {...imageProps}/>
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
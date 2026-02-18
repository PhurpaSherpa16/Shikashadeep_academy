import { useState } from "react"
import { useBlogs } from "@/hooks/blogs/useBlogs"
import { Rss } from "lucide-react"
import { useDeleteBlog } from "../../../hooks/blogs/useDeleteBlog"
import { usehandleDeleteWithPagination } from "../../../hooks/useHandleDeleteWithPagination"
import BlogTable from "./components/BlogTable"
import UploadImagesAlbum from "../gallery/components/UploadImagesAlbum"
import DashboardHeader from "../../../components/DashboardHeader"
import BlogAnalytics from "./components/BlogAnalytics"
import BlogsCarousel from "./components/BlogsCarousel"

export default function Blogs() {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const { responseFromBlog, loading, error, fetchBlogs } = useBlogs(page, limit)
    let blogs = responseFromBlog?.blogs || []
    const blogData = blogs || []

    const carouselBlogs = blogData.slice(0, 6)

    // deletion hooks
    const { deleteBlog, idDeleting } = useDeleteBlog()
    const { deleteById } = usehandleDeleteWithPagination()

    const handleDeleteBlog = async (id) => {
        deleteById(id, deleteBlog, fetchBlogs, page, setPage, blogData)
    }

    console.log(responseFromBlog)

    let totalPages = responseFromBlog?.total_pages || 10
    let totalItems = responseFromBlog?.total_items || 100

    const headerProps = {
        title: "Blog Dashboard",
        description: "Your central hub for stories and insights",
        icon: <Rss className="text-blue-dark size-4" />
    }

    const tableProps = { blogData, handleDeleteBlog, idDeleting, page, setPage, totalPages, totalItems }
    const carouselProps = { blogs: carouselBlogs, handleDeleteBlog, idDeleting, loading, error }

    return (
        <div className="dashboard_layout animate_in">
            {/* Dashboard Header */}
            <DashboardHeader {...headerProps} />
            <div className="space-y-8">
                <BlogsCarousel {...carouselProps} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                <div className="lg:col-span-2 h-full">
                    <BlogTable {...tableProps} />
                </div>
                <div className="lg:col-span-1">
                    <BlogAnalytics blogs={blogData} />
                </div>
            </div>

            <UploadImagesAlbum location="/admin/blogs/new" text="Add New Story" />
        </div>
    )
}
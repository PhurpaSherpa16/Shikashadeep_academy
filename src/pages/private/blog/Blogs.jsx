import React, { useState } from "react"
import { useBlogs } from "@/hooks/blogs/useBlogs"
import BlogCard from "@/components/cards/blogCard"
import BlogSkeleton from "@/components/skeletons/BlogSkeleton"
import { Plus, LayoutGrid, Sparkles, FileText, ChevronLeft, ChevronRight, Edit2, Trash2, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useDeleteBlog } from "../../../hooks/blogs/useDeleteBlog"
import BlogCarousel from "@/components/BlogCarousel"
import BlogAnalytics from "@/components/BlogAnalytics"
import { usehandleDeleteWithPagination } from "../../../hooks/useHandleDeleteWithPagination"
import BlogTable from "./components/BlogTable"
import IconPagination from "../../../components/pagination/IconPagination"
import UploadImagesAlbum from "../gallery/components/UploadImagesAlbum"

export default function Blogs() {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const { responseFromBlog, loading, fetchBlogs } = useBlogs(page, limit)
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

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-700 w-full lg:max-w-6xl 2xl:max-w-[1600px] mx-auto">
            {/* Dashboard Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 tracking-tight">Blog Dashboard</h1>
                    <p className="text-gray-500 mt-2 text-base md:text-lg">Your central hub for stories, updates and insights.</p>
                </div>
                {/* <Link to="/admin/blogs/new" className="button_add">
                    <Plus className="size-5" />
                    New Story
                </Link> */}
            </div>

            {loading && blogData.length === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => <BlogSkeleton key={i} />)}
                </div>
            ) : (
                <div className="space-y-16">
                    {/* Featured Carousel Section */}
                    {carouselBlogs.length > 0 && (
                        <section className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-(--blueDark)">
                                    <Sparkles className="size-5" />
                                    <h2 className="text-xl md:text-2xl font-serif font-bold">Featured Stories</h2>
                                </div>
                            </div>
                            <BlogCarousel
                                blogs={carouselBlogs}
                                handleDeleteBlog={handleDeleteBlog}
                                idDeleting={idDeleting}
                            />
                        </section>
                    )}

                    {/* Management & Analytics Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Submissions Table Column */}
                         <div className="lg:col-span-8 space-y-6">
                            <div className="flex items-center gap-2 text-gray-900 px-1">
                                <LayoutGrid className="size-5 text-gray-400" />
                                <h2 className="text-xl font-serif font-bold">Management</h2>
                            </div>

                           <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                                
                                <BlogTable blogData={blogData} handleDeleteBlog={handleDeleteBlog} idDeleting={idDeleting}/>

                                {/* Pagination Footer */}
                                <IconPagination page={page} setPage={setPage} totalPages={totalPages} totalItems={totalItems}/>
                                
                            </div>
                        </div>

                        {/* Analytics Sidebar Column */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="flex items-center gap-2 text-gray-900 px-1">
                                <Sparkles className="size-5 text-gray-400" />
                                <h2 className="text-xl font-serif font-bold">Insights</h2>
                            </div>
                            <BlogAnalytics blogs={blogData} />
                        </div>
                    </div>

                    {/* No blogs found state */}
                    {blogData.length === 0 && !loading && (
                        <div className="text-center space-y-4 py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                            <FileText className="size-12 text-gray-200 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-400">No stories found</h3>
                            <p className="text-gray-400 mt-1">Ready to share something new?
                                <Link to="/admin/blogs/new" className="pl-2 text-(--blueDark) font-medium hover:underline">
                                    Create one now
                                </Link>
                            </p>
                        </div>
                    )}
                </div>
            )}

            <UploadImagesAlbum location="/admin/blogs/new" text="Add New Story"/>
        </div>
    )
}
import { useState } from "react";
import BlogCard from "@/components/BlogCard"
import { useGetAllItemsWithCache } from "@/api/getAllItemsWithCache";
import IconPagination from "../../../components/pagination/IconPagination";
import LoadingErrorHandle from "../landing/components/LoadingErrorHandle";

const ITEMS_PER_PAGE = 6;

export default function BlogNews() {
    const [page, setPage] = useState(1)
    const from = `blogs?page=${page}`
    const {data, isLoading, error} = useGetAllItemsWithCache(from)
    const total_items = data?.data?.total_items
    const total_pages = data?.data?.total_pages
    const blogs = data?.data?.blogs
    console.log(blogs)

    return (
        <div className="h-full bg-gray-50/30">
            {/* Hero Header */}
            <div className="bg-white border-gray-100">
                <div className="headerPosition">
                    <div className="max-w-3xl space-y-6">
                        <div className="space-y-2 lg:space-y-4">
                            <h1 className="font-serif font-bold text-gray-900 text-center lg:text-left">
                                Latest <span className="text-(--blueDark)">News & Blogs</span>
                            </h1>
                            <p className="text-gray-500 leading-relaxed max-w-2xl text-center lg:text-left">
                                Stay updated with school activities, achievements, educational insights, and important announcements from Shikshadeep Academy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-0 py-8 space-y-8">
               <div className="flex flex-col justify-between h-full space-y-8">
                    {/* blog content */}
                    <LoadingErrorHandle isLoading={isLoading} error={error} data={blogs} linkLabel="View All Blogs" linkPath="/blogs"
                    noDataMessage="No Blogs Available"
                    renderItem = {
                        <div className="min-h-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs?.map((blog, index) => (
                                <BlogCard key={index} blog={blog}/>
                            ))}
                        </div> }/>
                    {/* pagination */}
                    <div>
                        <IconPagination page={page} setPage={setPage} totalPages={total_pages} totalItems={total_items}
                        itemLabel="blogs"/>
                    </div>
               </div>
            </div>
        </div>
    );
}
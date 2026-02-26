import { useParams } from "react-router-dom"
import { useGetAllItemsWithCache } from "../../../api/getAllItemsWithCache"
import { CalendarDays, Clock, Share2, Tag, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import BlogCard from "@/components/BlogCard"
import { Skeleton } from "@/components/ui/skeleton"
import { format, parseISO } from "date-fns"
import { useEffect } from "react"
import ViewBlogContent from "./components/VIewBlogContent"
import SubscribeDecorativeForm from "../../../components/SubscribeDecorativeForm"
import LoadingErrorHandle from "../landing/components/LoadingErrorHandle"

export default function ViewBlog() {
    const { id } = useParams()
    const from = `blogs/${id}`
    const { data, isLoading, error } = useGetAllItemsWithCache(from)
    const blog = data?.data

    // fetching related blogs
    const relatedFrom = `blogs/tag/${id}/related`
    const { data: relatedData, isLoading: relatedIsLoading, error: relatedError } = useGetAllItemsWithCache(relatedFrom)
    const relatedBlogs = relatedData?.data?.blogs

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    if (isLoading && relatedIsLoading) {
        return (
            <div className="container px-4 py-8 lg:py-16 space-y-8 animate-pulse">
                <Skeleton className="h-10 w-2/3 max-w-xl" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-6">
                        <Skeleton className="aspect-video w-full rounded-2xl" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/5" />
                    </div>
                    <div className="space-y-6">
                        <Skeleton className="h-8 w-1/2" />
                        {[1, 2, 3].map(i => <Skeleton key={i} className="h-48 w-full rounded-xl" />)}
                    </div>
                </div>
            </div>
        )
    }

    if (error && relatedError) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
                <p className="text-gray-600 mb-6">We couldn't load the blog post you're looking for.</p>
                <Link to="/" className="text-(--blueDark) font-semibold flex items-center gap-2 hover:underline">
                    <ArrowLeft className="size-4" /> Back to Home
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            {/* Navigation / Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="container px-4 py-6">
                    <Link to="/blog_news" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-(--blueDark) transition-colors">
                        <ArrowLeft className="size-4" /> Back to News & Blogs
                    </Link>
                </div>
            </div>

            <div className="container px-4 py-8 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

                    <ViewBlogContent blog={blog} />

                    {/* Sidebar / Related Content Column */}
                    <aside className="space-y-12">
                        {/* Newsletter Sidebar Card (Optional extra) */}
                        <SubscribeDecorativeForm />

                        {/* Related Blogs Section */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-900 font-serif">Related Stories</h3>
                                <Link to="/blog_news" className="text-sm font-bold text-(--blueDark) hover:underline">
                                    See all
                                </Link>
                            </div>

                            <div className="flex flex-col gap-8">
                                {relatedBlogs?.length === 0 && (
                                    <div className="pb-16">
                                        <p className="text-sm text-gray-600">No related blogs found</p>
                                    </div>
                                )}
                                {relatedBlogs?.map((relatedBlog) => (
                                    <BlogCard key={relatedBlog.id} blog={relatedBlog} />
                                ))}
                            </div>
                        </div>

                        {/* School Info / CTA Section */}
                        <div className="p-8 border border-gray-100 rounded-3xl bg-white space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="size-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                                    <img src="/logo.svg" alt="Shikshadeep Logo" className="size-10 object-contain opacity-80" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900 uppercase font-serif">Sikshadeep</h1>
                                    <p className="text-sm text-gray-600 font-serif">Academy</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-bold text-gray-900">Join our Community</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Shikshadeep School is committed to providing excellence in education. Apply now for the upcoming academic session.
                                </p>
                            </div>
                            <Link to="/admission" className="block text-center py-3 border-2 border-(--blueDark) text-(--blueDark) rounded-xl font-bold hover:bg-(--blueDark) hover:text-white transition-all">
                                Admissions Open
                            </Link>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    )
}
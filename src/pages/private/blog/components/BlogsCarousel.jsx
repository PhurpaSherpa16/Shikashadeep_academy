import { Link } from "react-router-dom";
import NoDataAvailable from "../../../../components/NoDataAvailable";
import BlogCard from "../../../../components/cards/blogCard";
import { MoveRight } from "lucide-react";
import BlogSkeleton from "../../../../components/skeletons/BlogSkeleton";
import { Carousel } from "../../../../components/Carousel"

export default function BlogsCarousel({ ...carouselProps }) {
    return (
        <div className="relative w-full max-w-full overflow-hidden">
            <div className="absolute bottom-0 right-0 z-100">
                <Link to='/admin/blogs' className="text-blue-dark text-xs flex items-center gap-1 group hover:text-(--blueDark)/80
                hover:scale-105 transition-transform duration-300 active:scale-105">
                    View All
                    <MoveRight className="transition-transform size-4 duration-300 group-hover:translate-x-2 origin-center
                    group-active:scale-105" />
                </Link>
            </div>
            <Carousel content={carouselProps.loading ? (
                <div className="flex gap-8 py-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <BlogSkeleton key={i} />
                    ))}
                </div>
            ) : carouselProps.error ? (
                <div className="flex items-center justify-center h-64">
                    <p className="text-red-500">Blogs fetching failed, try again later.</p>
                </div>
            ) : (
                // i did max-w-10 because overflow x is not hidden, but main parent have hidden
                // so our blogcard will show up how much below div have width.
                <div className="flex gap-8 py-4 relative max-w-10">
                    {carouselProps.blogs.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                    {carouselProps.blogs.length === 0 && (
                        <NoDataAvailable message="No blogs found, " link="/admin/blogs/new" linkText="Post some story" />
                    )}
                </div>
            )} />
        </div>
    )
}
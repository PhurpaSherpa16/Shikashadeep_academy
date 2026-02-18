import { CalendarDays, MoveRight, Clock, Delete, Trash, Edit, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";


export default function BlogCard({ blog, handleDeleteBlog, idDeleting }) {
    const formattedDate = blog.createdAt ? format(parseISO(blog.createdAt), "MMM d, yyyy") : "N/A";
    const readingTime = blog.description ? Math.ceil(blog.description.length / 500) : 0;

    const handleDelete = async (id) => {
        handleDeleteBlog(id)
    }

    return (
        <div className='group relative w-full border border-gray-100 rounded-xl overflow-hidden bg-white hover:shadow-xl transition-all 
        duration-300 flex flex-col h-full min-h-[420px]
        min-w-[280px] sm:min-w-[350px] md:min-w-[400px]'>
            <div className='relative h-48 overflow-hidden shrink-0'>
                <img src={blog.thumbnail_url} alt={blog.title} className='size-full object-cover object-center
                transition-transform duration-500 group-hover:scale-105' />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                <div className="absolute left-3 top-3 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md px-3 
                py-1 rounded-full shadow-sm text-white"
                    style={{ backgroundColor: `${blog?.tag?.color || '#3b82f6'}` }}>
                    {blog?.tag?.name || 'News'}
                </div>
            </div>

            <div className='p-4 flex flex-col flex-1 gap-3'>
                <div className='space-y-3 flex-1'>
                    <div className='flex items-center gap-4 text-[11px] text-gray-500 font-medium'>
                        <span className='flex items-center gap-1.5'>
                            <CalendarDays className='size-3.5 text-(--blueDark)' />
                            {formattedDate}
                        </span>
                        <div className="size-1 bg-black/60 rounded-full" />
                        <span className='flex items-center gap-1.5'>
                            <Clock className="size-3.5 text-(--blueDark)" />
                            {readingTime} min read
                        </span>
                    </div>

                    <div className='space-y-2'>
                        <h3 className='font-bold text-gray-900 leading-snug group-hover:text-(--blueDark) transition-colors line-clamp-2 text-base'>
                            {blog.title}
                        </h3>
                        <p className='line-clamp-3 text-xs text-gray-600 leading-relaxed'>
                            {blog.description}
                        </p>
                    </div>
                </div>

                <div className='pt-3 border-t border-gray-50 mt-auto flex items-center gap-8'>
                    <Link to={`/admin/blogs/update/${blog.id}`} className='inline-flex items-center gap-2 text-(--blueDark) text-xs group/link hover:underline underline-offset-4 transition-all'>
                        Edit
                        <Edit className='size-3.5 transition-transform duration-300 group-hover/link:translate-x-1' />
                    </Link>
                    <button
                        disabled={idDeleting === blog.id}
                        onClick={() => handleDelete(blog.id)}
                        className='inline-flex items-center gap-2 text-xs group/link hover:underline underline-offset-4 transition-all text-(--warning) disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {idDeleting === blog.id ?
                            <Loader2 className="size-4 mr-2 animate-spin" /> :
                            <Trash className='size-3.5 transition-transform duration-300 group-hover/link:-translate-x-1' />}
                        {idDeleting === blog.id ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    )
}
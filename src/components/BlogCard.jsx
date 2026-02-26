import { CalendarDays, Clock, MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

export default function BlogCard({ blog }) {
    const formattedDate = blog.createdAt ? format(parseISO(blog.createdAt), "MMM d, yyyy") : "N/A";
    const readingTime = blog.description ? Math.ceil(blog.description.length / 500) : 0;
    return (
        <Link to={`/blog/${blog.id}`} className='group relative w-full border border-gray-100 rounded-xl overflow-hidden bg-white 
        hover:shadow-xl transition-all 
        duration-300 flex flex-col h-full 2xl:h-120 cursor-pointer'>
            <div className='relative h-48 2xl:h-70 overflow-hidden shrink-0'>
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
                        <p className='line-clamp-3 text-xs text-gray-600 leading-relaxed text-justify'>
                            {blog.description}
                        </p>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <p className='group-hover:text-(--blueDark) transition-colors duration-300'>Read More</p>
                    <MoveRight className="group-hover:text-(--blueDark) transition-transform duration-300 group-hover:-rotate-45 origin-center" />
                </div>
            </div>
        </Link>
    );
}

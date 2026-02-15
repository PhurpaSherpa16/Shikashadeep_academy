import React, { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import BlogCard from './cards/blogCard'

export default function BlogCarousel({ blogs, handleDeleteBlog, idDeleting }) {
    const scrollRef = useRef(null)

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
        }
    }

    return (
        <div className="relative group/carousel">
            {/* Navigation Buttons - Hidden on small mobile */}
            <button
                onClick={() => scroll('left')}
                className="hidden md:flex absolute left-[-20px] top-1/2 -translate-y-1/2 
                z-10 p-2.5 rounded-full bg-white shadow-xl 
                border border-gray-100 opacity-0 group-hover/carousel:opacity-100 
                transition-all hover:bg-gray-50 active:scale-90">
                <ChevronLeft className="size-5 text-gray-700" />
            </button>

            <button
                onClick={() => scroll('right')}
                className="hidden md:flex absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white shadow-xl border border-gray-100 opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-gray-50 active:scale-90"
            >
                <ChevronRight className="size-5 text-gray-700" />
            </button>

            {/* Scroll Area */}
            <div
                ref={scrollRef}
                className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 px-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {blogs.map((blog, index) => (
                    <div key={blog.id || index} className="min-w-[280px] sm:min-w-[350px] md:min-w-[400px] snap-start h-auto flex py-2">
                        <BlogCard
                            blog={blog}
                            handleDeleteBlog={handleDeleteBlog}
                            idDeleting={idDeleting}
                        />
                    </div>
                ))}
            </div>


            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    )
}

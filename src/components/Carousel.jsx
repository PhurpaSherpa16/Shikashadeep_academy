import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"

export const Carousel = ({ content }) => {
    const scrollRef = useRef(null)

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft } = scrollRef.current
            const scrollAmount = 300 // Fixed scroll distance
            const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
        }
    }

    return (
        <div className="relative group/carousel w-full">
            <button
                onClick={() => scroll('left')}
                className="absolute left-0 lg:-left-4 top-1/2 z-100 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 shadow-lg border border-gray-100 opacity-0 
                md:group-hover/carousel:opacity-100 transition-all hover:bg-white active:scale-95 text-gray-700 hidden md:flex items-center justify-center">
                <ChevronLeft className="size-5" />
            </button>
            <button
                onClick={() => scroll('right')}
                className="absolute right-0 z-100 lg:-right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 shadow-lg border border-gray-100 opacity-0 
                md:group-hover/carousel:opacity-100 transition-all hover:bg-white active:scale-95 text-gray-700 hidden md:flex items-center justify-center">
                <ChevronRight className="size-5" />
            </button>

            <div ref={scrollRef}
                className="flex w-full h-fit gap-4 md:gap-6 overflow-x-auto snap-x 
                snap-mandatory no-scrollbar pb-4 px-1 scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {content}
            </div>
        </div>
    )
}

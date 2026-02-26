import { format, parseISO } from "date-fns"
import { CalendarDays, Clock, Share2, Tag } from "lucide-react"

export default function ViewBlogContent({blog}) {
    const formattedDate = blog?.createdAt ? format(parseISO(blog.createdAt), "MMMM d, yyyy") : "Recently Posted"
    const readingTime = blog?.description ? Math.ceil(blog.description.length / 500) : 5

    const handleShare = async () => {
        const shareData = {
            title: blog.title,
            text: blog.excerpt,
            url: window.location.href,
        }

        if (navigator.share) {
            try {
                await navigator.share(shareData)
            } catch (err) {
                console.log("Share cancelled")
            }
        } else {
            navigator.clipboard.writeText(window.location.href)
            alert("Link copied to clipboard!")
        }
    }

    return (
        <>
        {/* Main Content Column */}
        <article className="lg:col-span-2 space-y-10">
            {/* Blog Header Info */}
            <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                        style={{ backgroundColor: blog?.tag?.color || '#3b82f6' }}>
                        {blog?.tag?.name || 'School Life'}
                    </span>
                    <div className="size-1 bg-black/60 rounded-full" />
                    <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                        <span className="flex items-center gap-1.5">
                            <CalendarDays className="size-4 text-(--blueDark)" />
                            {formattedDate}
                        </span>
                        <div className="size-1 bg-black/60 rounded-full" />
                        <span className="flex items-center gap-1.5">
                            <Clock className="size-4 text-(--blueDark)" />
                            {readingTime} min read
                        </span>
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-[1.15]">
                    {blog?.title || "Dynamic Blog Title from API"}
                </h1>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-video rounded-lg overflow-hidden shadow group">
                <img src={blog?.image_url || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80"}
                    alt={blog?.title} className="w-full h-full object-cover group-hover:scale-[1.02] 
                    transition-transform duration-700"/>
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60" />
            </div>

            {/* Blog Content Section */}
            <div className="bg-white rounded-lg p-6 md:p-10 lg:p-12 shadow-sm border border-gray-50">
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-sans space-y-6 whitespace-pre-wrap">
                    <p className="indent-8 text-justify">
                        {blog?.description}
                    </p>

                    {/* Default content at footer */}
                    <div className="space-y-4 pt-4">
                        <div className="p-6 bg-(--offWhiteBackground) rounded border-l-4 border-(--blueDark) italic text-gray-600">
                            "Education is not the learning of facts, but the training of the mind to think."
                            <p className="block mt-2 font-bold not-italic text-gray-900">— Albert Einstein</p>
                        </div>
                        <div>
                            <p className="indent-8 text-justify">At Shikshadeep School, we believe in providing a holistic learning environment that nurtures creativity, critical thinking, and character development. Our blogs serve as a window into the daily life, achievements,
                             and innovative pedagogical practices within our community.</p>
                        </div>
                    </div>
                </div>

                {/* Social Share / Tags footer */}
                <div className="mt-12 pt-10 border-t border-gray-100 flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <Tag className="size-5 text-gray-400" />
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-600 font-medium">Education</span>
                            <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-600 font-medium">Innovation</span>
                            <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-600 font-medium">Campus</span>
                        </div>
                    </div>

                    <button onClick={handleShare} className="flex items-center gap-2 px-6 py-2.5 bg-(--blueDark) text-white rounded-full font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer">
                        <Share2 className="size-4" /> Share Article
                    </button>
                </div>
            </div>
        </article>
            
        </>
    )
}
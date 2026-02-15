import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { blogs } from "@/data/blogNews";
import BlogCard from "@/components/BlogCard";
import { ChevronLeft, ChevronRight, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 6;

export default function BlogNews() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTag, setActiveTag] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const search = searchParams.get("q");

    useEffect(() => {
        if (search) {
            setActiveTag(search);
        } else {
            setActiveTag("All");
        }
    }, [search]);

    // Scroll to top on load or page change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage, activeTag]);

    const handleTagChange = (tag) => {
        if (tag === "All") {
            setSearchParams({});
        } else {
            setSearchParams({ q: tag });
        }
    };

    // Get unique tags from blogs
    const allTags = useMemo(() => {
        return ["All", ...new Set(blogs.map(item => item.tag))];
    }, []);

    const { visibleTags, hiddenTags } = useMemo(() => {
        const otherTags = allTags.filter(t => t !== "All" && t.toLowerCase() !== activeTag.toLowerCase());

        let visible = ["All"];
        if (activeTag !== "All") {
            visible.push(activeTag);
        }

        // Fill up to 3 slots
        while (visible.length < 3 && otherTags.length > 0) {
            visible.push(otherTags.shift());
        }

        // Remaining are hidden
        const hidden = allTags.filter(t => !visible.includes(t));

        return { visibleTags: visible, hiddenTags: hidden };
    }, [allTags, activeTag]);

    // Filtered blogs
    const filteredBlogs = useMemo(() => {
        const sorted = [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date));
        if (!activeTag || activeTag === "All") return sorted;
        const normalizedTag = activeTag.toLowerCase();
        return sorted.filter(item => item.tag.toLowerCase() === normalizedTag);
    }, [activeTag]);

    // Paginated blogs
    const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
    const paginatedItems = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredBlogs.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredBlogs, currentPage]);

    // Reset page when filtering
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTag]);

    return (
        <div className="min-h-screen bg-gray-50/30">
            {/* Hero Header */}
            <div className="bg-white border-gray-100">
                <div className="container mx-auto px-4 pt-16">
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

            <div className="container mx-auto px-4 pt-8 pb-16 space-y-8">
                {/* Filter Bar */}
                <div className="relative">
                    <div className="flex items-center justify-center lg:justify-start gap-2">
                        {/* Visible tags for both Desktop & Mobile */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                            {visibleTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => handleTagChange(tag)}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeTag.toLowerCase() === tag.toLowerCase()
                                        ? "bg-(--blueDark) text-white border-(--blueDark) shadow-md"
                                        : "bg-white text-gray-600 border-gray-100 hover:border-blue-200 hover:text-(--blueDark)"
                                        }`}>
                                    {tag}
                                </button>
                            ))}
                        </div>

                        {/* Filter Toggle Icon */}
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`p-2.5 rounded-full border transition-all duration-300 ${isFilterOpen ? 'bg-(--blueDark) text-white border-(--blueDark)' : 'bg-white text-gray-600 border-gray-100 hover:bg-gray-50'}`}
                            title="More Filters"
                        >
                            {isFilterOpen ? <X size={20} /> : <Filter size={20} />}
                        </button>
                    </div>

                    {/* Filter Dropdown */}
                    {isFilterOpen && (
                        <div className="absolute top-full left-0 right-0 mt-4 z-50 bg-white/95 backdrop-blur-md border border-gray-100 
                        rounded-2xl shadow-2xl p-6 lg:p-8 animate-in fade-in slide-in-from-top-4 duration-300 w-fit">
                            <div className="flex flex-wrap items-center justify-center gap-3">
                                {hiddenTags.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => {
                                            handleTagChange(tag);
                                            setIsFilterOpen(false);
                                        }}
                                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeTag.toLowerCase() === tag.toLowerCase()
                                            ? "bg-(--blueDark) text-white border-(--blueDark)"
                                            : "bg-gray-50 text-gray-600 border-transparent hover:border-blue-200 hover:text-(--blueDark) hover:bg-white"
                                            }`}>
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Blogs Grid */}
                {paginatedItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 2xl:gap-12">
                        {paginatedItems.map((item, index) => (
                            <BlogCard key={index} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="py-32 text-center space-y-6 bg-white rounded-2xl border border-dashed border-gray-200">
                        <div className="space-y-2">
                            <p className="text-gray-400 text-6xl">empty</p>
                            <p className="text-gray-500 text-xl font-medium italic">
                                No articles found in "{activeTag}"
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => handleTagChange("All")}
                            className="rounded-full px-8 py-6 h-auto text-lg hover:bg-(--blueDark) hover:text-white transition-all shadow-sm"
                        >
                            Explore All Categories
                        </Button>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-12">
                        <p className="text-sm font-bold text-gray-400">
                            Showing <span className="text-gray-900">{paginatedItems.length}</span> of <span className="text-gray-900">{filteredBlogs.length}</span> articles
                        </p>

                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                className="rounded-full h-auto font-bold border-2 hover:bg-gray-50 transition-all disabled:opacity-30"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="size-5 mr-1" />
                                Previous
                            </Button>

                            <div className="flex gap-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`size-10 rounded-full text-sm font-bold transition-all ${currentPage === page
                                            ? "bg-(--blueDark) text-white"
                                            : "bg-white text-gray-500 hover:bg-gray-100"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <Button
                                variant="outline"
                                className="rounded-full h-auto font-bold border-2 hover:bg-gray-50 transition-all disabled:opacity-30"
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                                <ChevronRight className="size-5 ml-1" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
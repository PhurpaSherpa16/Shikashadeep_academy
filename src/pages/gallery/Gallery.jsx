import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { gallery } from "../../data/gallery";
import ImageViewer from "../../components/ImageViewer";
import { ChevronLeft, ChevronRight, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageCard from "../../components/ImageCard";

const ITEMS_PER_PAGE = 9;

export default function Gallery() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTag, setActiveTag] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const search = searchParams.get("q");

    useEffect(() => {
        if (search) {
            setActiveTag(search);
        } else {
            setActiveTag("All");
        }
    }, [search]);

    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleTagChange = (tag) => {
        if (tag === "All") {
            setSearchParams({});
        } else {
            setSearchParams({ q: tag });
        }
    };

    // Get all unique tags
    const allTags = useMemo(() => {
        const tags = ["All", ...new Set(gallery.flatMap(item => item.tag || []))];
        return tags;
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

    // Filtered gallery items
    const filteredGallery = useMemo(() => {
        if (!activeTag || activeTag === "All") return gallery;
        const normalizedActiveTag = activeTag.toLowerCase();
        return gallery.filter(item =>
            item.tag && item.tag.some(t => t.toLowerCase() === normalizedActiveTag)
        );
    }, [activeTag]);

    // Paginated items
    const totalPages = Math.ceil(filteredGallery.length / ITEMS_PER_PAGE);
    const paginatedItems = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredGallery.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredGallery, currentPage]);

    // Reset page when filtering
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTag]);

    const handleOpenViewer = (indexInPaginated) => {
        // We want to pass the index relative to the filtered list, not just the page
        const actualIndex = (currentPage - 1) * ITEMS_PER_PAGE + indexInPaginated;
        setCurrentIndex(actualIndex);
    };

    return (
        <div className="min-h-screen">
            {/* Hero Header */}
            <div className="bg-white border-gray-100">
                <div className="container mx-auto px-4 pt-16">
                    <div className="max-w-3xl space-y-2 lg:space-y-4">
                        <h1 className="font-serif font-bold text-gray-900 text-center lg:text-left">
                            Our <span className='text-(--blueDark)'>Gallery</span>
                        </h1>
                        <p className="text-xl text-gray-500 text-center lg:text-left">
                            A visual journey through the moments that define Shikshadeep Academy.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pt-4 pb-16 space-y-12">
                {/* Filter Bar */}
                <div className="relative">
                    <div className="flex items-center justify-center lg:justify-start gap-2">
                        {/* Desktop: First 3 tags */}
                        <div className="hidden lg:flex gap-2">
                            {visibleTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => handleTagChange(tag)}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeTag.toLowerCase() === tag.toLowerCase()
                                        ? "bg-(--blueDark) text-white border-(--blueDark) shadow-md"
                                        : "bg-white text-gray-600 border-gray-100 hover:border-blue-200 hover:text-(--blueDark)"
                                        }`}>
                                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Mobile: View */}
                        <div className="lg:hidden flex gap-2">
                            {visibleTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => handleTagChange(tag)}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeTag.toLowerCase() === tag.toLowerCase()
                                        ? "bg-(--blueDark) text-white border-(--blueDark) shadow-md"
                                        : "bg-white text-gray-600 border-gray-100 hover:border-blue-200 hover:text-(--blueDark)"
                                        }`}>
                                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
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
                        <div className="absolute top-full left-0 right-0 mt-4 z-50 bg-white/95 backdrop-blur-md
                        w-fit
                        border border-gray-100 rounded-2xl shadow-2xl p-6 lg:p-8 animate-in fade-in slide-in-from-top-4 
                        duration-300">
                            <div className="flex flex-wrap items-center justify-center gap-3">
                                {(window.innerWidth < 1024 ? allTags : hiddenTags).map((tag) => (
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
                                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Gallery Grid */}
                {paginatedItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {paginatedItems.map((item, index) => (
                            <ImageCard key={index} item={item} index={index} handleOpenViewer={handleOpenViewer} />
                        ))}
                    </div>) : (
                    <div className="py-20 text-center space-y-4">
                        <p className="text-gray-500 text-lg italic">No photos found for "{activeTag}".</p>
                        <Button variant="outline" onClick={() => handleTagChange("All")} className="rounded-full">
                            View All Photos
                        </Button>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 pt-12 border-t border-gray-100">
                        <Button
                            variant="outline"
                            className="rounded-full px-6"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}>
                            <ChevronLeft className="size-4 mr-2" />
                            Previous
                        </Button>
                        <span className="text-sm font-medium text-gray-600">
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            className="rounded-full px-6"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}>
                            Next
                            <ChevronRight className="size-4 ml-2" />
                        </Button>
                    </div>
                )}
            </div>

            {/* Viewer Integration */}
            {currentIndex !== null && (
                <ImageViewer
                    src={filteredGallery[currentIndex].image}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    gallery={filteredGallery}
                    onClose={() => setCurrentIndex(null)}
                />
            )}
        </div>
    );
}
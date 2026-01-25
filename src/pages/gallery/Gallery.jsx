import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { gallery } from "../../data/gallery";
import ImageViewer from "../../components/ImageViewer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageCard from "../../components/ImageCard";

const ITEMS_PER_PAGE = 9;

export default function Gallery() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTag, setActiveTag] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(null);

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
                    <div className="max-w-3xl space-y-4">
                        <h1 className="font-serif font-bold text-gray-900">
                            Our <span className='text-(--blueDark)'>Gallery</span>
                        </h1>
                        <p className="text-xl text-gray-500">
                            A visual journey through the moments that define Shikshadeep Academy.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pt-4 pb-16 space-y-12">
                {/* Filter Bar */}
                <div className="flex flex-wrap gap-2 items-center justify-center lg:justify-start">
                    {allTags.map((tag) => (
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
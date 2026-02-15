import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Loading from "../Loading";
import { useEffect, useRef, useState } from "react";
import { capitalize } from "@/utils/captalize";
import { cn } from "@/lib/utils";

export default function ImageViewer({ images, onClose, loading, index = 0 }) {
    const [currentIndex, setCurrentIndex] = useState(index)
    const thumbnailRef = useRef(null);

    // Normalize images list
    const imagesList = images?.images || []
    const total_images = imagesList.length

    // Derived metadata for the current view
    // Fallback: If individual image has a 'post' parent, use its info. Else use root info.
    const currentImage = imagesList[currentIndex]
    const displayTitle = currentImage?.post?.title || images?.title || "Untitled Gallery"
    const displayCaption = currentImage?.post?.caption || images?.caption || ""
    const displayTags = currentImage?.post?.galleryPostTags || images?.galleryPostTags || []

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentIndex]);

    // Scroll active thumbnail into view
    useEffect(() => {
        if (thumbnailRef.current) {
            const activeThumb = thumbnailRef.current.children[currentIndex]
            if (activeThumb) {
                activeThumb.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                });
            }
        }
    }, [currentIndex]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1 >= total_images ? 0 : prev + 1));
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 < 0 ? total_images - 1 : prev - 1));
    };

    if (loading) {
        return (
            <div className="fixed inset-0 z-100 bg-black/80 backdrop-blur-md flex items-center justify-center">
                <Loading container={true} text="Loading album..." />
            </div>
        );
    }

    if (!images || total_images === 0) return null;

    return (
        <div className="fixed inset-0 h-screen w-full z-100 bg-black/60 backdrop-blur-2xl flex flex-col overflow-hidden animate-in fade-in duration-300">
            {/* --- Top Bar: Close Button --- */}
            <div className="absolute top-0 right-0 p-6 z-110">
                <button
                    onClick={onClose}
                    className="p-3 bg-white/10 hover:bg-red-500/20 text-white hover:text-red-500 rounded-full backdrop-blur-md border border-white/10 transition-all duration-300 group"
                >
                    <X size={24} className="hover:rotate-90 transition-transform duration-300" />
                </button>
            </div>

            {/* --- Main Content Area --- */}
            <div className="flex-1 flex flex-col lg:flex-row min-h-0 relative">

                {/* Left/Top: Image Info */}
                <div className="w-full lg:w-80 p-8 lg:p-12 flex flex-col justify-center space-y-4 lg:border-r lg:border-white/5 order-2 lg:order-1">
                    <div className="space-y-2 animate-in slide-in-from-left-4 duration-500 delay-150">
                        <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight">
                            {capitalize(displayTitle)}
                        </h1>
                        <p className="text-white/60 text-sm lg:text-base leading-relaxed max-w-md">
                            {capitalize(displayCaption)}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 animate-in slide-in-from-left-4 duration-500 delay-300">
                        {displayTags?.map((item, idx) => (
                            <span key={idx} className="px-3 py-1 bg-white/10 text-white/80 text-xs font-bold rounded-lg border border-white/5 backdrop-blur-sm">
                                #{item.tag?.name || item.name}
                            </span>
                        ))}
                    </div>

                    <div className="hidden lg:block pt-8 text-white/30 text-[10px] font-bold uppercase tracking-widest">
                        Image {currentIndex + 1} of {total_images}
                    </div>
                </div>

                {/* Right/Main: Image Display */}
                <div className="flex-1 relative flex items-center justify-center p-4 lg:p-12 order-1 lg:order-2 overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 blur-[120px] pointer-events-none">
                        <div className="w-96 h-96 bg-blue-dark rounded-full animate-pulse" />
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-4 lg:left-8 z-50 p-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl backdrop-blur-xl border border-white/5 transition-all duration-300 active:scale-90"
                    >
                        <ChevronLeft size={32} />
                    </button>

                    <div className="relative z-10 w-full h-full flex items-center justify-center group">
                        <img
                            key={currentIndex}
                            src={imagesList[currentIndex]?.image_url}
                            alt="preview"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in fade-in zoom-in-95 duration-500 shadow-white/5"
                        />
                    </div>

                    <button
                        onClick={handleNext}
                        className="absolute right-4 lg:right-8 z-50 p-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl backdrop-blur-xl border border-white/5 transition-all duration-300 active:scale-90"
                    >
                        <ChevronRight size={32} />
                    </button>

                    {/* Mobile Index Indicator */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 lg:hidden bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md text-[10px] text-white font-bold tracking-widest uppercase border border-white/10">
                        {currentIndex + 1} / {total_images}
                    </div>
                </div>
            </div>

            {/* --- Bottom: Thumbnail Strip --- */}
            <div className="h-28 lg:h-32 bg-black/40 border-t border-white/5 backdrop-blur-xl flex items-center justify-center px-6">
                <div
                    ref={thumbnailRef}
                    className="flex gap-4 overflow-x-auto pb-4 pt-4 px-4 scrollbar-hide no-scrollbar max-w-full lg:max-w-4xl scroll-smooth items-center"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {imagesList.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={cn(
                                "relative shrink-0 w-16 lg:w-20 aspect-square rounded-xl overflow-hidden transition-all duration-300 transform border-2",
                                currentIndex === index
                                    ? "border-blue-dark scale-110 shadow-lg shadow-blue-dark/20 z-10"
                                    : "border-transparent opacity-40 hover:opacity-100 hover:scale-105"
                            )}
                        >
                            <img
                                src={image.image_url}
                                alt={`thumb-${index}`}
                                className="w-full h-full object-cover"
                            />
                            {currentIndex === index && (
                                <div className="absolute inset-0 bg-blue-dark/10 pointer-events-none" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
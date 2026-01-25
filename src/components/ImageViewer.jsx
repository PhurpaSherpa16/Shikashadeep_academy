import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useRef, useEffect } from "react";

export default function ImageViewer({ src, onClose, setCurrentIndex, gallery, currentIndex }) {
    const slideRef = useRef(null);
    const scrollAmount = 100;

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onHandlePrev();
            if (e.key === "ArrowRight") onHandleNext();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentIndex]); // Re-attach when index changes so handlers use fresh state

    const onHandlePrev = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex - 1 < 0 ? gallery.length - 1 : prevIndex - 1;
            // Ensure thumbnail is visible
            if (slideRef.current) {
                const thumb = slideRef.current.children[newIndex];
                if (thumb) thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
            return newIndex;
        });
    };

    const onHandleNext = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex + 1 >= gallery.length ? 0 : prevIndex + 1;
            // Ensure thumbnail is visible
            if (slideRef.current) {
                const thumb = slideRef.current.children[newIndex];
                if (thumb) thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
            return newIndex;
        });
    };

    if (!src) return null;

    return (
        <div className="fixed inset-0 h-screen z-100 bg-black/60 backdrop-blur-xl flex flex-col items-center justify-center p-4">
            {/* Header Controls */}
            <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center z-50">
                <div className="flex items-center gap-3">
                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                        <span className="text-white/80 text-sm font-medium">
                            {currentIndex + 1} / {gallery.length}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={onClose}
                        className="p-3 bg-white/10 hover:bg-red-500/20 text-white hover:text-red-500 rounded-full backdrop-blur-md border border-white/10 transition-all duration-300 group"
                    >
                        <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                </div>
            </div>

            {/* Central Image and Controls */}
            <div className="relative w-full max-w-7xl flex bottom-20 md:bottom-10 items-center justify-center group h-full">
                {/* Desktop Side Nav Buttons */}

                <div className="relative h-[85vh] w-full flex items-center justify-center py-20 lg:py-32">
                    <img src={src} alt="preview"
                        className="relative z-50 size-200 object-contain animate-in fade-in zoom-in-95 
                        duration-300"/>
                        <div className="absolute flex justify-between w-full z-100">
                            <button onClick={onHandlePrev}
                                className="left-4 z-50 p-4 bg-white/5 hover:bg-white/20 text-white 
                                rounded-full backdrop-blur-xl border border-white/10 transition-all duration-300 ">
                                <ChevronLeft size={32} />
                            </button>

                            <button onClick={onHandleNext}
                                className="right-4 z-50 p-4 bg-white/5 hover:bg-white/20 text-white 
                                rounded-full backdrop-blur-xl border border-white/10 transition-all duration-300">
                                <ChevronRight size={32} />
                            </button>
                        </div>
                </div>
            </div>

            {/* Premium Integrated Bottom Bar */}
            <div className="absolute bottom-0 inset-x-0 z-50">
                <div className="bg-linear-to-t from-black/90 to-transparent pt-20 pb-10 px-6">
                    <div className="container mx-auto">
                        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-end justify-between w-full">
                            {/* Image Info */}
                            <div className="max-w-2xl space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                                <div className="space-y-1">
                                    <h2 className="text-white text-2xl lg:text-3xl font-serif font-bold 
                                    text-center lg:text-left
                                    tracking-wide">
                                        {gallery[currentIndex].label}
                                    </h2>
                                    <p className="text-white/60 text-lg leading-relaxed text-center lg:text-left">
                                        {gallery[currentIndex].caption}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                    {gallery[currentIndex].tag.map((tag, i) => (
                                        <span key={i} className="text-xs uppercase tracking-widest text-white/60">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Thumbnail Stream */}
                            <div className="w-full lg:w-2xl flex justify-center lg:justify-end">
                                <div ref={slideRef} className="flex gap-3 overflow-x-auto scrollbar-hide py-2 px-1 snap-x"
                                style={{ scrollbarWidth: "none" }}>
                                    {gallery.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentIndex(index)}
                                            className={`relative shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 snap-center
                                                ${currentIndex === index ? 'border-(--blueDark) scale-110 shadow-lg shadow-blue-500/20' : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/30'}`}
                                        >
                                            <img src={item.image} alt="thumb" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
